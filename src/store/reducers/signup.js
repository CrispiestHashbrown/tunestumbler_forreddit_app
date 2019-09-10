import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    shouldRedirect: false,
    timestamp: null,
    message: null,
    loading: false
};

const signupReset = (state) => {
    return updateObject(state, initialState);
}

const signupStart = (state, action) => {
    return updateObject(state, {
        shouldRedirect: false,
        timestamp: null,
        message: null,
        loading: true
    });
}

const signupSuccess = (state, action) => {
    return updateObject(state, {
        shouldRedirect: true,
        timestamp: null,
        message: null,
        loading: false
    });
}

const signupFail = (state, action) => {
    return updateObject(state, {
        shouldRedirect: false,
        timestamp: action.timestamp,
        message: action.message,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_RESET:
            return signupReset(state);
        case actionTypes.SIGNUP_START:
            return signupStart(state, action);
        case actionTypes.SIGNUP_SUCCESS:
            return signupSuccess(state, action);
        case actionTypes.SIGNUP_FAIL:
            return signupFail(state, action);
        default:
            return state;
    }
};

export default reducer;