import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import Footer from '../../../components/Footer';
import Layout from '../../../components/Layout';
import { apilink } from '../../../utils/data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';

const Edit_vid = ({ login, videoDet, userInfo, error }) => {
  // console.log(videoDet);
  const tokon = Cookies.get('_showbox_access_user_tokon_');
  const [title, setTitle] = useState(videoDet.title);
  const [description, setDescription] = useState(videoDet.description);
  const [tags, setTags] = useState(videoDet.tags.toString());
  const [visibility, setVisibility] = useState(videoDet.isPublic);

  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const onVideoUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post(
      `${apilink}/api/user/updateVideoDetails`,
      {
        title,
        description,
        tags,
        visibility,
        vid: router.query.edit_vid,
      },
      {
        headers: {
          Authorization: tokon,
        },
      }
    );
    // console.log(res.data);
    if (res.data.success) {
      // setStatus(true);
      notify(res.data.msg);
      setTimeout(() => {
        router.push(`/account/${userInfo._id}`);
      }, 5000);
    } else {
      if (res.data.msg == 'Invalid Authentication.') {
        Cookies.remove('_showbox_access_user_tokon_');
        localStorage.removeItem('_showbox_access_user_login');
        console.clear();
        window.location.href = `/login`;
      } else {
        // setStatus(true);
        notify(res.data.msg);
      }
    }
    setLoading(false);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    if (e.target.value.length > 100) {
      setStatus(true);
      setMsg('Title should be <= 100 characters');
    } else {
      setStatus(false);
      setMsg('');
    }
  };

  const onChangeDes = (e) => {
    setDescription(e.target.value);
    if (e.target.value.length > 500) {
      setStatus(true);
      setMsg('Description should be <= 500 characters');
    } else {
      setStatus(false);
      setMsg('');
    }
  };

  useEffect(() => {
    if (!login) {
      Cookies.remove('_showbox_access_user_tokon_');
      localStorage.removeItem('_showbox_access_user_login');
      console.clear();
      window.location.href = `/login`;
    }
  }, []);

  if (error) {
    return (
      <>
        <Layout>
          <div className="account p-3">
            <div className="mt-4">
              <h4 className="text-danger">Something Wrong...</h4>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <Layout>
        <div className="p-3 upload_video">
          <div className="row">
            <div className="col-lg-8 col-md-10 col-12 mx-auto mb-2">
              <div className="card p-3">
                <h5 className="fn_Col">Update Your Video</h5>
                <hr />
                {status && (
                  <div class="alert alert-info alert-dismissible fn_14">
                    <button
                      type="button"
                      class="close fn_14"
                      data-dismiss="alert"
                      onClick={() => setStatus(false)}
                    >
                      &times;
                    </button>
                    {msg}
                  </div>
                )}

                <form action="" onSubmit={onVideoUpload}>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="title"
                      placeholder="Write Title"
                      value={title}
                      onChange={onChangeTitle}
                      required
                      maxLength={101}
                    />
                  </div>
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      placeholder="Write Description"
                      name="description"
                      rows="3"
                      value={description}
                      onChange={onChangeDes}
                      required
                      maxLength={501}
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="tags"
                      placeholder="Write Tags (Like Video,Music,Song)"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label htmlFor="">Visibility</label>
                    <select
                      class="form-control"
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value)}
                    >
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>
                  </div>

                  <br />
                  <div className="text-center">
                    <button
                      className={
                        loading ? 'btn btn-primary dis' : 'btn btn-primary'
                      }
                      disabled={loading}
                    >
                      Save Video
                    </button>
                  </div>
                  {loading && (
                    <p className="m-1 fn_col fn_14 text-center">
                      Updating Video Details...
                    </p>
                  )}
                  {loading && (
                    <div className="text-center p-2">
                      <CircularProgress size={35} />
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default Edit_vid;

export const getServerSideProps = async (context) => {
  const tokon = context.req.cookies._showbox_access_user_tokon_
    ? context.req.cookies._showbox_access_user_tokon_
    : null;
  const ress = await axios.get(`${apilink}/auth/isVerify`, {
    headers: {
      Authorization: tokon,
    },
  });

  try {
    const resvideo = await axios.get(
      `${apilink}/api/user/getVideoById/${context.params.edit_vid}`,
      {
        headers: {
          Authorization: tokon,
        },
      }
    );

    return {
      props: {
        login: ress.data.success,
        videoDet: resvideo.data.videoDet || [],
        userInfo: ress.data.userInfo || [],
        error: false,
      },
    };
  } catch (err) {
    return {
      props: {
        login: ress.data.success,
        videoDet: [],
        userInfo: [],
        error: true,
      },
    };
  }
};
