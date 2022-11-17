import { useRouter } from 'next/router';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { apilink } from '../../utils/data';

const ActivateTokon = () => {
  const router = useRouter();
  // console.log(router.query.activate_tokon);
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
  const accountActivate = async () => {
    const res = await axios.post(`${apilink}/api/user/activation`, {
      activation_token: router.query.activate_tokon,
    });
    console.log(res.data);

    if (res.data.success) {
      router.push('/login');
    } else {
      notify(res.data.msg);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="activate_acc">
        <div className=" p-3">
          <div className="row">
            <div className="col-lg-6 col-md-8 col-12 mx-auto">
              <div className="card p-3">
                <h1 className="fn_600">
                  Show<span className="fn_col ">Box</span>
                </h1>
                <p className="">Click Here to Activate Your account</p>
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => accountActivate()}
                  >
                    Click Here
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivateTokon;
