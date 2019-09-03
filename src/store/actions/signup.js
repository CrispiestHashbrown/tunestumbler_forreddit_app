import axios from 'axios';

import * as actionTypes from './actionTypes';

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signupSuccess = (userId, email) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        userId: userId,
        email: email
    };
};

export const signupFail = (timestamp, message) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        timestamp: timestamp,
        message: message
    };
};

export const signup = (email, password, shouldSignup) => {
    return (dispatch) => {
        dispatch(signupStart());
        const signupData = {
            email: email,
            password: password
        };

        // const url = 'http://localhost:8080/tunestumbler-wrapper-for-reddit/users';
        // this works with the jsonplaceholder url
        // but need to configure CORS for Tunestumbler API
        const url = 'https://jsonplaceholder.typicode.com/posts';
        axios.post(url, signupData)
            .then(response => {
                dispatch(signupSuccess(response.data.userId, response.data.email));
            })
            .catch(error => {
                dispatch(signupFail(error.timestamp, error.message));
            });
    };
};
