# Stream Yard Clone

This project is a Next.js application bootstrapped with `create-next-app`, designed to capture video and audio from a client's browser, process it using FFmpeg, and stream it to platforms like YouTube and Facebook using RTMP.

## Getting Started

### Development Server

First, run the development server:

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev

# bun
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses `next/font` to automatically optimize and load Inter, a custom Google Font.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.
- [Next.js GitHub repository](https://github.com/vercel/next.js) - Your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Tech Stack

1. **Node.js**
2. **FFmpeg**
3. **Docker**

## Architecture and Summary

### Overview

This documentation outlines the setup and components for a live streaming solution that captures video and audio from a client's browser, processes it using FFmpeg, and streams it to platforms like YouTube and Facebook using RTMP. The solution consists of a client-side application (built with React or Next.js) and a server-side application (built with Node.js and Express).

### Tech Stack

#### Frontend

1. **React.js / Next.js**: For building the user interface and managing the client-side logic.
2. **Browser APIs**: To access the camera and microphone.

#### Backend

1. **Node.js**: For server-side scripting and handling incoming media streams.
2. **Express.js**: For creating the server and managing routes and middleware.
3. **Socket.IO**: For real-time, bidirectional communication between the client and server.
4. **Child Process (Node.js)**: To spawn FFmpeg processes for media stream processing.

#### Media Processing

1. **FFmpeg**: A powerful CLI tool for video and audio processing, used to encode, decode, transcode, mux, demux, stream, filter, and play multimedia files.

#### Streaming Protocol

1. **RTMP (Real-Time Messaging Protocol)**: A protocol for streaming audio, video, and data over the Internet.

#### Containerization

1. **Docker**: For containerizing the FFmpeg application to ensure consistent environments across different systems.

## Components and Workflow

### Client-Side (React/Next.js)

#### Browser Access

- Access the camera and microphone using the browser's API.
- Display a "Start Streaming" button to initiate the streaming process.

#### Streaming Button

- When clicked, the button will start capturing the media stream from the user's camera and microphone.
- The captured media stream will be sent to the Node.js server for processing.

### Server-Side (Node.js with Express)

#### Media Stream Reception

- The server receives the media stream from the client.
- It uses Socket.IO for real-time communication to handle the incoming stream data.

#### Processing with FFmpeg

- A child process is spawned to run FFmpeg with specific options to process the video and audio streams.
- FFmpeg options include setting the codec, bitrate, frame rate, and other necessary parameters for streaming.

#### RTMP Streaming

- The processed media stream is forwarded to an RTMP endpoint.
- RTMP (Real-Time Messaging Protocol) is used for streaming the processed media to platforms like YouTube and Facebook.

## Technical Details

### RTMP (Real-Time Messaging Protocol)

RTMP is a TCP-based protocol designed for low-latency connections, making it ideal for live streaming. It breaks large data files into small packets, which are sent sequentially and reassembled by the receiver.

### WebSockets/Socket.IO

WebSockets, facilitated by Socket.IO, enable real-time, bidirectional communication between the client and server. This is essential for streaming applications where latency and real-time data transmission are critical.

### Docker and FFmpeg

Docker is used to containerize FFmpeg, ensuring consistent environments across different systems. FFmpeg is a powerful CLI tool for video and audio processing, used here to handle streaming, upscaling, and downscaling operations.

## Implementation

### Client-Side Code (React/Next.js)

#### Capture Media Stream

```javascript
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    // Handle the stream
  })
  .catch(error => {
    console.error('Error accessing media devices.', error);
  });
```

#### Start Streaming Button

```jsx
<button onClick={startStreaming}>Start Streaming</button>

const startStreaming = () => {
  // Capture the stream and send it to the server
};
```

### Server-Side Code (Node.js with Express)

#### Setup Express and Socket.IO

```javascript
import express from 'express';
import { createServer } from 'http';
import { Server as SocketIO } from 'socket.io';
import { spawn } from 'child_process';

const app = express();
const server = createServer(app);
const io = new SocketIO(server);
```

#### FFmpeg Process and RTMP

```javascript
const options = [
  '-i', '-',
  '-c:v', 'libx264',
  '-preset', 'ultrafast',
  '-tune', 'zerolatency',
  '-r', '25',
  '-g', '50',
  '-keyint_min', '25',
  '-crf', '25',
  '-pix_fmt', 'yuv420p',
  '-sc_threshold', '0',
  '-profile:v', 'main',
  '-level', '3.1',
  '-c:a', 'aac',
  '-b:a', '128k',
  '-ar', '32000',
  '-f', 'flv',
  'rtmp://a.rtmp.youtube.com/live2/your-stream-key'
];

const ffmpegProcess = spawn('ffmpeg', options);

io.on('connection', socket => {
  socket.on('binaryStream', data => {
    ffmpegProcess.stdin.write(data);
  });
});
```

#### Start Server

```javascript
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## Topics to Learn

1. **React.js / Next.js**: For building the client-side application.
2. **Express.js / Node.js**: For creating the server-side application.
3. **Socket.IO**: For real-time communication between the client, server, and FFmpeg.
4. **FFmpeg**: For processing video and audio streams.
5. **RTMP**: For streaming the processed media to platforms like YouTube and Facebook.
6. **Docker**: For containerizing FFmpeg and managing its environment.

## Conclusion

This documentation provides an overview of the live streaming solution, detailing the client and server components, the technologies used, and the necessary setup. By following this guide, you can create a robust system for live streaming video and audio to various platforms using modern web technologies and tools.
