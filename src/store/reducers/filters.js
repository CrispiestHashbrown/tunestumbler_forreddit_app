import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    didGetSubreddits: false,
    didGetFilters: false,
    didUpdateFilters: false,
    didCreateFilters: false,
    timestamp: null,
    message: null,
    loading: false
};

const filtersGetSubredditsStart = (state) => {
    return updateObject(state, {
        didGetSubreddits: false,
        timestamp: null,
        message: null,
        loading: true
    });
};

const filtersGetSubredditsSuccess = (state) => {
    return updateObject(state, {
        didGetSubreddits: true,
        timestamp: null,
        message: null,
        loading: false
    });
};

const filtersGetSubredditsFail = (state, action) => {
    return updateObject(state, {
        didGetSubreddits: false,
        timestamp: action.timestamp,
        message: action.message,
        loading: false
    });
};

const filtersGetStart = (state) => {
    return updateObject(state, {
        didGetFilters: false,
        timestamp: null,
        message: null,
        loading: true
    });
};

const filtersGetSuccess = (state) => {
    return updateObject(state, {
        didGetFilters: true,
        timestamp: null,
        message: null,
        loading: false
    });
};

const filtersGetFail = (state, action) => {
    return updateObject(state, {
        didGetFilters: false,
        timestamp: action.timestamp,
        message: action.message,
        loading: false
    });
};

const filtersUpdateStart = (state) => {
    return updateObject(state, {
        didUpdateFilters: false,
        timestamp: null,
        message: null,
        loading: true
    });
};

const filtersUpdateSuccess = (state) => {
    return updateObject(state, {
        didUpdateFilters: true,
        timestamp: null,
        message: null,
        loading: false
    });
};

const filtersUpdateFail = (state, action) => {
    return updateObject(state, {
        didUpdateFilters: false,
        timestamp: action.timestamp,
        message: action.message,
        loading: false
    });
};

const filtersCreateStart = (state) => {
    return updateObject(state, {
        didCreateFilters: false,
        timestamp: null,
        message: null,
        loading: true
    });
};

const filtersCreateSuccess = (state) => {
    return updateObject(state, {
        didCreateFilters: true,
        timestamp: null,
        message: null,
        loading: false
    });
};

const filtersCreateFail = (state, action) => {
    return updateObject(state, {
        didCreateFilters: false,
        timestamp: action.timestamp,
        message: action.message,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FILTERS_GET_SUBREDDITS_START:
            return filtersGetSubredditsStart(state);
        case actionTypes.FILTERS_GET_SUBREDDITS_SUCCESS:
            return filtersGetSubredditsSuccess(state);
        case actionTypes.FILTERS_GET_SUBREDDITS_FAIL:
            return filtersGetSubredditsFail(state, action);
        case actionTypes.FILTERS_GET_START:
            return filtersGetStart(state);
        case actionTypes.FILTERS_GET_SUCCESS:
            return filtersGetSuccess(state);
        case actionTypes.FILTERS_GET_FAIL:
            return filtersGetFail(state, action);
        case actionTypes.FILTERS_UPDATE_START:
            return filtersUpdateStart(state);
        case actionTypes.FILTERS_UPDATE_SUCCESS:
            return filtersUpdateSuccess(state);
        case actionTypes.FILTERS_UPDATE_FAIL:
            return filtersUpdateFail(state, action);
        case actionTypes.FILTERS_CREATE_START:
            return filtersCreateStart(state);
        case actionTypes.FILTERS_CREATE_SUCCESS:
            return filtersCreateSuccess(state);
        case actionTypes.FILTERS_CREATE_FAIL:
            return filtersCreateFail(state, action);
        default:
            return state;
    }
};

export default reducer;