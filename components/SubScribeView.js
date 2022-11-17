import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { apilink } from '../utils/data';

const SubScribeView = ({ notify, channelid }) => {
  const [cDetails, setCDetails] = useState([]);
  const tokon = Cookies.get('_showbox_access_user_tokon_');

  useEffect(async () => {
    const res = await axios.post(
      `${apilink}/api/user/getRandomAccountDetails`,
      {
        accountId: channelid,
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
  }, [channelid]);

  return (
    <>
      <Link href={`/account/${cDetails._id}`}>
        <a>
          <img src={cDetails.profileimg} alt="" className="subscriber_img" />
        </a>
      </Link>
      <p className="m-0 fn_10">{cDetails.name}</p>
    </>
  );
};

export default SubScribeView;
