import React, { useState , ChangeEvent} from 'react';
import {
  MDBBtn
} from 'mdb-react-ui-kit';
import axios, { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

interface RegData {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  password: string;
  role: string;
  mostLikePhoneBrand: string;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

const phoneBrands: string[] = ['iPhone', 'Nokia', 'HTC'];


function Registration(): JSX.Element {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [telephone, setTelephone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [emailValidation, setEmailValidation] = useState<string>('');
    const [emailValidationColor, setEmailValidationColor] = useState<string>('');
    const [telephoneValidation, setTelephoneValidation] = useState<string>('');
    const [telephoneValidationColor, setTelephoneValidationColor] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [passValidation, setPassValidation] = useState<string>('');
    const [passValidationColor, setPassValidationColor] = useState<string>('');
    const [cpassValidation, setCPassValidation] = useState<string>('');
    const [cpassValidationColor, setCPassValidationColor] = useState<string>('');
    const [selectedBrand, setSelectedBrand] = useState<string>('');

  
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleBrandChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        setSelectedBrand(e.target.value);
    };

    const validateTelephone = (telephone: string): boolean => {
        const telephoneRegex = /^[0-9]{10}$/;
        return telephoneRegex.test(telephone);
    };
  
    const handleEmailInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
    
        if (!validateEmail(inputEmail)) {
          setEmailValidation('Invalid email format.');
          setEmailValidationColor('red');
        } else {
          setEmailValidation('Valid Email Address');
          setEmailValidationColor('green');
        }
    };
  
    const handleTelephoneInput = (e: ChangeEvent<HTMLInputElement>): void => {
        const inputTelephone = e.target.value;
        setTelephone(inputTelephone);
    
        if (!validateTelephone(inputTelephone)) {
          setTelephoneValidation('Invalid telephone number format.');
          setTelephoneValidationColor('red');
        } else {
          setTelephoneValidation('Valid telephone number');
          setTelephoneValidationColor('green');
        }
    };
    
    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);

        if (newConfirmPassword !== password) {
            setCPassValidation('Passwords do not match.');
            setCPassValidationColor('red');
        } else {
            setCPassValidation('Passwords are matching.');
            setCPassValidationColor('green');
        }
    };
    
    const isPasswordValid = (password: string): boolean => {
        const passwordRegex = /^(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };
    
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    
        if (!isPasswordValid(newPassword)) {
          setPassValidation('Password must be at least 8 characters long and contain at least one digit.');
          setPassValidationColor('red');
        } else {
          setPassValidation('Strong Password.');
          setPassValidationColor('green');
        }
    };

    const handleRegistration = async (): Promise<void> => {
        try {

            const registrationData: RegData = {
                name: name,
                email: email,
                address: address,
                password : password,
                role: 'customer', 
                phoneNumber: telephone,
                mostLikePhoneBrand: selectedBrand,
                timestamps: {
                    createdAt: new Date(), 
                    updatedAt: new Date() 
                }
            };
        
            const response = await axios.post('http://localhost:5000/customers/register', registrationData);
            console.log(response.data); 

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Registration successful!',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '../';
                }
            });
        } catch (error) {
            Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Registration failed. Please try again.',
            });
            console.error('Registration failed:', error);
        }
    };

    const login_action = (): void => {
        window.location.href = '../';
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
                  <h3 className='text-center text-uppercase text-decoration-underline'>Sign Up</h3>
                </div>
                <div className='mb-3'>
                  <label htmlFor='email'>Full Name :</label>
                  <input
                    type='text'
                    className='form-control'
                    id='fullname'
                    name='fullname'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='email'>Email :</label>
                  <input
                        type='email'
                        className='form-control'
                        id='email'
                        name='email'
                        value={email}
                        onChange={handleEmailInput}
                        required
                  />
                  <small style={{color:emailValidationColor}}>{emailValidation}</small>
                </div>
                <div className='mb-3'>
                    <label htmlFor='telephone'>Telephone :</label>
                    <input
                        type='text'
                        className='form-control'
                        id='telephone'
                        name='telephone'
                        value={telephone}
                        onInput={handleTelephoneInput}
                        required
                    />
                    <small style={{ color: telephoneValidationColor }}>{telephoneValidation}</small>
                </div>
                <div className='mb-3'>
                    <label htmlFor='address'>Address :</label>
                    <input
                        type='text'
                        className='form-control'
                        id='address'
                        name='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='passsword'>Most Like Phone Brand :</label>
                    <select className='form-select' value={selectedBrand} onChange={handleBrandChange}>
                        <option value="">Select Most Like Phone Brand</option>
                        {phoneBrands.map((brand, index) => (
                            <option key={index} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='mb-3'>
                    <label htmlFor='passsword'>Password :</label>
                    <input
                        type='password'
                        className='form-control'
                        id='password'
                        name='password'
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <small style={{color:passValidationColor}}>{passValidation}</small>
                </div>
                <div className='mb-3'>
                    <label htmlFor='cpasssword'>Confirm - Password :</label>
                    <input
                        type='password'
                        className='form-control'
                        id='confirmPassword'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    <small style={{ color: cpassValidationColor }}>{cpassValidation}</small>

                </div>
                <div className='text-center'>
                  <div className="d-grid gap-2 col-12 mx-auto">
                    <MDBBtn type='submit' className='btn btn-dark shadow-0' onClick={handleRegistration}>Login</MDBBtn>
                  </div>
                </div>
                <hr style={{ marginTop: '10%' }} />
                <center>
                  <h6 className='text-uppercase ' style={{ cursor: 'pointer' }} onClick={login_action}>I have a account</h6>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
