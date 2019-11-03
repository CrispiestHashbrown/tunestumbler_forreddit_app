import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    loginToken: null,
    timestamp: null,
    error: null
};

const loginStart = (state) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const loginSuccess = (state, action) => {
    return updateObject(state, {
        loginToken: action.loginToken,
        error: null,
        loading: false
    });
};

const loginFail = (state, action) => {
    return updateObject(state, {
        loginToken: null,
        error: action.error,
        loading: false
    });
};

const loginLogout = (state) => {
    return updateObject(state, {
        loginToken: null,
        error: null
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START:
            return loginStart(state);
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case actionTypes.LOGIN_FAIL:
            return loginFail(state, action);
        case actionTypes.LOGIN_LOGOUT:
            return loginLogout(state);
        default:
            return state;
    }
};

export default reducer;