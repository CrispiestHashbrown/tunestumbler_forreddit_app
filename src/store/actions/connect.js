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

export const connectFail = (error) => {
    return {
        type: actionTypes.CONNECT_FAIL,
        error: error
    };
};

export const connectHandlerStart = () => {
    return {
        type: actionTypes.CONNECT_HANDLER_START,
        stateString: localStorage.getItem('stateString'),
        code: localStorage.getItem('code')
    };
};

export const connectHandlerFail = (error) => {
    localStorage.removeItem('stateString');
    localStorage.removeItem('code');
    return {
        type: actionTypes.CONNECT_HANDLER_FAIL,
        error: error
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
                dispatch(connectFail(error.response));
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
                dispatch(connectFail(error.response));
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
                dispatch(disconnect());
                dispatch(connectHandlerFail(error.response));
            });
    };
};