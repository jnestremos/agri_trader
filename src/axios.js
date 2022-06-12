const axios = require('axios');
import auth from './store/modules/Auth/auth';

const axiosClient  = axios.create({
    baseURL : 'http://localhost:8000/api',   
});

axiosClient.interceptors.request.use(config =>{
    config.headers.Authorization = `Bearer ${auth.state.user.api_token}`
    return config
});

export default axiosClient


