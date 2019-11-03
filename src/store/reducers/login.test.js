import reducer from './login';
import * as actionTypes from '../actions/actionTypes';

describe('login reducer', () => {
    const initialState = {
        loginToken: null,
        error: null,
        loading: false
    };

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store the login token upon login', () => {
        expect(reducer(initialState, {
            type: actionTypes.LOGIN_SUCCESS,
            loginToken: 'some-token'
        })).toEqual({
            loginToken: 'some-token',
            error: null,
            loading: false
        });
    });

    it('should set login token to null upon logout', () => {
        expect(reducer({
            loginToken: 'some-token',
            error: null,
            loading: false
        }, {
            type: actionTypes.LOGIN_LOGOUT
        })).toEqual({
            loginToken: null,
            error: null,
            loading: false
        });
    });
});