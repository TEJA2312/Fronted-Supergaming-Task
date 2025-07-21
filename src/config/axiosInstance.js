import axios from 'axios';
import { store } from '../redux/store'; 
import { setUserCreds } from '../redux/userSlice.js';

const axiosInstance = axios.create({
  baseURL: 'http://54.226.102.198:8080/',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (
      error.response &&
      error.response.status === 403 &&
      error.response.data?.message === 'Your access token has expired'
    ) {
      try {
        console.log('refreshing access token using refresh token...')
        const response = await axiosInstance.post('api/v1/user/grantNewAccessToken');
        store.dispatch(setUserCreds(response.data));
        window.location.reload();
        
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
