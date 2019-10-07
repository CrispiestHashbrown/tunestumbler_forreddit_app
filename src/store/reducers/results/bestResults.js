import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState = {
    didGetResults: false,
    nextUri: '',
    afterId: '',
    didGetNextResults: false,
    results: [],
    timestamp: null,
    message: null,
    loading: false
};

const resultsGetResultsStart = (state) => {
    return updateObject(state, {
        didGetResults: false,
        nextUri: '',
        afterId: '',
        results: [],
        timestamp: null,
        message: null,
        loading: true
    });
};

const resultsGetResultsSuccess = (state, action) => {
    return updateObject(state, {
        didGetResults: true,
        nextUri: action.nextUri,
        afterId: action.afterId,
        results: action.results,
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

const resultsGetNextResultsSuccess = (state, action) => {
    return updateObject(state, {
        afterId: action.afterId,
        didGetNextResults: true,
        results: action.updatedResults,
        timestamp: null,
        message: null,
        loading: false
    });
};

const resultsGetNextResultsFail = (state, action) => {
    return updateObject(state, {
        afterId: '',
        didGetNextResults: false,
        timestamp: action.timestamp,
        message: action.message,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BEST_RESULTS_GET_RESULTS_START:
            return resultsGetResultsStart(state);
        case actionTypes.BEST_RESULTS_GET_RESULTS_SUCCESS:
            return resultsGetResultsSuccess(state, action);
        case actionTypes.BEST_RESULTS_GET_RESULTS_FAIL:
            return resultsGetResultsFail(state, action);
        case actionTypes.BEST_RESULTS_GET_NEXT_RESULTS_START:
            return resultsGetNextResultsStart(state);
        case actionTypes.BEST_RESULTS_GET_NEXT_RESULTS_SUCCESS:
            return resultsGetNextResultsSuccess(state, action);
        case actionTypes.BEST_RESULTS_GET_NEXT_RESULTS_FAIL:
            return resultsGetNextResultsFail(state, action);
        default:
            return state;
    }
};

export default reducer;