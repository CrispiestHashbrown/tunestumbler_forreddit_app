import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.tunestumbler.ca/tunestumbler-wrapper-for-reddit'
    // baseURL: 'http://localhost:8080/tunestumbler-wrapper-for-reddit'
});

export default instance;