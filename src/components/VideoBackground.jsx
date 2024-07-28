// src/components/VideoBackground.jsx
import React from 'react';

const VideoBackground = () => {
  return (
    <video className='fixed top-0 left-0 min-w-[100%] min-h-[100%] w-auto h-auto -z-1 bg-cover hidden' autoPlay muted loop id="video-background">
      <source src="../public.videoBG.mp4" type="video/mp4" />
    </video>
  );
};

export default VideoBackground;
