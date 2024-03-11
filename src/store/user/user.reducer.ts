import { AnyAction } from 'redux-saga';
// @ts-ignore
import { signInFailed, signOutFailed, signUpFailed, signInSuccess, signOutSuccess } from './user.action.ts';

import { UserData } from 'utils/firebase/firebase.utils.js';

export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

export const USER_INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null,
};

export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction) => {

    if(signInSuccess.match(action)) {
        return { ...state, currentUser: action.payload };
    }

    if(signOutSuccess.match(action)) {
        return { ...state, currentUser: null }; 
    }

    if(signInFailed.match(action)||signUpFailed.match(action)||signOutFailed.match(action)) {
        return { ...state, error: action.payload };
    }
            return state;
};