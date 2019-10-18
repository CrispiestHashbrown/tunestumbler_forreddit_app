import axios from '../../axios-urls/axios-tunestumbler';

import * as actionTypes from './actionTypes';

export const connectStart = () => {
    return {
        type: actionTypes.CONNECT_START
    };
};

export const connectSuccess = (redditLifetime, redditExpiration) => {
    return {
        type: actionTypes.CONNECT_SUCCESS,
        redditLifetime: redditLifetime,
        redditExpiration: redditExpiration,
    };
};

export const connectFail = (timestamp, message) => {
    return {
        type: actionTypes.CONNECT_FAIL,
        timestamp: timestamp,
        message: message
    };
};

export const connectHandlerStart = () => {
    return {
        type: actionTypes.CONNECT_HANDLER_START,
        stateString: localStorage.getItem('stateString'),
        code: localStorage.getItem('code')
    };
};

export const connectHandlerFail = () => {
    localStorage.removeItem('stateString');
    localStorage.removeItem('code');
    return {
        type: actionTypes.CONNECT_HANDLER_FAIL
    };
};

export const disconnect = () => {
    localStorage.removeItem('redditLifetime');
    localStorage.removeItem('redditExpiration');
    return {
        type: actionTypes.CONNECT_DISCONNECT
    };
};

export const checkConnectedTimeout = (lifetime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(disconnect());
        }, lifetime);
    };
};

export const connectCheckState = () => {
    return (dispatch) => {
        const redditExpiration = localStorage.getItem('redditExpiration');
        if ((!redditExpiration || redditExpiration === 'undefined')) {
            dispatch(disconnect());
        } else {
            const expirationDate = new Date(redditExpiration);
            if (expirationDate <= new Date()) {
                dispatch(disconnect());
            } else {
                const redditLifetime = localStorage.getItem('redditLifetime');
                dispatch(connectSuccess(redditLifetime, redditExpiration));
                dispatch(checkConnectedTimeout(redditLifetime));
            }
        }
    };
};

export const refreshToken = () => {
    return (dispatch) => {
        dispatch(connectStart());

        const headers = {
            'Authorization': localStorage.getItem('loginToken'),
            'Accept': 'application/json'
        };
        
        const userId = localStorage.getItem('userId');
        const uri = `/auth/refresh_token/${userId}`;
        axios.get(uri, {headers})
            .then(response => {
                const redditLifetime = response.headers['reddit-lifetime'] * 1000;
                const redditExpiration = new Date(new Date().getTime() + redditLifetime);
                localStorage.setItem('redditLifetime', redditLifetime);
                localStorage.setItem('redditExpiration', redditExpiration);
                dispatch(connectSuccess(redditLifetime, redditExpiration));
                dispatch(checkConnectedTimeout(redditLifetime));
            })
            .catch(error => {
                const errorMessage = `Press the Connect button and sign in to Reddit to continue.`;
                const date = new Date();
                dispatch(connectFail(date.toString(), errorMessage));
            });
    };
};

export const connect = () => {
    return (dispatch) => {
        dispatch(connectStart());

        const headers = {
            'Authorization': localStorage.getItem('loginToken'),
            'Accept': 'application/json'
        };
        
        const userId = localStorage.getItem('userId');
        const uri = `/auth/connect/${userId}`;
        axios.get(uri, {headers})
            .then(response => {
                const authUrl = response.data.authorizationUrl;
                window.location.href = authUrl;
            })
            .catch(error => {
                const timestamp = new Date();
                const errorMessage = `Press the Connect button and sign in to Reddit to continue.`;
                dispatch(connectFail(timestamp, errorMessage));
            });
    };
};

export const connectHandler = (stateString, code) => {
    return (dispatch) => {
        const headers = {
            'Authorization': localStorage.getItem('loginToken'),
            'Accept': 'application/json'
        };

        const uri = `/auth/handler/?state=${stateString}&code=${code}`;
        axios.get(uri, {headers})
            .then(response => {
                const headers = Object.assign({}, response).headers;
                const redditLifetime = headers['reddit-lifetime'] * 1000;
                const redditExpiration = new Date(new Date().getTime() + redditLifetime);
                localStorage.setItem('redditLifetime', redditLifetime);
                localStorage.setItem('redditExpiration', redditExpiration);
                dispatch(connectSuccess(redditLifetime, redditExpiration));
                dispatch(checkConnectedTimeout(redditLifetime));
            })
            .catch(error => {
                error = error.response.data;
                dispatch(disconnect());
                dispatch(connectHandlerFail(error.timestamp, error.message));
            });
    };
};