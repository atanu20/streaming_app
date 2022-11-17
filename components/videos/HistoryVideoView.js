import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { apilink } from '../../utils/data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { format } from 'timeago.js';
import ProfileIMG from '../profileget/ProfileIMG';

const HistoryVideoView = ({ video_id }) => {
  const tokon = Cookies.get('_showbox_access_user_tokon_');
  const [VideoDet, setVideoDet] = useState([]);

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

  useEffect(async () => {
    const res = await axios.get(
      `${apilink}/api/user/getVideoById/${video_id}`,
      {
        headers: {
          Authorization: tokon,
        },
      }
    );

    // console.log(res.data.videoDet);
    if (res.data.success) {
      setVideoDet(res.data.videoDet);
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
  }, []);

  return (
    <>
      <ToastContainer />
      {VideoDet && (
        <div className="col-lg-3 col-md-4 col-sm-6 col-12  mb-2">
          <div className="card">
            <Link href={`/video/${VideoDet?._id}`}>
              <a>
                <img src={VideoDet?.channelthumb} alt="" />
              </a>
            </Link>
            <div className="p-2 card_text_box">
              {/* <Link href={`/account/${VideoDet?.userid}`}>
                <a>
                  <ProfileIMG details={VideoDet.userid} />{' '}
                </a>
              </Link> */}
              <div>
                <Link href={`/account/${VideoDet?.userid}`}>
                  <a className="text-light fn_12">{VideoDet.channelName}</a>
                </Link>
                <Link href={`/video/${VideoDet?._id}`}>
                  <a>
                    <p className="">{VideoDet?.title}</p>
                  </a>
                </Link>
              </div>
            </div>

            <div className="pl-2 pr-2 pb-3  small_boxx">
              <small> {VideoDet?.views} views</small>
              <small>{format(new Date(VideoDet?.uploadAt))}</small>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryVideoView;
