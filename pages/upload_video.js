import { CircularProgress } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import CircularStatic from '../components/videos/UploadProgress';
import { apilink } from '../utils/data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const upload_video = ({ login, userInfo }) => {
  const tokon = Cookies.get('_showbox_access_user_tokon_');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [thumbnail, setThumbnail] = useState([]);
  const [video, setVideo] = useState([]);
  const [visibility, setVisibility] = useState(true);

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

  useEffect(() => {
    if (!login) {
      Cookies.remove('_showbox_access_user_tokon_');
      localStorage.removeItem('_showbox_access_user_login');
      console.clear();
      window.location.href = `/login`;
    }
  }, []);

  const onVideoUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(tags);

    // console.log(tagArray);

    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('thumbnail', thumbnail);
    formData.append('video', video);
    formData.append('visibility', visibility);

    const res = await axios.post(`${apilink}/api/user/uploadVideo`, formData, {
      headers: {
        Authorization: tokon,
      },
    });
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
  const handelThumb = async (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      if (
        files[0].type === 'image/jpeg' ||
        files[0].type === 'image/jpg' ||
        files[0].type === 'image/png'
      ) {
        if (files[0].size > 2000000) {
          // setStatus(true);
          notify('File Size is Too Large (Max 2Mb)');
          // console.log('size');
        } else {
          setThumbnail(files[0]);
          // setStatus(false);
          // setMsg('');
        }
      } else {
        // setStatus(true);
        notify('Only PNG, JPEG, JPG');
      }
    }
  };
  const handelVideo = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      if (
        files[0].type === 'video/mp4' ||
        files[0].type === 'video/x-m4v' ||
        files[0].type === 'video/*'
      ) {
        if (files[0].size > 100000000) {
          // setStatus(true);
          notify('File Size is Too Large (Max 100Mb)');
          // console.log('size');
        } else {
          setVideo(files[0]);
          // setStatus(false);
          // setMsg('');
        }
      } else {
        // setStatus(true);
        notify('Only Mp4 , x-m4v');
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <Layout>
        <div>
          <div className="p-3 upload_video">
            <div className="row">
              <div className="col-lg-8 col-md-10 col-12 mx-auto mb-2">
                <div className="card p-3">
                  <h5 className="fn_Col">Upload Your Video</h5>
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
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        placeholder="Write Title"
                        value={title}
                        onChange={onChangeTitle}
                        maxLength={101}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="Write Description"
                        name="description"
                        rows="3"
                        value={description}
                        onChange={onChangeDes}
                        maxLength={501}
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="tags"
                        placeholder="Write Tags (Like Video,Music,Song)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="">Visibility</label>
                      <select
                        className="form-control"
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value)}
                      >
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </select>
                    </div>
                    <label htmlFor="">Upload Thumbnail</label>
                    <div className="form-group ">
                      <input
                        type="file"
                        className="form-control"
                        name="thumbnail"
                        style={{ paddingBottom: '35px' }}
                        onChange={handelThumb}
                        accept=".png,.jpeg,.jpg"
                        required
                      />
                    </div>
                    <label htmlFor="">Upload Video</label>
                    <div className="form-group ">
                      <input
                        type="file"
                        className="form-control "
                        style={{ paddingBottom: '35px' }}
                        name="video"
                        onChange={handelVideo}
                        accept="video/mp4,video/x-m4v,video/*"
                        required
                      />
                    </div>
                    <br />
                    <div className="text-center">
                      <button
                        className={
                          loading ? 'btn btn-primary dis' : 'btn btn-primary'
                        }
                        disabled={loading}
                      >
                        Upload Video
                      </button>
                    </div>
                    {loading && (
                      <p className="m-1 fn_col fn_14 text-center">
                        Video Uploading... , Don't refresh Your Page
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
        </div>

        <Footer />
      </Layout>
    </>
  );
};

export default upload_video;

export const getServerSideProps = async ({ req, res }) => {
  const tokon = req.cookies._showbox_access_user_tokon_
    ? req.cookies._showbox_access_user_tokon_
    : null;
  const ress = await axios.get(`${apilink}/auth/isVerify`, {
    headers: {
      Authorization: tokon,
    },
  });
  // console.log(ress.data);

  return {
    props: {
      login: ress.data.success,
      userInfo: ress.data.userInfo || [],
    },
  };
};
