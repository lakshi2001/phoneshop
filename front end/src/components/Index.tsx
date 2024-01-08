import React, { useState } from 'react';
import {
  MDBBtn
} from 'mdb-react-ui-kit';
import axios, { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

interface LoginData {
  [x: string]: any;
  email: string;
  password: string;
  isAdmin?: boolean; 
}

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (): void => {
    const loginData: LoginData = {
      email: email,
      password: password
    };

    axios.post('http://localhost:5000/users/login', loginData)
      .then((response: AxiosResponse<LoginData>) => {
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Login successful!',
        }).then(() => {
              Cookies.set('user_name', email, { expires: 7 });

             if((response.data.role) == "customer"){
              window.location.href="/customer/dashboard";
             }else{
              window.location.href="/admin/dashboard";
             }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Login failed. Invalid email or password.',
        });
        console.error('Login failed:', error);
      });
  };

  const registration_action = (): void => {
    window.location.href = '../Registration';
  };

  return (
    <div style={{ backgroundColor: '#DEDEDE' }}>
      <div className='container' style={{ paddingTop: '5%', paddingBottom: '10%' }}>
        <div className='row'>
          <div className='col'>
            <img src='../img/sign_in.png' style={{ paddingTop: '30%' , width :'85%' }} alt="Bus" />
          </div>
          <div className='col'>
            <div className='card'>
              <div className='card-body'>
                <div>
                  <h3 className='text-center text-uppercase text-decoration-underline'>Sign In</h3>
                </div>
                <div className='mb-3'>
                  <label htmlFor='email'>Email :</label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='password'>Password :</label>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className='text-center'>
                  <div className="d-grid gap-2 col-12 mx-auto">
                    <MDBBtn type='submit' className='btn btn-dark shadow-0' onClick={handleLogin}>Login</MDBBtn>
                  </div>
                </div>
                <hr style={{ marginTop: '10%' }} />
                <center>
                  <h6 className='text-uppercase ' style={{ cursor: 'pointer' }} onClick={registration_action}>I Do Not Have Account</h6>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
