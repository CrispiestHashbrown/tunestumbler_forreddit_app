import axios from 'axios';

import * as actionTypes from './actionTypes';

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const loginSuccess = (userId, email, token) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        userId: userId,
        email: email,
        token: token
    };
};

export const loginFail = (timestamp, message) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        timestamp: timestamp,
        message: message
    };
};

export const logout = () => {
    return {
        type: actionTypes.LOGIN_LOGOUT
    };
};

export const checkLoginTimeout = (lifespan) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, lifespan*1000);
    };
};

export const login = (email, password, shouldLogin) => {
    return (dispatch) => {
        dispatch(loginStart());
        const loginData = {
            email: email,
            password: password
        };

        // const url = 'http://localhost:8080/tunestumbler-wrapper-for-reddit/users/login';
        // this works with the jsonplaceholder url
        // but need to configure CORS for Tunestumbler API
        const url = 'https://jsonplaceholder.typicode.com/posts';
        axios.post(url, loginData)
            .then(response => {
                // need to get userId and token from the headers
                dispatch(loginSuccess(response.headers.UserID, loginData.email, response.headers.Authorization));
                dispatch(checkLoginTimeout(response.data.lifespan));
            })
            .catch(error => {
                // TODO: add response codes
                // also need to change this if the Tunestumbler response turns out to be different
                // can check the API of the error handler that is used
                dispatch(loginFail(error.response.data.timestamp, error.response.data.message));
            });
    };
};
