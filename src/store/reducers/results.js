import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    didGetResults: false,
    didGetNextResults: false,
    timestamp: null,
    message: null,
    loading: false
};

const resultsGetResultsStart = (state) => {
    return updateObject(state, {
        didGetResults: false,
        timestamp: null,
        message: null,
        loading: true
    });
};

const resultsGetResultsSuccess = (state) => {
    return updateObject(state, {
        didGetResults: true,
        timestamp: null,
        message: null,
        loading: false
    });
};

const resultsGetResultsFail = (state, action) => {
    return updateObject(state, {
        didGetResults: false,
        timestamp: action.timestamp,
        message: action.message,
        loading: false
    });
};

const resultsGetNextResultsStart = (state) => {
    return updateObject(state, {
        didGetNextResults: false,
        timestamp: null,
        message: null,
        loading: true
    });
};

const resultsGetNextResultsSuccess = (state) => {
    return updateObject(state, {
        didGetNextResults: true,
        timestamp: null,
        message: null,
        loading: false
    });
};

const resultsGetNextResultsFail = (state, action) => {
    return updateObject(state, {
        didGetNextResults: false,
        timestamp: action.timestamp,
        message: action.message,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RESULTS_GET_RESULTS_START:
            return resultsGetResultsStart(state);
        case actionTypes.RESULTS_GET_RESULTS_SUCCESS:
            return resultsGetResultsSuccess(state);
        case actionTypes.RESULTS_GET_RESULTS_FAIL:
            return resultsGetResultsFail(state, action);
        case actionTypes.RESULTS_GET_NEXT_RESULTS_START:
            return resultsGetNextResultsStart(state);
        case actionTypes.RESULTS_GET_NEXT_RESULTS_SUCCESS:
            return resultsGetNextResultsSuccess(state);
        case actionTypes.RESULTS_GET_NEXT_RESULTS_FAIL:
            return resultsGetNextResultsFail(state, action);
        default:
            return state;
    }
};

export default reducer;