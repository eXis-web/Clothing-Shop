import { AnyAction } from 'redux-saga';
// @ts-ignore
import { setCartItems, setIsCartOpen } from './cart.action.ts';

import { CartItem } from './cart.types';

export type CartState = {
    isCartOpen: boolean;
    cartItems: CartItem[];
}

export const CART_INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
    // cartCount: 0,
    // cartTotal: 0
};

export const cartReducer = (
    state = CART_INITIAL_STATE,
    action: AnyAction
): CartState => {
    if (setIsCartOpen.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload,
        };
    }
    if (setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload,
        };
    }
    return state;
};
