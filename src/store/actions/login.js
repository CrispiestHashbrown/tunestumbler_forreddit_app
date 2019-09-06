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
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('lifespan');
    return {
        type: actionTypes.LOGIN_LOGOUT
    };
};

export const checkLoginTimeout = (lifespan) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, lifespan);
    };
};

export const login = (email, password, shouldLogin) => {
    return (dispatch) => {
        dispatch(loginStart());
        const loginData = {
            email: email,
            password: password
        };

        const headers = {
            'Content-Type': 'application/json'
        };
        
        // const url = 'http://localhost:8080/tunestumbler-wrapper-for-reddit/users/login';
        // const url = 'https://jsonplaceholder.typicode.com/posts';
        // this works with the jsonplaceholder url
        // but need to configure CORS for Tunestumbler API
        const url = 'https://jsonplaceholder.typicode.com/posts';
        axios.post(url, loginData, {headers})
            .then(response => {
                // need to get userId and token from the headers
                const lifespan = response.data.lifespan * 1000;
                const expirationDate = new Date(new Date().getTime() + lifespan);
                localStorage.setItem('userId', response.headers.UserID);
                localStorage.setItem('email', loginData.email);
                localStorage.setItem('token', response.headers.Authorization);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('lifespan', lifespan);
                dispatch(loginSuccess(response.headers.UserID, loginData.email, response.headers.Authorization));
                dispatch(checkLoginTimeout(lifespan));
            })
            .catch(error => {
                // TODO: add response codes
                // also need to change this if the Tunestumbler response turns out to be different
                // can check the API of the error handler that is used
                console.log(error);
                // dispatch(loginFail(error.response.data.timestamp, error.response.data.message));
            });
    };
};

export const loginCheckState = () => {
    return (dispatch) => {
        const userId = localStorage.getItem('userId');
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('token');
        if (!userId && !email && !token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(loginSuccess(userId, email, token));
                checkLoginTimeout(Number(localStorage.getItem('lifespan')));
            }
        }
    };
};