import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import { format } from 'timeago.js';
import axios from 'axios';
import { apilink } from '../../utils/data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import ProfileIMG from '../../components/profileget/ProfileIMG';
import { CircularProgress } from '@mui/material';
import SubCount from '../../components/SubCount';

const VideoDetails = ({
  login,
  isMyVideo,
  videoDet,
  comments,
  error,
  filterVideo,
  isLiked,
  isSub,
}) => {
  const tokon = Cookies.get('_showbox_access_user_tokon_');
  const [videoDetails, setVideoDetails] = useState(videoDet);
  const [likeStatus, setLikeStatus] = useState(isLiked);
  const [subStatus, setSubStatus] = useState(isSub);
  const [showDes, setShoeDes] = useState(false);
  const [comment, setComment] = useState('');
  const [allcomments, setAllComments] = useState(comments);
  const [loading, setLoading] = useState(false);

  // console.log(comments);
  const router = useRouter();
  const notify = (msg) =>
    toast.dark(msg, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    // getmyinfo();
    // console.log();
    if (!login) {
      Cookies.remove('_showbox_access_user_tokon_');
      localStorage.removeItem('_showbox_access_user_login');
      console.clear();
      window.location.href = `/login`;
    }
  }, []);

  if (error) {
    return (
      <>
        <Layout>
          <div className="account p-3">
            <div className="mt-4">
              <h4 className="text-danger">Something Wrong...</h4>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  const onComment = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${apilink}/api/user/postComments`,
      {
        message: comment,
        videoid: router.query.video_id,
      },
      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    if (res.data.success) {
      setComment('');
      setAllComments([res.data.newcomment, ...allcomments]);
    } else {
      if (res.data.msg == 'Invalid Authentication.') {
        Cookies.remove('_showbox_access_user_tokon_');
        localStorage.removeItem('_showbox_access_user_login');
        console.clear();
        window.location.href = `/login`;
      } else {
        notify(res.data.msg);
      }
    }
  };

  useEffect(() => {
    getVbyid();
    getCbyid();
    updateViews();
  }, [router.query.video_id]);

  const getVbyid = async () => {
    setLoading(true);
    const res = await axios.get(
      `${apilink}/api/user/getVideoById/${router.query.video_id}`,
      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    if (res.data.success) {
      setVideoDetails([]);
      setVideoDetails(res.data.videoDet);
    } else {
      if (res.data.msg == 'Invalid Authentication.') {
        Cookies.remove('_showbox_access_user_tokon_');
        localStorage.removeItem('_showbox_access_user_login');
        console.clear();
        window.location.href = `/login`;
      } else {
        notify(res.data.msg);
      }
    }
    setLoading(false);
  };

  const getCbyid = async () => {
    const res = await axios.get(
      `${apilink}/api/user/getCommentsById/${router.query.video_id}`,
      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    if (res.data.success) {
      setAllComments(res.data.comDet);
    } else {
      if (res.data.msg == 'Invalid Authentication.') {
        Cookies.remove('_showbox_access_user_tokon_');
        localStorage.removeItem('_showbox_access_user_login');
        console.clear();
        window.location.href = `/login`;
      } else {
        notify(res.data.msg);
      }
    }
  };
  // console.log(videoDetails);
  const updateViews = async () => {
    // console.log('updateViews');
    const res = await axios.get(
      `${apilink}/api/user/updateViews/${router.query.video_id}`,
      {
        headers: {
          Authorization: tokon,
        },
      }
    );

    if (res.data.success) {
      setVideoDetails(res.data.videoInfo);
    } else {
      if (res.data.msg == 'Invalid Authentication.') {
        Cookies.remove('_showbox_access_user_tokon_');
        localStorage.removeItem('_showbox_access_user_login');
        console.clear();
        window.location.href = `/login`;
      } else {
        notify(res.data.msg);
      }
    }
  };

  const updateLikes = async () => {
    // console.log('updateViews');
    const res = await axios.get(
      `${apilink}/api/user/updateLikes/${router.query.video_id}`,
      {
        headers: {
          Authorization: tokon,
        },
      }
    );

    if (res.data.success) {
      setLikeStatus(true);
      setVideoDetails(res.data.videoInfo);
    } else {
      if (res.data.msg == 'Invalid Authentication.') {
        Cookies.remove('_showbox_access_user_tokon_');
        localStorage.removeItem('_showbox_access_user_login');
        console.clear();
        window.location.href = `/login`;
      } else {
        notify(res.data.msg);
      }
    }
  };

  const onSubscribe = async () => {
    const res = await axios.post(
      `${apilink}/api/user/addSubscriber`,
      {
        channel_id: videoDet.userid,
      },
      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    if (res.data.success) {
      setSubStatus(true);
      // window.location.reload();
      // setVideoDetails(res.data.videoInfo);
    } else {
      if (res.data.msg == 'Invalid Authentication.') {
        Cookies.remove('_showbox_access_user_tokon_');
        localStorage.removeItem('_showbox_access_user_login');
        console.clear();
        window.location.href = `/login`;
      } else {
        notify(res.data.msg);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Layout>
        <div className="p-3 mt-4">
          <div className="row">
            <div className="col-md-8 col-12 mx-auto mb-4">
              {loading ? (
                <>
                  <div className="text-center p-2">
                    <CircularProgress size={45} />
                  </div>
                </>
              ) : (
                <>
                  <video
                    controls
                    autoPlay
                    disablePictureInPicture
                    width="100%"
                    height="300px"
                    controlsList="nodownload"
                  >
                    <source src={videoDetails?.channelvideo} />
                  </video>
                </>
              )}

              <div className="mt-2 m-1">
                <p className="m-0 fn_14">{videoDetails.title}</p>
              </div>
              <div className="p-1 video-flex ">
                <div className="d-flex">
                  <Link href={`/account/${videoDetails.userid}`}>
                    <a>
                      <img
                        src={videoDetails.profile_image}
                        alt=""
                        className="video_img"
                      />
                    </a>
                  </Link>
                  <div className="ml-2">
                    <Link href={`/account/${videoDetails.userid}`}>
                      <a className=" fn_12 fn_col ">
                        <span className="">{videoDetails.channelName}</span>
                      </a>
                    </Link>
                    <SubCount userID={videoDetails.userid} />
                  </div>
                </div>
                <div className="d-flex">
                  {isMyVideo ? (
                    <>
                      <Link href={`/video/edit/${videoDetails._id}`}>
                        <a className="btn subscribe_btn">Edit</a>
                      </Link>
                    </>
                  ) : (
                    <>
                      {subStatus ? (
                        <>
                          <button
                            className="btn subscribe_btn bg-dark"
                            disabled={true}
                          >
                            Subscribed
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn subscribe_btn"
                            onClick={() => onSubscribe()}
                          >
                            Subscribe
                          </button>
                        </>
                      )}
                    </>
                  )}
                  {/* <button
                    className="btn subscribe_btn"
                    onClick={() => onSubscribe()}
                  >
                    Subscribe
                  </button> */}
                  <p className="m-0 fn_14">
                    {videoDetails.views} <i className="fa fa-eye"></i>
                  </p>
                  <p className="m-0 fn_14 ml-3">
                    {videoDetails.likes} {''}
                    {likeStatus ? (
                      <>
                        <i className="fa fa-heart text-danger"></i>
                      </>
                    ) : (
                      <>
                        <i
                          className="fa fa-heart-o cur "
                          onClick={() => updateLikes()}
                        ></i>
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="video_des p-2">
                {showDes ? (
                  <>
                    <p className="m-0 fn_12 ">{videoDetails?.description}</p>
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
                      {videoDetails?.description?.substring(0, 200)}
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

                {allcomments?.map((val, ind) => {
                  return (
                    <>
                      <div className="commentbox " key={ind}>
                        <div>
                          <ProfileIMG details={val.userid} />
                        </div>
                        <div>
                          <p className="m-0 fn_10 fn_col">{val.name}</p>
                          <p className="m-0 fn_12">{val.message}</p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="col-md-4 col-12 mx-auto mb-2">
              <div className="recomend_video_list">
                {filterVideo?.map((val, ind) => {
                  return (
                    <>
                      <div className="recomend_video" key={ind}>
                        <div className="row  mb-2">
                          <div className="col-lg-5 col-md-5 col-sm-6 col-6 mx-auto">
                            <Link href={`/video/${val._id}`}>
                              <a>
                                {' '}
                                <img
                                  src={val.channelthumb}
                                  alt=""
                                  className="recomend_video_img"
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="col-lg-7 col-md-7 col-sm-6 col-6 mx-auto recomend_video_text">
                            <Link href={`/video/${val._id}`}>
                              <a>
                                <p className="m-0 fn_12 text-dark">
                                  <b>{val.title}</b>
                                </p>
                              </a>
                            </Link>
                            <Link href={`/account/${val.userid}`}>
                              <a>
                                <p className="m-0 fn_10 ">{val.channelName}</p>
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

export const getServerSideProps = async (context) => {
  const tokon = context.req.cookies._showbox_access_user_tokon_
    ? context.req.cookies._showbox_access_user_tokon_
    : null;
  const ress = await axios.get(`${apilink}/auth/isVerify`, {
    headers: {
      Authorization: tokon,
    },
  });

  try {
    const resvideo = await axios.get(
      `${apilink}/api/user/getVideoById/${context.params.video_id}`,
      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    // console.log(resvideo.data.videoDet.tags);
    const rescomm = await axios.get(
      `${apilink}/api/user/getCommentsById/${context.params.video_id}`,
      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    // console.log(rescomm.data);
    const likeornot = await axios.get(
      `${apilink}/api/user/likedornot/${context.params.video_id}`,
      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    // console.log(likeornot.data);

    const subscribe = await axios.post(
      `${apilink}/api/user/subscribedornot`,
      {
        channel_id: resvideo.data.videoDet.userid,
      },
      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    // console.log(subscribe.data);

    const listdata = await axios.get(`${apilink}/api/user/getAllFavVideo`, {
      headers: {
        Authorization: tokon,
      },
    });
    // console.log()

    let bestData = listdata.data.allvideo.filter(
      (v) => v._id != context.params.video_id
    );

    const filterByTag = (list, filters) => {
      // console.log(list);
      return list.filter((video) =>
        filters.some((filter) => video.tags.includes(filter))
      );
    };

    const filterVideo = filterByTag(bestData, resvideo.data.videoDet.tags);

    // console.log(filterVideo);

    return {
      props: {
        login: ress.data.success,
        isMyVideo: ress.data.userInfo._id == resvideo.data.videoDet.userid,
        videoDet: resvideo.data.videoDet || [],
        comments: rescomm.data.comDet || [],
        filterVideo: filterVideo,
        isLiked: likeornot.data.liked,
        error: false,
        isSub: subscribe.data.subscribed,
      },
    };
  } catch (err) {
    return {
      props: {
        login: ress.data.success,
        isMyVideo: false,
        videoDet: [],
        comments: [],
        error: true,
        isLiked: false,
        filterVideo: [],
        isSub: false,
      },
    };
  }
};
