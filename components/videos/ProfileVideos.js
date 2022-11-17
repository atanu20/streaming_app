import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { apilink } from '../../utils/data';
import { useRouter } from 'next/router';

const ProfileVideos = ({ allvideo, myAccount, accountId, notify }) => {
  const tokon = Cookies.get('_showbox_access_user_tokon_');
  const [logoutstatus, setLogoutstatus] = useState(false);
  const [AllVideo, setAllVideo] = useState(allvideo);
  const [vID, setVID] = useState('');
  //  const router= useRouter()
  useEffect(() => {
    if (!myAccount) {
      setAllVideo(allvideo.filter((v) => v.isPublic == true));
    }
  }, []);
  const onDelete = async () => {
    // console.log(vID);
    const res = await axios.get(`${apilink}/api/user/onDeleteVideo/${vID}`, {
      headers: {
        Authorization: tokon,
      },
    });
    // console.log(res.data)
    if (res.data.success) {
      setAllVideo(AllVideo.filter((v) => v._id != vID));
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
    setLogoutstatus(false);
  };

  const getVideoDet = async () => {
    const res = await axios.post(
      `${apilink}/api/user/getAllVideo`,
      {
        accountId: accountId,
      },
      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    if (res.data.success) {
      setAllVideo(res.data.allvideo);
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
      <div className="cardVideo">
        <div className="row">
          {AllVideo?.map((val, ind) => {
            return (
              <>
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
                      {myAccount && (
                        <>
                          <small>
                            <Link href={`/video/edit/${val._id}`}>
                              <a>
                                {' '}
                                <i className="fa fa-edit fn_14 text-light cur"></i>
                              </a>
                            </Link>
                          </small>
                          <small>
                            {!val.isApprove ? (
                              <>
                                <i className="fa fa-eye-slash fn_14 text-danger"></i>
                              </>
                            ) : (
                              <>
                                {val.isPublic ? (
                                  <i className="fa fa-eye fn_14 text-success"></i>
                                ) : (
                                  <i className="fa fa-eye fn_14 text-warning"></i>
                                )}
                              </>
                            )}
                          </small>
                          <small>
                            <i
                              className="fa fa-trash-o fn_14 cur"
                              onClick={() => {
                                setVID(val._id);
                                setLogoutstatus(true);
                              }}
                            ></i>
                          </small>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      {logoutstatus && (
        <div className="modbox">
          <div className="smbox p-3">
            <div className="btn_close" onClick={() => setLogoutstatus(false)}>
              X
            </div>
            <p>
              Are you sure about <span className="fn_col">Delete</span> ?{' '}
            </p>
            <button className="btn btn-primary" onClick={() => onDelete()}>
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileVideos;
