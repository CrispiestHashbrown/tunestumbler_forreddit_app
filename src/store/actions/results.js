import * as actionTypes from './actionTypes';

export const resultsGetResultsStart = () => {
    return {
        type: actionTypes.RESULTS_GET_RESULTS_START
    };
};

export const resultsGetResultsSuccess = () => {
    return {
        type: actionTypes.RESULTS_GET_RESULTS_SUCCESS
    };
};

export const resultsGetResultsFail = (timestamp, message) => {
    return {
        type: actionTypes.RESULTS_GET_RESULTS_FAIL,
        timestamp: timestamp,
        message: message
    };
};

export const resultsGetNextResultsStart = () => {
    return {
        type: actionTypes.RESULTS_GET_NEXT_RESULTS_START
    };
};

export const resultsGetNextResultsSuccess = () => {
    return {
        type: actionTypes.RESULTS_GET_NEXT_RESULTS_SUCCESS
    };
};

export const resultsGetNextResultsFail = (timestamp, message) => {
    return {
        type: actionTypes.RESULTS_GET_NEXT_RESULTS_FAIL,
        timestamp: timestamp,
        message: message
    };
};