import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    isConnected: false,
    stateString: null,
    code: null,
    redditLifetime: null,
    redditExpiration: null,
    error: null,
    loading: false
};

const connectStart = (state) => {
    return updateObject(state, {
        isConnected: false,
        stateString: null,
        code: null,
        redditLifetime: null,
        redditExpiration: null,
        error: null,
        loading: true
    });
};

const connectSuccess = (state, action) => {
    return updateObject(state, {
        isConnected: true,
        stateString: null,
        code: null,
        redditLifetime: action.redditLifetime,
        redditExpiration: action.redditExpiration,
        error: null,
        loading: false
    });
};

const connectFail = (state, action) => {
    return updateObject(state, {
        isConnected: false,
        redditLifetime: null,
        redditExpiration: null,
        error: action.error,
        loading: false
    });
};

const connectDisconnect = (state) => {
    return updateObject(state, {
        isConnected: false,
        redditLifetime: null,
        redditExpiration: null,
    });
};

const connectHandlerStart = (state, action) => {
    return updateObject(state, {
        isConnected: false,
        stateString: action.stateString,
        code: action.code,
        redditLifetime: null,
        redditExpiration: null,
        error: null,
        loading: true
    });
};

const connectHandlerFail = (state, action) => {
    return updateObject(state, {
        isConnected: false,
        stateString: null,
        code: null,
        redditLifetime: null,
        redditExpiration: null,
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CONNECT_START:
            return connectStart(state);
        case actionTypes.CONNECT_SUCCESS:
            return connectSuccess(state, action);
        case actionTypes.CONNECT_FAIL:
            return connectFail(state, action);
        case actionTypes.CONNECT_HANDLER_START:
            return connectHandlerStart(state, action);
        case actionTypes.CONNECT_HANDLER_FAIL:
            return connectHandlerFail(state, action);
        case actionTypes.CONNECT_DISCONNECT:
            return connectDisconnect(state);
        default:
            return state;
    }
};

export default reducer;