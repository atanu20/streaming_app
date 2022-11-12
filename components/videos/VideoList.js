import React from 'react';
import TrendingVideo from '../slider/TrendingVideo';
import CardVideo from './CardVideo';

const VideoList = () => {
  return (
    <>
      <div className="video_list">
        <TrendingVideo />
        <br />
        <CardVideo />
      </div>
    </>
  );
};

export default VideoList;
