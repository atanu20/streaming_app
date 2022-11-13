import Link from 'next/link';
import React from 'react';
import { format } from 'timeago.js';
const ProfileVideos = () => {
  return (
    <>
      <div className="cardVideo">
        <div className="row">
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 4, 5, 6, 7, 8, 9, 3, 5, 4, 9,
            95, 22, 5, 5, 6, 6, 4, 4, 1,
          ].map((val, ind) => {
            return (
              <div
                className="col-lg-3 col-md-4 col-sm-6 col-12  mb-2"
                key={ind}
              >
                <div className="card">
                  <Link href="/video/123">
                    <a>
                      <img
                        src="https://static-cse.canva.com/blob/951430/1600w-wK95f3XNRaM.jpg"
                        alt=""
                      />
                    </a>
                  </Link>
                  <div className="p-2 card_text_box">
                    <Link href="/">
                      <a>
                        <img
                          src="https://static-cse.canva.com/blob/951430/1600w-wK95f3XNRaM.jpg"
                          alt=""
                        />
                      </a>
                    </Link>
                    <div>
                      <Link href="/">
                        <a>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. At, odit.
                          </p>
                        </a>
                      </Link>
                      <div className="p-2 small_boxx">
                        <small>250views</small>
                        <small>{format(new Date())}</small>
                        <small>
                          <Link href="/video/edit/123">
                            <a>
                              {' '}
                              <i className="fa fa-edit fn_14 cur"></i>
                            </a>
                          </Link>
                        </small>
                        <small>
                          <i className="fa fa-trash-o fn_14 cur"></i>
                        </small>
                      </div>
                    </div>
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

export default ProfileVideos;
