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

export const filtersGetSubredditsFail = (error) => {
    return {
        type: actionTypes.FILTERS_GET_SUBREDDITS_FAIL,
        error: error
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

export const filtersGetFail = (error) => {
    return {
        type: actionTypes.FILTERS_GET_FAIL,
        error: error
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

export const filtersUpdateFail = (error) => {
    return {
        type: actionTypes.FILTERS_UPDATE_FAIL,
        error: error
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

export const filtersCreateFail = (error) => {
    return {
        type: actionTypes.FILTERS_CREATE_FAIL,
        error: error
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

        const uri = `/filters/myfilters`;
        axios.put(uri, {filters: filters}, {headers})
            .then(response => {
                dispatch(filtersUpdateSuccess());
            })
            .catch(error => {
                dispatch(filtersUpdateFail(error.response));
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

        const uri = `/filters/myfilters`;
        axios.post(uri, {filters: filters}, {headers})
            .then(response => {
                dispatch(filtersCreateSuccess());
            })
            .catch(error => {
                dispatch(filtersCreateFail(error.response));
            });
    };
};