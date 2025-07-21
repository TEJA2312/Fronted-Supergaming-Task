import { useDispatch, useSelector } from 'react-redux';
import InputComponent from '../components/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ButtonTypeOne from '../components/buttonType';
import axios from 'axios';
import axiosInstance from '../config/axiosInstance';

function ChangePassword() {
  const [loginError, setLoginError] = useState(null);
    const user = useSelector(state => state.user.user);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const changePasswordCall = async (data) => {
        try {
          await axiosInstance.post('api/v1/user/changePassword', 
          {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
          },
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`
            }
          });
          
          navigate('/');

        } catch (error) {
          setLoginError(error?.response?.data);
          console.error('Error in POST request:', error);
        }
  };

   
  return (
   <section className='h-screen flex items-center'>
      <form onSubmit={handleSubmit(changePasswordCall)} className="w-1/2 mx-auto flex flex-col gap-8">
      <p className="text-2xl font-bold text-white">
        Change Your Password
      </p>
     
     {loginError && <p className="text-lg  text-red-400 mt-2">
        {loginError.error || loginError.message }
      </p>}
        <div>
          <InputComponent
            label="Old Password"
            type="Password"
            placeholder="Please enter your old password"
            {...register('oldPassword', {
              required: 'old password is required',
            })}
            className={errors.oldPassword ? 'border-red-500' : ''}
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message}</p>
          )}
        </div>
        <div>
          <InputComponent
            label="New Password of your Choice"
            type="text"
            placeholder="Please enter new password of your choice"
            {...register('newPassword', {
              required: 'new password should be provided',
              minLength: {
                 value: 6,
                 message: 'Password must be at least 6 characters',
              },
            })}
            className={errors.newPassword ? 'border-red-500' : ''}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
          )}
        </div>
        <ButtonTypeOne type={'submit'} label={'Proceed'} />
      </form>
   </section>
  )
}

export default ChangePassword