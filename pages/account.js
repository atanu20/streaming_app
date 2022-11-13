import React, { useState } from 'react';
import Layout from '../components/Layout';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from '@mui/material';
import SubscriberSlider from '../components/slider/SubscriberSlider';

import ProfileVideos from '../components/videos/ProfileVideos';
import Footer from '../components/Footer';

const account = () => {
  const [imgloading, setImgLoading] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [postimg, setPostimg] = useState([]);
  const [editDesStatus, setEditDesStatus] = useState(false);
  const [editDes, setEditDes] = useState('');

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

  const handelImg = async (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      if (
        files[0].type === 'image/jpeg' ||
        files[0].type === 'image/jpg' ||
        files[0].type === 'image/png'
      ) {
        if (files[0].size > 1024 * 1024) {
          notify('File Size is Too Large');
        } else {
          setPostimg(files[0]);

          setImgLoading(true);
          let formData = new FormData();
          formData.append('file', files[0]);
          // console.log(files);

          setImgLoading(false);
        }
      } else {
        notify('Only PNG, JPEG, JPG');
      }
    }
  };
  const onEditDesc = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <ToastContainer />
      <Layout>
        <div className="account p-3">
          <div className="col-lg-8 col-md-8 col-sm-10 col-12 mx-auto ">
            <div className="row">
              <div className="col-lg-4 col-md-5 col-sm-5 col-12 mx-auto mb-3 d-flex justify-content-center align-items-center ">
                <div className="account_img_box">
                  {imgloading ? (
                    <div className="text-center p-2">
                      <div className="shadow_box">
                        <CircularProgress size={45} />
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={
                          avatar
                            ? avatar
                            : 'https://res.cloudinary.com/du9emrtpi/image/upload/v1660128327/avatar/user_beo1wf.png'
                        }
                        alt="logo"
                        className="account_img"
                      />
                      <label htmlFor="file">
                        <div className="img_overflow">
                          <i className="fa fa-edit"></i>
                        </div>
                        <input
                          style={{ display: 'none' }}
                          type="file"
                          id="file"
                          onChange={handelImg}
                          accept=".png,.jpeg,.jpg"
                        />
                      </label>
                    </>
                  )}
                </div>
              </div>
              <div className="col-lg-8 col-md-7 col-sm-7 col-12 mx-auto mb-3">
                <div className="d-flex">
                  <h5 className="fn_col fn_600">Atanu Jana</h5>
                </div>
                <div className="d-flex">
                  <p className="fn_12 mr-2 m-0">
                    <b>2 Posts</b>
                  </p>
                  <p className="fn_12 ml-2 m-0">
                    <b>2 Subscribers</b>
                  </p>
                </div>

                {editDesStatus ? (
                  <>
                    <form action="" className="mt-2" onSubmit={onEditDesc}>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          placeholder="Write Description"
                          name="description"
                          rows="3"
                          value={editDes}
                          onChange={(e) => setEditDes(e.target.value)}
                          required
                        ></textarea>
                      </div>
                      <div className="text-left">
                        <button className="btn btn-primary">Save</button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <p className="m-0 pt-2 fn_12">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Commodi aspernatur quidem corporis corrupti accusamus, ut
                      facilis eius laboriosam explicabo, doloribus nam aliquam,
                      inventore architecto eum enim tempora at nesciunt
                      doloremque?
                    </p>
                  </>
                )}
                <div className="text-right">
                  <i
                    className="fa fa-edit cur fn_col"
                    onClick={() => setEditDesStatus(true)}
                  ></i>
                </div>
              </div>
            </div>
          </div>
          <SubscriberSlider />
          <hr />
          <p>Your Videos</p>
          <ProfileVideos />
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default account;
