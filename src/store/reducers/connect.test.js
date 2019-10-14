import reducer from './connect';
import * as actionTypes from '../actions/actionTypes';

describe('connect reducer', () => {
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

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it(`should store the Reddit state string and code if the user granted Tunestumbler permissions 
    to access their Reddit account`, () => {
        expect(reducer(initialState, {
            type: actionTypes.CONNECT_HANDLER_START,
            stateString: 'stateString',
            code: 'code'
        })).toEqual({
            isConnected: false,
            stateString: 'stateString',
            code: 'code',
            timestamp: null,
            redditLifetime: null,
            redditExpiration: null,
            message: null,
            loading: true
        });
    });

    it(`should set isConnected to true, and store the Reddit token lifetime and expiration date if 
    the user granted Tunestumbler permissions to access their Reddit account`, () => {
        expect(reducer(initialState, {
            type: actionTypes.CONNECT_SUCCESS,
            redditLifetime: 'redditLifetime',
            redditExpiration: 'redditExpiration'
        })).toEqual({
            isConnected: true,
            stateString: null,
            code: null,
            redditLifetime: 'redditLifetime',
            redditExpiration: 'redditExpiration',
            timestamp: null,
            message: null,
            loading: false
        });
    });

    it(`should set isConnected to false, and clear the Reddit token lifetime and expiration date if
     the user is disconnected`, () => {
        expect(reducer({
            isConnected: true,
            redditLifetime: 'redditLifetime',
            redditExpiration: 'redditExpiration'
        }, {
            type: actionTypes.CONNECT_DISCONNECT
        })).toEqual({
            isConnected: false,
            redditLifetime: null,
            redditExpiration: null
        });
    });
});