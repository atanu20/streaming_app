import Link from 'next/link';
import React, { useState } from 'react';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import { format } from 'timeago.js';

const VideoDetails = () => {
  const [showDes, setShoeDes] = useState(false);
  const [comment, setComment] = useState('');

  const onComment = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Layout>
        <div className="p-3 mt-4">
          <div className="row">
            <div className="col-md-8 col-12 mx-auto mb-4">
              <video
                controls
                autoPlay
                disablePictureInPicture
                width="100%"
                controlsList="nodownload"
              >
                <source src="https://res.cloudinary.com/du9emrtpi/video/upload/v1668190798/video_1_ua5iga.mp4" />
              </video>
              <div className="p-2 d-flex ">
                <Link href="/">
                  <a>
                    <img
                      src="https://static-cse.canva.com/blob/951430/1600w-wK95f3XNRaM.jpg"
                      alt=""
                      className="video_img"
                    />
                  </a>
                </Link>
                <div className="ml-2">
                  <p className="m-0 fn_14">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    At, odit.
                  </p>
                  <Link href="/">
                    <a className=" fn_12 fn_col ">
                      <p className="m-0">Atanu Jana</p>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="video_des p-2">
                {showDes ? (
                  <>
                    <p className="m-0 fn_12 ">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nisi velit, dignissimos labore laboriosam omnis voluptatem
                      maxime dolore at doloribus voluptas repellat non eaque
                      molestias fugit dolorem, nobis, voluptates eum. Quod?
                    </p>
                    <small
                      className="fn_col cur fn_10"
                      onClick={() => setShoeDes(false)}
                    >
                      Show less
                    </small>
                  </>
                ) : (
                  <>
                    <p className="m-0 fn_12 text_p">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nisi velit, dignissimos labore laboriosam omnis voluptatem
                      maxime dolore at doloribus voluptas repellat non eaque
                      molestias fugit dolorem, nobis, voluptates eum. Quod?
                    </p>
                    <small
                      className="fn_col cur fn_10"
                      onClick={() => setShoeDes(true)}
                    >
                      Show more
                    </small>
                  </>
                )}
              </div>
              <div className=" mt-4">
                <form action="" onSubmit={onComment}>
                  <div class="form-group">
                    <input
                      type="text"
                      placeholder="Write Your Comment..."
                      class="form-control comment_input"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="comments">
                <div className="mb-2">
                  <b>Comments</b>
                </div>

                {[
                  1,
                  2,
                  3,
                  5,
                  4,
                  6,
                  6,
                  8,
                  ,
                  8,
                  8,
                  ,
                  ,
                  99,
                  ,
                  1,
                  2,
                  2,
                  5,
                  4,
                  ,
                  78,
                  7,
                  85,
                  ,
                  5,
                  4,
                  55,
                  5,
                  59,
                  9,
                ].map((val) => (
                  <div className="commentbox ">
                    <div>
                      <img
                        src="https://via.placeholder.com/150"
                        alt=""
                        className="com_logo"
                      />
                    </div>
                    <div>
                      <p className="m-0 fn_10 fn_col">Atanu Jana</p>
                      <p className="m-0 fn_12">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Illo, velit!
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-4 col-12 mx-auto mb-2">
              <div className="recomend_video_list">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 12].map((val, ind) => {
                  return (
                    <>
                      <div className="recomend_video" key={ind}>
                        <div className="row  mb-2">
                          <div className="col-lg-5 col-md-5 col-sm-6 col-6 mx-auto">
                            <Link href="/">
                              <a>
                                {' '}
                                <img
                                  src="https://via.placeholder.com/150"
                                  alt=""
                                  className="recomend_video_img"
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="col-lg-7 col-md-7 col-sm-6 col-6 mx-auto recomend_video_text">
                            <Link href="/">
                              <a>
                                <p className="m-0 fn_12 text-dark">
                                  <b>
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Facilis illo quasi natus.
                                    Laboriosam veritatis sunt quidem natus neque
                                    molestiae nisi beatae dicta ipsum at? Aut ab
                                    possimus exercitationem ea dolores!
                                  </b>
                                </p>
                              </a>
                            </Link>
                            <Link href="/">
                              <a>
                                <p className="m-0 fn_10 ">Atanu Jana</p>
                              </a>
                            </Link>
                            {/* <small className="fn_10">{format(new Date())}</small> */}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default VideoDetails;
