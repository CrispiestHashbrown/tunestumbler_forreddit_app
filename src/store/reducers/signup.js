import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    timestamp: null,
    message: null,
    loading: false
};

const signupStart = (state, action) => {
    return updateObject(state, {
        timestamp: null,
        message: null,
        loading: true
    });
}

const signupSuccess = (state, action) => {
    return updateObject(state, {
        timestamp: null,
        message: null,
        loading: false
    });
}

const signupFail = (state, action) => {
    return updateObject(state, {
        timestamp: action.timestamp,
        message: action.message,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
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