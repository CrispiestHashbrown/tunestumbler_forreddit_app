import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://tunestumblerapi-env.acddbsmryd.us-west-1.elasticbeanstalk.com/tunestumbler-wrapper-for-reddit'
    // baseURL: 'http://localhost:8080/tunestumbler-wrapper-for-reddit'
});

export default instance;