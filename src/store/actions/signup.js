import axios from 'axios';

import * as actionTypes from './actionTypes';

export const signupReset = () => {
    return {
        type: actionTypes.SIGNUP_RESET
    };
};

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signupSuccess = () => {
    return {
        type: actionTypes.SIGNUP_SUCCESS
    };
};

export const signupFail = (timestamp, message) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        timestamp: timestamp,
        message: message
    };
};

export const signup = (email, password) => {
    return (dispatch) => {
        dispatch(signupStart());
        const signupData = {
            email: email,
            password: password
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const url = 'http://localhost:8080/tunestumbler-wrapper-for-reddit/users';
        // const url = 'http://ec2-54-183-128-17.us-west-1.compute.amazonaws.com:8080/tunestumbler-wrapper-for-reddit/users';
        axios.post(url, signupData, {headers})
            .then(response => {
                dispatch(signupSuccess());
                dispatch(signupReset());
            })
            .catch(error => {
                error = error.response.data;
                dispatch(signupFail(error.timestamp, error.message));
            });
    };
};
