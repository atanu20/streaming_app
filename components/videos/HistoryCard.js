import Link from 'next/link';
import React from 'react';
import { format } from 'timeago.js';
import HistoryVideoView from './HistoryVideoView';
const HistoryVideo = ({ allvideo }) => {
  return (
    <>
      <div className="cardVideo">
        <div className="row">
          {allvideo?.map((val, ind) => {
            return <HistoryVideoView video_id={val.video_id} key={ind} />;
          })}
        </div>
      </div>
    </>
  );
};

export default HistoryVideo;
