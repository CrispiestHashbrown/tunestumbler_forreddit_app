import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState = {
    didGetResults: false,
    nextUri: '',
    afterId: '',
    didGetNextResults: false,
    results: [],
    error: null,
    loading: false
};

const resultsGetResultsStart = (state) => {
    return updateObject(state, {
        didGetResults: false,
        nextUri: '',
        afterId: '',
        results: [],
        error: null,
        loading: true
    });
};

const resultsGetResultsSuccess = (state, action) => {
    return updateObject(state, {
        didGetResults: true,
        nextUri: action.nextUri,
        afterId: action.afterId,
        results: action.results,
        error: null,
        loading: false
    });
};

const resultsGetResultsFail = (state, action) => {
    return updateObject(state, {
        didGetResults: false,
        error: action.error,
        loading: false
    });
};

const resultsGetNextResultsStart = (state) => {
    return updateObject(state, {
        didGetNextResults: false,
        error: null,
        loading: true
    });
};

const resultsGetNextResultsSuccess = (state, action) => {
    return updateObject(state, {
        afterId: action.afterId,
        didGetNextResults: true,
        results: action.updatedResults,
        error: null,
        loading: false
    });
};

const resultsGetNextResultsFail = (state, action) => {
    return updateObject(state, {
        afterId: '',
        didGetNextResults: false,
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.HOT_RESULTS_GET_RESULTS_START:
            return resultsGetResultsStart(state);
        case actionTypes.HOT_RESULTS_GET_RESULTS_SUCCESS:
            return resultsGetResultsSuccess(state, action);
        case actionTypes.HOT_RESULTS_GET_RESULTS_FAIL:
            return resultsGetResultsFail(state, action);
        case actionTypes.HOT_RESULTS_GET_NEXT_RESULTS_START:
            return resultsGetNextResultsStart(state);
        case actionTypes.HOT_RESULTS_GET_NEXT_RESULTS_SUCCESS:
            return resultsGetNextResultsSuccess(state, action);
        case actionTypes.HOT_RESULTS_GET_NEXT_RESULTS_FAIL:
            return resultsGetNextResultsFail(state, action);
        default:
            return state;
    }
};

export default reducer;