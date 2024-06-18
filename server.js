import express from 'express';
import { createServer } from 'http';
import next from 'next';
import { Server as SocketIO } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = 3000;
const hostname = 'localhost';

app.prepare().then(() => {
  const expressApp = express();
  const server = createServer(expressApp);
  const io = new SocketIO(server);

  // Now here we need to send the Binary Stream to Ffmpeg and for that we have to spawn a child-process and then in that child process we will use the spawn from the child-process for this purpose and for that we need options and then we will use the spawn from the child-process for this purpose and for that we need options options defines the stream properties and gives it to the Ffmpeg.

  // Contains the options for the stream - Bitrate, Format, AudioRate
  const options = [
    '-i',
    '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-r', `${25}`,
    '-g', `${25 * 2}`,
    '-keyint_min', 25,
    '-crf', '25',
    '-pix_fmt', 'yuv420p',
    '-sc_threshold', '0',
    '-profile:v', 'main',
    '-level', '3.1',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ar', 128000 / 4,
    '-f', 'flv',
    // This is the youtube Live Link with the User API-KEY - make it dynamic. and also we can make it a file and record and download the whole file.
    `rtmp://a.rtmp.youtube.com/live2/dcfx-m7v2-j248-3185-9207`,
  ];

  // We need to run this through the docker compose file to make it work.
  const ffmpegProcess = spawn('ffmpeg', options);

  io.on('connection', socket => {
    console.log('Socket Connected', socket.id);
    // When ever the data of Stream is coming from the client we will send it to the server
    socket.on('binaryStream', () => {
      console.log('Socket Incoming');
    });
  });

  expressApp.get('*', (req, res) => {
    return handle(req, res);
  });


  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
