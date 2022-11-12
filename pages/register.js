import { Link } from '@mui/material';
import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onRegister = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="register">
        <div class="register_box">
          {/* <input type="checkbox" id="flip" /> */}
          <div class="cover">
            <div class="front">
              <img
                src="https://res.cloudinary.com/du9emrtpi/image/upload/v1668275666/stream/frontImg_bbuqsf.jpg"
                alt=""
              />
              <div class="text">
                <span class="text-1">
                  Show<span className="text-dark">Box</span>
                </span>
                <span class="text-2">Find your favourite video</span>
              </div>
            </div>
          </div>
          <div class="forms">
            <div class="form-content">
              <div class="signup-form">
                <div class="title">Signup</div>
                <form action="#" onSubmit={onRegister}>
                  <div class="input-boxes">
                    <div class="input-box">
                      <i class="fa fa-user"></i>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div class="input-box">
                      <i class="fa fa-envelope"></i>
                      <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div class="input-box">
                      <i class="fa fa-lock"></i>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div class="button input-box">
                      <input type="submit" value="Sumbit" />
                    </div>
                    <div class="text sign-up-text">
                      Already have an account?{' '}
                      <label>
                        <Link href="/login">
                          <a className="fn_col">Login now</a>
                        </Link>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
