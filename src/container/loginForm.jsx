import axios from 'axios';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserCreds } from '../redux/userSlice.js';
import { useNavigate } from 'react-router-dom';

import ButtonType from '../components/buttonType.jsx';
import InputComponent from "../components/input.jsx";
import axiosInstance from '../config/axiosInstance.js';

export default function LoginForm() {
  
  const [loginError, setLoginError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const loginCall = async (data) => {
    try {
      const response = await axiosInstance.post('api/v1/user/login', {
        email: data.email,
        password: data.password
      });

      dispatch(setUserCreds(response.data));
      
      if(response.data.loginAttempts === 1){
          navigate('/change-password');
      } else {
        navigate('/');
      }

    } catch (error) {
      setLoginError(error.response.data);
      console.error('Error in loginCall function', error);
    }
  };

  return (
    <article className="w-[80%] mx-auto border-white">
      <p className="text-xl font-bold text-white">
        Login to SuperGaming Platform created by tejas.shirnalkar@gmail.com
      </p>
     {loginError && <p className="text-sm text-red-400 mt-4">
        {loginError.error}
      </p>}

      <form onSubmit={handleSubmit(loginCall)} className="w-full flex flex-col gap-4 mt-6">
        <div>
          <InputComponent
            label="Email Address"
            type="text"
            placeholder="Please enter your pre approved email address here"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format',
              },
            })}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <InputComponent
            label="Password"
            type="password"
            placeholder="Please enter the password you were provided"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            className={errors.password ? 'border-red-500' : ''}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <ButtonType type={'submit'} label={'Proceed'} />
      </form>
    </article>
  );
}
