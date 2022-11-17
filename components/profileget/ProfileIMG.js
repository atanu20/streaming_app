import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { apilink } from '../../utils/data';

const ProfileIMG = ({ details }) => {
  const [userimg, setUserImg] = useState([]);
  const tokon = Cookies.get('_showbox_access_user_tokon_');
  useEffect(async () => {
    const res = await axios.post(
      `${apilink}/api/user/getRandomAccountDetails`,
      {
        accountId: details,
      },
      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    if (res.data.success) {
      setUserImg(res.data.user);
      // console.log(res.data.user);
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
      <img src={userimg.profileimg} alt="" className="com_logo" />
    </>
  );
};

export default ProfileIMG;
