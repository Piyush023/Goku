This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# Stream_Yard_Clone

## Tech Stack
1. Node.JS
2. Ffmpeg
3. Docker  

## Arch and Summary - 
First will be the Client (Google Chrome or any Browser) - Based on React or Next.JS - FrontEnd - Camera and Mic Access and Start Streaming Button - {
    This will be the button to allow the user to go live on the connected Platform {RTM Connected Platform - ? - Youtube, Facebook} 
}
Second will be the Server (Node.JS) - Backend - The stream will be sent to Node.JS server and a Child process will be started which will run the CLI ffmpeg command to process the video and audio.
Ffmpeg - CLI Tool for Processing any type of operations on Videos. - (Streaming, Upscale, Downscale)
Now Node.JS Server will throw the video stream to the RTMP Point via ffmpeg
RTMP Point - RTMP is a TCP-based protocol designed to maintain persistent, low-latency connections — and by extension, smooth streaming experiences. RTMP - Real Time Messaging Protocol(TCP Protocol) - {
    Real-Time Messaging Protocol (RTMP) is a communication protocol that allows for the streaming of data, video, and audio over the internet. It's used for live television, video streaming, and internet phone services. RTMP breaks large data files into small packets, which are then sent one by one from an encoder and put back together for the viewer.
    This is the server where we will send our processed video to multiple streaming platforms like Youtube, Facebook etc.
    Each Streaming Platform will have RTMP of there own and our stream will be thrown to them and then it will get processed and then it will be shown on that platform and it will handle all the operations to show that stream to other people.
}
User Feed is captured from the client side in form of a stream - (STREAM TYPE) and We need to send this stream to the Node.JS server via TCP - Transmission Control Protocol - which will then send this stream to the ffmpeg and then to the RTMP for the platform distribution. Now the problem is that we can't send the captured stream to Node Serve in stream format via TCP and also RTMP also don't work on stream format (For Video Transmissions we use the WebRTC Protocol to process the from one server to another video does not get transfered over the TCP). So for this to work, we have to convert that stream to a binary data form and then send it to the server via TCP and also we need WebSocket/Socket.IO for Real Time Communication between the stream, server, ffmpeg and then in the last RTMP.

Topics TO Learn About - 
1. React.JS / Next.JS
2. Express.JS / Node.JS and Servers
3. Socket.IO
4. Ffmpeg
5. RTMP