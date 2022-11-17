import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { apilink } from '../utils/data';
import { format } from 'timeago.js';
import ProfileIMG from '../components/profileget/ProfileIMG';
import Link from 'next/link';

const search = () => {
  const router = useRouter();
  const tokon = Cookies.get('_showbox_access_user_tokon_');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(async () => {
    const res = await axios.get(
      `${apilink}/api/user/search/${router.query.search_query}`,
      {
        headers: {
          Authorization: tokon,
        },
      }
    );

    if (res.data.success) {
      setSearchResult(res.data.videoList);
    } else {
      if (res.data.msg == 'Invalid Authentication.') {
        Cookies.remove('_showbox_access_user_tokon_');
        localStorage.removeItem('_showbox_access_user_login');
        console.clear();
        window.location.href = `/login`;
      } else {
      }
    }
  }, [router.query.search_query]);

  if (
    Object.keys(router.query).length == 0 ||
    router.query.search_query.length == 0
  ) {
    return (
      <>
        <Layout>
          <div className="p-3 fn_col">
            <h3>No Result Found</h3>
          </div>
        </Layout>
      </>
    );
  }
  return (
    <>
      <Layout>
        <div className="p-3 search">
          <p className="m-0 mt-2">
            <span className="fn_col">{searchResult.length}</span> results based
            on <span className="fn_col">{router.query.search_query}</span>
          </p>
          <br />
          <div className="row">
            {searchResult?.map((val, ind) => {
              return (
                <>
                  <div
                    className="col-lg-8 col-md-10 col-12 mx-auto mb-3"
                    key={ind}
                  >
                    <div className="card p-2">
                      <div className="card-flex">
                        <div className="card-flex-2">
                          <Link href={`/video/${val?._id}`}>
                            <a>
                              <img
                                src={val.channelthumb}
                                alt=""
                                className="search_img"
                              />
                            </a>
                          </Link>
                        </div>
                        <div className="card-flex-2">
                          <div className="p-2">
                            <Link href={`/video/${val?._id}`}>
                              <a className="text-dark">
                                <p className="m-0 fn_14">{val.title}</p>
                              </a>
                            </Link>

                            <div className="profile_img_card fn_12 mt-1 mb-1">
                              <small>
                                {' '}
                                <span className="fn_col">{val.views}</span>{' '}
                                Views
                              </small>
                              <small className="ml-2">
                                {' '}
                                <span className="fn_col">{val.likes}</span>{' '}
                                Likes
                              </small>
                              <small className="ml-2">
                                {format(new Date(val.uploadAt))}
                              </small>
                            </div>
                            <div className="profile_img_card">
                              <Link href={`/account/${val?.userid}`}>
                                <a>
                                  <ProfileIMG details={val.userid} />
                                </a>
                              </Link>
                              <Link href={`/account/${val?.userid}`}>
                                <a>
                                  {' '}
                                  <p className="m-0 ml-2 fn_12 fn_col">
                                    {val.channelName}
                                  </p>
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default search;
