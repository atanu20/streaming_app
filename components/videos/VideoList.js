import React from 'react';
import TrendingVideo from '../slider/TrendingVideo';
import CardVideo from './CardVideo';

const VideoList = ({ allvideo, trendVideo }) => {
  return (
    <>
      <div className="video_list">
        <TrendingVideo trendVideo={trendVideo} />
        <br />
        <CardVideo allvideo={allvideo} />
      </div>
    </>
  );
};

export default VideoList;
