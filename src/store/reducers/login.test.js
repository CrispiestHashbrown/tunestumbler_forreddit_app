import reducer from './login';
import * as actionTypes from '../actions/actionTypes';

describe('login reducer', () => {
    const initialState = {
        userId: null,
        loginToken: null,
        error: null,
        loading: false
    };

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store the userId and login token upon login', () => {
        expect(reducer(initialState, {
            type: actionTypes.LOGIN_SUCCESS,
            userId: 'some-user-id',
            loginToken: 'some-token'
        })).toEqual({
            userId: 'some-user-id',
            loginToken: 'some-token',
            error: null,
            loading: false
        });
    });

    it('should set userId and login token to null upon logout', () => {
        expect(reducer({
            userId: 'some-user-id',
            loginToken: 'some-token',
            error: null,
            loading: false
        }, {
            type: actionTypes.LOGIN_LOGOUT
        })).toEqual({
            userId: null,
            loginToken: null,
            error: null,
            loading: false
        });
    });
});