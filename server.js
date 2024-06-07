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
