import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { apilink } from '../utils/data';

const SubCount = ({ userID }) => {
  const [userDet, setUserDet] = useState([]);
  const [status, setStatus] = useState(false);

  const tokon = Cookies.get('_showbox_access_user_tokon_');

  useEffect(async () => {
    setStatus(true);
    const userDe = await axios.post(
      `${apilink}/api/user/getRandomAccountDetails`,
      {
        accountId: userID,
      },
      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    console.log(userDe.data.user);
    if (userDe.data.success) {
      setUserDet(userDe.data.user);
    } else {
      if (userDe.data.msg == 'Invalid Authentication.') {
        Cookies.remove('_showbox_access_user_tokon_');
        localStorage.removeItem('_showbox_access_user_login');
        console.clear();
        window.location.href = `/login`;
      } else {
        console.log(userDe.data.msg);
      }
    }
    setStatus(false);
  }, [userID]);

  return (
    <>
      <p className="m-0 fn_10"> {userDet?.subscriberCount} subscribers</p>
    </>
  );
};

export default SubCount;
