import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apilink } from '../../utils/data';

const AdminDash = ({ login, userInfo, Allvideo, Alluser, Allcomm, error }) => {
  const [adminVideo, setAdminVideo] = useState(Allvideo);
  const [adminUser, setAdminUser] = useState(Alluser);
  const [singleVideo, setSingleVideo] = useState([]);

  const [logoutstatus, setLogoutstatus] = useState(false);
  const tokon = Cookies.get('_showbox_access_user_tokon_');

  const logout = () => {
    Cookies.remove('_showbox_access_user_tokon_');
    localStorage.removeItem('_showbox_access_user_login');
    console.clear();
    window.location.href = '/login';
  };

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

  const onApproved = async (id) => {
    // console.log(id);
    const res = await axios.get(`${apilink}/api/user/getAdminApproved/${id}`, {
      headers: {
        Authorization: tokon,
      },
    });
    if (res.data.success) {
      getadminVideoinfo();
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

  const onView = (id) => {
    setLogoutstatus(true);
    // setSingleVideo([]);
    setSingleVideo(adminVideo.filter((v) => v._id == id));
  };

  const onDelete = async (id) => {
    // console.log(id);
    const res = await axios.get(
      `${apilink}/api/user/onAdminDeleteVideo/${id}`,
      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    if (res.data.success) {
      setAdminVideo(adminVideo.filter((v) => v._id != id));
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
    // getadminVideoinfo();
    // console.log();
    if (!login || !userInfo?.isAdmin) {
      Cookies.remove('_showbox_access_user_tokon_');
      localStorage.removeItem('_showbox_access_user_login');
      console.clear();
      window.location.href = `/login`;
    }
  }, []);

  const onMakeAdmin = async (id) => {
    const res = await axios.get(`${apilink}/api/user/onMakeAdmin/${id}`, {
      headers: {
        Authorization: tokon,
      },
    });
    if (res.data.success) {
      getadminVideoinfo();
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

  const getadminVideoinfo = async () => {
    const res = await axios.get(`${apilink}/api/user/getAdminAllVideoanduser`, {
      headers: {
        Authorization: tokon,
      },
    });
    if (res.data.success) {
      setAdminVideo(res.data.allvideo);
      setAdminUser(res.data.alluser.filter((v) => v._id != userInfo._id));
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

  if (error) {
    return (
      <>
        <div className="account p-3">
          <div className="mt-4">
            <h4 className="text-danger">Something Wrong...</h4>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="admin_nav">
        <div className="inner_admin_nav">
          <Link href="/admin">
            <a className="logo hide_500">
              SB<span className="fn_col">Admin</span>
            </a>
          </Link>
          <Link href="/admin">
            <a className="logo view_500">
              SB<span className="fn_col">Admin</span>
            </a>
          </Link>
          <div>
            <button className="btn btn-primary mr-4" onClick={() => logout()}>
              Logout
            </button>
            <Link href="/" className="">
              <a target="_blank">
                <i class="fa fa-external-link" aria-hidden="true"></i>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="container admin_box">
        <h3 className="p-3">
          Welcome <span className="fn_col">{userInfo.name}</span>
        </h3>
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-6 col-12  mb-3">
            <div className="card">
              <i class="fa fa-users fa-3x fn_col" aria-hidden="true"></i>
              <h4 className="pt-2"> {adminUser.length} users </h4>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12  mb-3">
            <div className="card">
              <i class="fa fa-video-camera fa-3x fn_col" aria-hidden="true"></i>
              <h4 className="pt-2">{adminVideo.length} Videos </h4>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12  mb-3">
            <div className="card">
              <i class="fa fa-commenting fa-3x fn_col" aria-hidden="true"></i>
              <h4 className="pt-2">{Allcomm.length} Comments</h4>
            </div>
          </div>
        </div>

        <br />
        <div className="row mb-3">
          <div className="col-lg-7 col-md-12 col-sm-12 mx-auto mb-2 ">
            <div className="tbody_box">
              <div className="card ">
                <div className="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>User</th>
                        <th>Operation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminVideo?.map((val, ind) => {
                        return (
                          <>
                            <tr>
                              <td className="big_td">
                                <p className="m-0 fn_12">{val.title}</p>
                              </td>
                              <td className="user_td">
                                <p className="m-0 fn_12">{val.channelName}</p>
                              </td>
                              <td className="ope_td">
                                {val.isApprove ? (
                                  <>
                                    <button
                                      className="btn btn-sm-primary "
                                      style={{ cursor: 'no-drop' }}
                                      disabled={true}
                                    >
                                      <i className="fa fa-check-square-o text-success"></i>
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="btn btn-sm-primary "
                                      onClick={() => onApproved(val._id)}
                                    >
                                      <i className="fa fa-check-square-o text-danger"></i>
                                    </button>
                                  </>
                                )}
                                <button
                                  className="btn btn-sm-primary "
                                  onClick={() => onView(val._id)}
                                >
                                  <i className="fa fa-eye text-success"></i>
                                </button>
                                <button
                                  className="btn btn-sm-primary "
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        'Are you sure you want to delete this video?'
                                      )
                                    )
                                      onDelete(val._id);
                                  }}
                                >
                                  <i className="fa fa-trash text-danger"></i>
                                </button>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12 mx-auto mb-2">
            <div className="tbody_box">
              <div className="card ">
                <div className="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Operation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminUser?.map((val, ind) => {
                        return (
                          <>
                            <tr>
                              <td className="big_td">
                                <p className="m-0 fn_12">{val.name}</p>
                              </td>
                              <td className="user_td">
                                <p className="m-0 fn_12">{val.email}</p>
                              </td>
                              <td>
                                {val.isAdmin ? (
                                  <>
                                    <button
                                      className="btn btn-sm-primary "
                                      style={{ cursor: 'no-drop' }}
                                      disabled={true}
                                    >
                                      <i className="fa fa-check-square-o text-success"></i>
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="btn btn-sm-primary "
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            'Are you sure you want to make this user Admin?'
                                          )
                                        )
                                          onMakeAdmin(val._id);
                                      }}
                                    >
                                      <i className="fa fa-check-square-o text-danger"></i>
                                    </button>
                                  </>
                                )}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {logoutstatus && (
        <div className="mod_box">
          <div className="sm_box p-3">
            <div className="btn_close" onClick={() => setLogoutstatus(false)}>
              X
            </div>
            <p className="m-0">
              <span className="fn_col">Title: &nbsp;</span>
              {singleVideo[0]?.title}
            </p>
            <p className="m-0">
              <span className="fn_col">Description: &nbsp;</span>
              {singleVideo[0]?.description}
            </p>
            <p className="m-0">
              <span className="fn_col">Tags: &nbsp;</span>
              {singleVideo[0]?.tags.toString()}
            </p>
            <p className="m-0 fn_col">Video: </p>
            <div className="pt-2 video_tv">
              <video
                controls
                autoPlay
                disablePictureInPicture
                width="100%"
                height="300px"
                controlsList="nodownload"
              >
                <source src={singleVideo[0]?.channelvideo} />
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDash;

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
    const listdata = await axios.get(
      `${apilink}/api/user/getAdminAllVideoanduser`,
      {
        headers: {
          Authorization: tokon,
        },
      }
    );

    const udata = listdata.data.alluser.filter(
      (v) => v._id != ress.data.userInfo._id
    );

    return {
      props: {
        login: ress.data.success,
        userInfo: ress.data.userInfo || [],
        Allvideo: listdata.data.allvideo || [],
        Alluser: udata || [],
        Allcomm: listdata.data.allcomm || [],
        error: false,
      },
    };
  } catch (err) {
    return {
      props: {
        login: ress.data.success,
        userInfo: [],
        Allvideo: [],
        Alluser: [],
        Allcomm: [],
        error: true,
      },
    };
  }
};
