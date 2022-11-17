import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import SubscriberSlider from '../../components/slider/SubscriberSlider';

import ProfileVideos from '../../components/videos/ProfileVideos';
import Footer from '../../components/Footer';
import { apilink } from '../../utils/data';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const account = ({
  login,
  loginuser,
  userInfo,
  allVideo,
  error,
  myAccount,
}) => {
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
  // console.log(allVideo);
  const router = useRouter();
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

  //   console.log(allVideo);
  const tokon = Cookies.get('_showbox_access_user_tokon_');
  const [imgloading, setImgLoading] = useState(false);
  const [userData, setUserData] = useState(userInfo);
  const [avideo, setAvideo] = useState(allVideo);
  const [postimg, setPostimg] = useState([]);
  const [editDesStatus, setEditDesStatus] = useState(false);
  const [editDes, setEditDes] = useState(userInfo?.channelDes);
  const [videoStatus, setVideoStatus] = useState(false);

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

  // useEffect(() => {
  //   getVideo_BYid();
  // }, []);

  useEffect(async () => {
    getVideo_BYid();
    const res = await axios.post(
      `${apilink}/api/user/getRandomAccountDetails`,
      {
        accountId: router.query.account_id,
      },
      {
        headers: {
          Authorization: tokon,
        },
      }
    );

    if (res.data.success) {
      setUserData(res.data.user);
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
  }, [router.query.account_id]);

  const getVideo_BYid = async () => {
    setVideoStatus(true);
    const res = await axios.post(
      `${apilink}/api/user/getAllVideo`,
      {
        accountId: router.query.account_id,
        my_account: loginuser._id === router.query.account_id,
      },
      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    // console.log(res.data.allvideo);
    if (res.data.success) {
      setAvideo(res.data.allvideo);
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
    setVideoStatus(false);
  };
  // console.log(MYvideo);
  const handelImg = async (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      if (
        files[0].type === 'image/jpeg' ||
        files[0].type === 'image/jpg' ||
        files[0].type === 'image/png'
      ) {
        if (files[0].size > 2000000) {
          notify('File Size is Too Large (Max 2Mb)');
        } else {
          setPostimg(files[0]);

          setImgLoading(true);
          let formData = new FormData();
          formData.append('file', files[0]);
          // console.log(files);
          const res = await axios.patch(
            `${apilink}/api/user/uploadProfileImg`,
            formData,
            {
              headers: {
                Authorization: tokon,
              },
            }
          );
          // console.log(res.data);
          if (res.data.success) {
            notify(res.data.msg);
            getmyinfo();
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
          setImgLoading(false);
        }
      } else {
        notify('Only PNG, JPEG, JPG');
      }
    }
  };

  const getmyinfo = async () => {
    const res = await axios.get(
      `${apilink}/api/user/infor`,

      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    // console.log(res.data);
    if (res.data.success) {
      // setUserData(res.data.user);
      window.location.reload();
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

  const onEditDesc = async (e) => {
    e.preventDefault();
    const res = await axios.patch(
      `${apilink}/api/user/updateDesc`,
      {
        channelDes: editDes,
      },
      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    // console.log(res.data);
    if (res.data.success) {
      notify(res.data.msg);
      setEditDesStatus(false);
      setUserData({ ...userData, channelDes: res.data.userInfo.channelDes });
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
        <div className="account p-3">
          <div className="col-lg-8 col-md-8 col-sm-10 col-12 mx-auto ">
            <div className="row">
              <div className="col-lg-4 col-md-5 col-sm-5 col-12 mx-auto mb-3 d-flex justify-content-center align-items-center ">
                <div className="account_img_box">
                  {imgloading ? (
                    <div className="text-center p-2">
                      <div className="shadow_box">
                        <CircularProgress size={45} />
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={
                          userData?.profileimg
                            ? userData?.profileimg
                            : 'https://res.cloudinary.com/du9emrtpi/image/upload/v1660128327/avatar/user_beo1wf.png'
                        }
                        alt="logo"
                        className="account_img"
                      />
                      {myAccount && (
                        <label htmlFor="file">
                          <div className="img_overflow">
                            <i className="fa fa-edit"></i>
                          </div>

                          <input
                            style={{ display: 'none' }}
                            type="file"
                            id="file"
                            onChange={handelImg}
                            accept=".png,.jpeg,.jpg"
                          />
                        </label>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="col-lg-8 col-md-7 col-sm-7 col-12 mx-auto mb-3">
                <div className="d-flex">
                  <h5 className="fn_col fn_600">{userData?.name}</h5>
                </div>
                <div className="d-flex">
                  <p className="fn_12 mr-2 m-0">
                    <b>{userData?.postCount} Posts</b>
                  </p>
                  <p className="fn_12 ml-2 m-0">
                    <b>{userData?.subscriberCount} Subscribers</b>
                  </p>
                </div>

                {editDesStatus ? (
                  <>
                    <form action="" className="mt-2" onSubmit={onEditDesc}>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          placeholder="Write Description"
                          name="description"
                          rows="3"
                          value={editDes}
                          onChange={(e) => setEditDes(e.target.value)}
                          required
                        ></textarea>
                      </div>
                      <div className="text-left">
                        <button className="btn btn-primary">Save</button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <p className="m-0 pt-2 fn_12">
                      {userData?.channelDes?.length > 0
                        ? userData?.channelDes
                        : 'Write About Your Channel'}
                    </p>
                  </>
                )}
                {myAccount && (
                  <div className="text-right">
                    {!editDesStatus ? (
                      <i
                        className="fa fa-edit cur fn_col"
                        onClick={() => setEditDesStatus(true)}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-times cur fn_col"
                        onClick={() => setEditDesStatus(false)}
                      ></i>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <SubscriberSlider
            notify={notify}
            subscribedList={userInfo?.subscribed}
          />
          <hr />
          <p>Your Videos</p>

          {videoStatus ? (
            <>
              <h5>Loading...</h5>
            </>
          ) : (
            <>
              <ProfileVideos
                allvideo={avideo}
                myAccount={myAccount}
                accountId={router.query.account_id}
                notify={notify}
              />
            </>
          )}
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default account;

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
    //   console.log(context.params.account_id);

    const userDe = await axios.post(
      `${apilink}/api/user/getRandomAccountDetails`,
      {
        accountId: context.params.account_id,
      },
      {
        headers: {
          Authorization: tokon,
        },
      }
    );

    //   console.log(userDe.data);

    const video_res = await axios.post(
      `${apilink}/api/user/getAllVideo`,
      {
        accountId: context.params.account_id,
        my_account: ress.data.userInfo._id === context.params.account_id,
      },
      {
        headers: {
          Authorization: tokon,
        },
      }
    );

    //   if (!userDe.data.success || !video_res.data.success) {

    //   }

    return {
      props: {
        login: ress.data.success,
        loginuser: ress.data.userInfo,
        userInfo: userDe.data.user || [],
        allVideo: video_res.data.allvideo || [],
        error: false,
        myAccount: ress.data.userInfo._id === context.params.account_id,
      },
    };
  } catch (err) {
    return {
      props: {
        login: ress.data.success,
        loginuser: [],
        userInfo: [],
        allVideo: [],
        error: true,
        myAccount: false,
      },
    };
  }
};
