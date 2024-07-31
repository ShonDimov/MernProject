import axios from 'axios';

const API = axios.create({
    baseURL: '/',  // Use '/api' because of the proxy setup
});

// Functions to fetch data from server
export const addUserData = (username, password) => API.get('/addUserData',
    {
        params: {
            username: username,
            password: password,
        }
    });
export const doesUsernameMatchPassword = (username, password) => API.get('/doesDataMatch',
    {
        params: {
            username: username,
            password: password,
        }
    });

export default API;