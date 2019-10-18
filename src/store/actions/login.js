import axios from '../../axios-urls/axios-tunestumbler';

import * as actionTypes from './actionTypes';

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const loginSuccess = (userId, loginToken) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        userId: userId,
        loginToken: loginToken
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
    localStorage.removeItem('loginToken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('lifetime');
    localStorage.removeItem('lifetime');
    return {
        type: actionTypes.LOGIN_LOGOUT
    };
};

export const checkLoginTimeout = (lifetime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, lifetime);
    };
};

export const login = (email, password) => {
    return (dispatch) => {
        dispatch(loginStart());
        const loginData = {
            email: email,
            password: password
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        
        const uri = '/users/login';
        axios.post(uri, loginData, {headers})
            .then(response => {
                const lifetime = response.headers.lifetime;
                const expirationDate = new Date(new Date().getTime() + new Date().setTime(lifetime));
                localStorage.setItem('userId', response.headers.userid);
                localStorage.setItem('loginToken', response.headers.authorization);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('lifetime', lifetime);
                dispatch(loginSuccess(response.headers.userid, response.headers.authorization));
                dispatch(checkLoginTimeout(lifetime));
            })
            .catch(error => {
                error = error.response.data;
                dispatch(loginFail(error.timestamp, error.message));
            });
    };
};

export const loginCheckState = () => {
    return (dispatch) => {
        const userId = localStorage.getItem('userId');
        const loginToken = localStorage.getItem('loginToken');
        if ((!userId || userId === 'undefined') && (!loginToken || loginToken === 'undefined')) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(loginSuccess(userId, loginToken));
                checkLoginTimeout(Number(localStorage.getItem('lifetime')));
            }
        }
    };
};