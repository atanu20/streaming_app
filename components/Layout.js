import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { useRouter } from 'next/router';
import CircularStatic from './videos/UploadProgress';
import { apilink } from '../utils/data';
import axios from 'axios';
import Cookies from 'js-cookie';
import SidebarSubList from './subscribeCom/SidebarSubList';

const sidenav = [
  {
    display: 'Upload Video',
    path: '/upload_video',
  },

  {
    display: 'History',
    path: '/history',
  },
  {
    display: 'Liked Video',
    path: '/liked_video',
  },
];

const Layout = ({ children }) => {
  const tokon = Cookies.get('_showbox_access_user_tokon_');
  const router = useRouter();
  const [userDet, setUserDet] = useState([]);
  // console.log();
  const active = sidenav.findIndex((e) => e.path === router.pathname);

  useEffect(async () => {
    const res = await axios.get(`${apilink}/auth/isVerify`, {
      headers: {
        Authorization: tokon,
      },
    });
    if (!res.data.success) {
    } else {
      setUserDet(res.data.userInfo);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className=" main_div">
        <div className="left_sidebar pt-3">
          <ul>
            {sidenav?.map((val, i) => {
              return (
                <li className={i === active ? 'active' : ''} key={i}>
                  <Link href={val.path}>
                    <a className="side_bar_nav">{val.display}</a>
                  </Link>
                </li>
              );
            })}
            <li
              className={
                router.pathname == '/account/[account_id]' ? 'active' : ''
              }
            >
              <Link href={`/account/${userDet._id}`}>
                <a className="side_bar_nav">Account</a>
              </Link>
            </li>
          </ul>
          <hr />
          <p className="pl-2 m-0 ">Subscriptions</p>
          <ul className="subscrip mb-5">
            {userDet?.subscribed?.map((val, ind) => (
              <li className="m-0 " key={ind}>
                <SidebarSubList subscribedId={val} />
              </li>
            ))}
          </ul>
          <br />
        </div>
        <div className="right_sidebar">
          <main>{children}</main>
          {/* <div className="upload_progress">
            <CircularStatic className="ml-5" uploadPercentage={10} />
            <p className="m-0">X</p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Layout;
