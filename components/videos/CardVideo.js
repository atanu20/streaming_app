import Link from 'next/link';
import React from 'react';
import { format } from 'timeago.js';
const CardVideo = ({ allvideo }) => {
  return (
    <>
      <div className="cardVideo">
        <div className="row">
          {allvideo?.map((val, ind) => {
            return (
              <div
                className="col-lg-3 col-md-4 col-sm-6 col-12  mb-2"
                key={ind}
              >
                <div className="card">
                  <Link href={`/video/${val._id}`}>
                    <a>
                      <img src={val.channelthumb} alt="" />
                    </a>
                  </Link>
                  <div className="p-2 card_text_box">
                    <Link href={`/account/${val.userid}`}>
                      <a>
                        <img src={val?.profile_image} alt="" />
                      </a>
                    </Link>
                    <div>
                      <Link href={`/video/${val._id}`}>
                        <a>
                          <p className="">{val.title}</p>
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="pl-2 pr-2 pb-3  small_boxx">
                    <small> {val.views} views</small>
                    <small>{format(new Date(val.uploadAt))}</small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CardVideo;
