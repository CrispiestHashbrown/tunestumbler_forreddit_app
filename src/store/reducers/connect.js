import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    isConnected: false,
    stateString: null,
    code: null,
    redditLifetime: null,
    redditExpiration: null,
    timestamp: null,
    message: null,
    loading: false
};

const connectStart = (state) => {
    return updateObject(state, {
        isConnected: false,
        stateString: null,
        code: null,
        timestamp: null,
        redditLifetime: null,
        redditExpiration: null,
        message: null,
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
        timestamp: null,
        message: null,
        loading: false
    });
};

const connectFail = (state, action) => {
    return updateObject(state, {
        isConnected: false,
        redditLifetime: null,
        redditExpiration: null,
        timestamp: action.timestamp,
        message: action.message,
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
        timestamp: null,
        redditLifetime: null,
        redditExpiration: null,
        message: null,
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
        timestamp: action.timestamp,
        message: action.message,
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