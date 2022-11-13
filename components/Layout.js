import Link from 'next/link';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { useRouter } from 'next/router';

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
  {
    display: 'Account',
    path: '/account',
  },
];

const Layout = ({ children }) => {
  const router = useRouter();
  // console.log(router.pathname);
  const active = sidenav.findIndex((e) => e.path === router.pathname);
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
          </ul>
          <hr />
          <p className="pl-2 m-0 ">Subscriptions</p>
          <ul className="subscrip mb-5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 6].map(
              (val, ind) => (
                <li className="m-0 " key={ind}>
                  <Link href="/">
                    <a className="">
                      {' '}
                      <img
                        src="https://res.cloudinary.com/du9emrtpi/image/upload/v1665580614/rxm0aphl7nkn28lvlrrp.jpg"
                        alt=""
                      />{' '}
                      Unique FoF
                    </a>
                  </Link>
                </li>
              )
            )}
          </ul>
          <br />
        </div>
        <div className="right_sidebar">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
