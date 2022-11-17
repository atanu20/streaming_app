import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { apilink } from '../../utils/data';
import axios from 'axios';

const SidebarSubList = ({ subscribedId }) => {
  const [cDetails, setCDetails] = useState([]);
  const tokon = Cookies.get('_showbox_access_user_tokon_');

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
    const res = await axios.post(
      `${apilink}/api/user/getRandomAccountDetails`,
      {
        accountId: subscribedId,
      },
      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    if (res.data.success) {
      setCDetails(res.data.user);
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
  }, [subscribedId]);

  return (
    <>
      <ToastContainer />
      <Link href={`/account/${cDetails._id}`}>
        <a className="">
          {' '}
          <img src={cDetails.profileimg} alt="" /> {cDetails.name}
        </a>
      </Link>
    </>
  );
};

export default SidebarSubList;
