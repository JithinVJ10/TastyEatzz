import axios from "axios";
import {toast} from 'react-toastify'

export const axiosInstance = axios.create({
    baseURL : 'http://localhost:5000',

    headers : {
        'authorization' : `Bearer ${localStorage.getItem('token')}`
    }
});

axiosInstance.interceptors.request.use((config) => {

    const userToken = localStorage.getItem('token');

    if (userToken !== null) {
        config.headers.authorization = `Bearer ${userToken}`;
    }
    return config;
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.error || 'An error occurred';
            // Show error toast with errorMessage
            toast.error(errorMessage, { duration: 2000, style: { color: '#fff', background: 'black' } });
        } else {
            // Handle other errors
            console.error('Axios error:', error);
        }
        return Promise.reject(error);
    }
)


export const adminAxiosInstance = axios.create({
    baseURL : 'http://localhost:5000/admin' , 
});

adminAxiosInstance.interceptors.request.use((config) => {
    const adminToken = localStorage.getItem('adminToken');

    if(adminToken) {
        try {
            const token = JSON.parse(adminToken)

            config.headers.authorization = `Bearer ${token}`
        } catch(error) {
            console.error("Error while parsing token: ", error)
        }
    }
    return config;
})

adminAxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.error || 'An error occurred';
            // Show error toast with errorMessage
            toast.error(errorMessage, { duration: 2000, style: { color: '#fff', background: 'black' } });
        } else {
            // Handle other errors
            console.error('Axios error:', error);
        }
        return Promise.reject(error);
    }
)
