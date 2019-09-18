import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    userId: null,
    loginToken: null,
    timestamp: null,
    message: null,
    loading: false
};

const loginStart = (state) => {
    return updateObject(state, {
        timestamp: null,
        message: null,
        loading: true
    });
};

const loginSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.userId,
        loginToken: action.loginToken,
        timestamp: null,
        message: null,
        loading: false
    });
};

const loginFail = (state, action) => {
    return updateObject(state, {
        userId: null,
        loginToken: null,
        timestamp: action.timestamp,
        message: action.message,
        loading: false
    });
};

const loginLogout = (state) => {
    return updateObject(state, {
        userId: null,
        loginToken: null,
        timestamp: null,
        message: null
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