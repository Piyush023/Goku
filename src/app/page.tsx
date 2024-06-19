'use client';
import React, { createRef, useCallback, useEffect, useState } from 'react';
// import io from 'socket.io';
import io from 'socket.io-client';

const Home = () => {
  const [camFeed, setCamFeed] = useState<MediaStream | null>(null);
  const [startFeed, setStartFeed] = useState<boolean>(false);
  const myVideo = createRef<HTMLVideoElement>();
  const socket = io('http://localhost:3000');
  socket.on('connect', () => {
    console.log('Connected to server');
  });

  // When ever we install or create the socket IO instance we have a specific Socket IO Path - '/socket.io/socket.io.js'

  const startFeedService = useCallback(
    (camStream: MediaStream) => {
      const mediaRecorder = new MediaRecorder(camStream, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 250000,
      });
      console.log(startFeed, 'mediaRecorder.pause();');

      if (startFeed) {
        mediaRecorder.ondataavailable = (ev) => {
          console.log('Media Data Available', ev.data);
          socket.emit('binaryStream', ev.data);
        };
        mediaRecorder.start(25);
      } else {
        console.log('stop');
        mediaRecorder.stop();
        socket.close();
      }
    },
    [startFeed, socket],
  );

  useEffect(() => {
    const camData = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setCamFeed(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    camData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>StreamYard Clone</h1>
      <video
        style={{ width: '500px', height: '200px', borderWidth: '1px', borderColor: 'red' }}
        autoPlay
        ref={myVideo}
        id="user-media"
        muted
      />
      <button
        onClick={() => {
          setStartFeed(true);
          startFeedService(camFeed!);
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          setStartFeed(false);
          startFeedService(camFeed!);
        }}
      >
        End
      </button>
    </div>
  );
};

export default Home;
