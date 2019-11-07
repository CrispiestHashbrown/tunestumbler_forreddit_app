import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    shouldRedirect: false,
    error: null,
    loading: false
};

const signupReset = (state) => {
    return updateObject(state, initialState);
}

const signupStart = (state) => {
    return updateObject(state, {
        shouldRedirect: false,
        error: null,
        loading: true
    });
}

const signupSuccess = (state) => {
    return updateObject(state, {
        shouldRedirect: true,
        error: null,
        loading: false
    });
}

const signupFail = (state, action) => {
    return updateObject(state, {
        shouldRedirect: false,
        error: action.error,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_RESET:
            return signupReset(state);
        case actionTypes.SIGNUP_START:
            return signupStart(state);
        case actionTypes.SIGNUP_SUCCESS:
            return signupSuccess(state);
        case actionTypes.SIGNUP_FAIL:
            return signupFail(state, action);
        default:
            return state;
    }
};

export default reducer;