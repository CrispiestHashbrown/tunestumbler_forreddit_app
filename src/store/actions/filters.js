import axios from '../../axios-urls/axios-tunestumbler';

import * as actionTypes from './actionTypes';

export const filtersGetSubredditsStart = () => {
    return {
        type: actionTypes.FILTERS_GET_SUBREDDITS_START
    };
};

export const filtersGetSubredditsSuccess = () => {
    return {
        type: actionTypes.FILTERS_GET_SUBREDDITS_SUCCESS
    };
};

export const filtersGetSubredditsFail = (timestamp, message) => {
    return {
        type: actionTypes.FILTERS_GET_SUBREDDITS_FAIL,
        timestamp: timestamp,
        message: message
    };
};

export const filtersGetStart = () => {
    return {
        type: actionTypes.FILTERS_GET_START
    };
};

export const filtersGetSuccess = () => {
    return {
        type: actionTypes.FILTERS_GET_SUCCESS
    };
};

export const filtersGetFail = (timestamp, message) => {
    return {
        type: actionTypes.FILTERS_GET_FAIL,
        timestamp: timestamp,
        message: message
    };
};

export const filtersUpdateStart = () => {
    return {
        type: actionTypes.FILTERS_UPDATE_START
    };
};

export const filtersUpdateSuccess = () => {
    return {
        type: actionTypes.FILTERS_UPDATE_SUCCESS
    };
};

export const filtersUpdateFail = (timestamp, message) => {
    return {
        type: actionTypes.FILTERS_UPDATE_FAIL,
        timestamp: timestamp,
        message: message
    };
};

export const filtersCreateStart = () => {
    return {
        type: actionTypes.FILTERS_CREATE_START
    };
};

export const filtersCreateSuccess = () => {
    return {
        type: actionTypes.FILTERS_CREATE_SUCCESS
    };
};

export const filtersCreateFail = (timestamp, message) => {
    return {
        type: actionTypes.FILTERS_CREATE_FAIL,
        timestamp: timestamp,
        message: message
    };
};

export const updateFilters = (filters) => {
    return (dispatch) => {
        dispatch(filtersUpdateStart());

        const headers = {
            'Authorization': localStorage.getItem('loginToken'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const userId = localStorage.getItem('userId');
        const uri = `/filters/${userId}`;
        
        axios.put(uri, {filters: filters}, {headers})
            .then(response => {
                dispatch(filtersUpdateSuccess());
            })
            .catch(error => {
                error = error.response.data;
                dispatch(filtersUpdateFail(error.timestamp, error.message));
            });
    };
};

export const createFilters = (filters) => {
    return (dispatch) => {
        dispatch(filtersCreateStart());

        const headers = {
            'Authorization': localStorage.getItem('loginToken'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const userId = localStorage.getItem('userId');
        const uri = `/filters/${userId}`;
        axios.post(uri, {filters: filters}, {headers})
            .then(response => {
                dispatch(filtersCreateSuccess());
            })
            .catch(error => {
                error = error.response.data;
                dispatch(filtersCreateFail(error.timestamp, error.message));
            });
    };
};