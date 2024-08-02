import axios from 'axios';

const API = axios.create({
    baseURL: '/',  // Use '/api' because of the proxy setup
});

// API calls to server
export const loginRequest = (username, password) => API.get('/login',
    {
        params: {
            username: username,
            password: password,
        }
    });
export const signupRequest = (username, password) => API.get('/signup',
    {
        params: {
            username: username,
            password: password,
        }
    });
export const enterStoreRequest = () => API.get('/enterStore', {})
export const logoutRequest = () => API.get('/logout', {})
export const getCards = () => API.get('/getCards', {})

export default API;