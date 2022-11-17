import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { apilink } from '../utils/data';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const sidenav = [
  {
    display: 'Upload Video',
    path: '/upload_video',
    fclass: 'fa-cloud-upload',
  },

  {
    display: 'History',
    path: '/history',
    fclass: 'fa-history',
  },
  {
    display: 'Liked Video',
    path: '/liked_video',
    fclass: 'fa-thumbs-o-up',
  },
];

const Navbar = () => {
  const tokon = Cookies.get('_showbox_access_user_tokon_');
  const [searchStatus, setSearchStatus] = useState(false);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [logoutstatus, setLogoutstatus] = useState(false);
  const [userDet, setUserDet] = useState([]);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openn = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onSub = async (e) => {
    e.preventDefault();

    let text = search.trim();
    text = text.replace(/\s/g, '+');
    router.push(`/search?search_query=${text}`);
    setSearch('');
    setSearchStatus(false);
  };
  const logout = () => {
    Cookies.remove('_showbox_access_user_tokon_');
    localStorage.removeItem('_showbox_access_user_login');
    console.clear();
    window.location.href = '/login';
  };

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
      {searchStatus ? (
        <>
          <div className="searchnav fixed-top">
            <form action="" onSubmit={onSub}>
              <div className="searchdiv">
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type to Search..."
                    value={search}
                    required
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button type="submit" className="input-group-text btn">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <i
                  className="fa fa-times cur"
                  style={{ fontSize: '18px' }}
                  aria-hidden="true"
                  onClick={() => {
                    setSearchStatus(false);
                    setSearch('');
                  }}
                ></i>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="whole_navbar fixed-top">
            <div className="leftnav">
              <i
                className="fa fa-bars mr-2 cur view_992"
                onClick={() => setOpen(true)}
              ></i>
              <Link href="/">
                <a className="logo hide_500">
                  Show<span className="fn_col">Box</span>
                </a>
              </Link>
              <Link href="/">
                <a className="logo view_500">
                  S<span className="fn_col">B</span>
                </a>
              </Link>
            </div>
            <div className="rightnav">
              <div className="search_bar">
                <i className="fa fa-search fn_grey"></i>
                <form action="" onSubmit={onSub}>
                  <input
                    type="text"
                    name="search"
                    placeholder="Type to Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    required
                  />
                </form>
              </div>
              <div className="profile_bar">
                <div className="d_view">
                  <img
                    src="https://res.cloudinary.com/du9emrtpi/image/upload/v1668012350/stream/icons8-search-50_raketb.png"
                    alt=""
                    className="cur"
                    style={{ width: '20px' }}
                    onClick={() => {
                      setSearchStatus(true);
                    }}
                  />
                </div>
                <div className=" ml-3">
                  <Link href="/upload_video">
                    <a>
                      <img
                        src="https://res.cloudinary.com/du9emrtpi/image/upload/v1668007039/stream/video-plus_kdfri8.svg"
                        alt=""
                        className="cur"
                      />
                    </a>
                  </Link>
                </div>
                <div className="notification ml-4">
                  <div>
                    <span className="fn_10 text-light">0</span>
                  </div>
                  <i className="fa fa-bell-o"></i>
                </div>

                <div className="profile_img ml-4 cur" onClick={handleClick}>
                  <img
                    src={
                      userDet?.profileimg
                        ? userDet?.profileimg
                        : 'https://res.cloudinary.com/du9emrtpi/image/upload/v1660128327/avatar/user_beo1wf.png'
                    }
                    alt=""
                  />
                </div>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openn}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  className="right_nav_link"
                >
                  <MenuItem>
                    <Link href={`/account/${userDet._id}`}>
                      <a className="nav_item">
                        <ListItemIcon>
                          <PersonIcon fontSize="small" />
                        </ListItemIcon>
                        Profile
                      </a>
                    </Link>
                  </MenuItem>
                  {userDet?.isAdmin && (
                    <MenuItem>
                      <Link href="/admin">
                        <a className="nav_item">
                          <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                          </ListItemIcon>
                          Admin
                        </a>
                      </Link>
                    </MenuItem>
                  )}

                  <MenuItem onClick={() => setLogoutstatus(true)}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>

                <Drawer open={open} onClose={() => setOpen(false)}>
                  <Toolbar className="nav-wid">
                    <Link href="/" onClick={() => setOpen(false)}>
                      <a className="logo mt-1">
                        <h3 className="text-ligh fn_700">
                          Show<span className="text-dark">Box</span>
                        </h3>
                      </a>
                    </Link>
                  </Toolbar>

                  <Divider />
                  <ul className="listsize">
                    <li>
                      <Link href="/">
                        <a>
                          <i className="fa fa-home mr-2"></i>
                          <ListItemText primary="Home" />
                        </a>
                      </Link>
                    </li>
                    {sidenav?.map((val, ind) => {
                      return (
                        <li key={ind}>
                          <Link href={val.path}>
                            <a>
                              <i className={`${val.fclass} fa mr-2`}></i>
                              <ListItemText primary={val.display} />
                            </a>
                          </Link>
                        </li>
                      );
                    })}

                    <li>
                      <Link href={`/account/${userDet._id}`}>
                        <a>
                          <i className="fa fa-user-o mr-2"></i>
                          <ListItemText primary="Account" />
                        </a>
                      </Link>
                    </li>
                  </ul>
                </Drawer>
              </div>
            </div>
          </div>

          {logoutstatus && (
            <div className="modbox">
              <div className="smbox p-3">
                <div
                  className="btn_close"
                  onClick={() => setLogoutstatus(false)}
                >
                  X
                </div>
                <p>Are you sure about Logout? </p>
                <button className="btn btn-primary" onClick={() => logout()}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Navbar;
