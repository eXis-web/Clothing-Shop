import { CATEGORIES_ACTION_TYPES } from './category.type';

export const CATEGORIES_INITIAL_STATE = {
    categpriesMap: {}
}

export const categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE,
    action = {}
) => {
    const { type, payload } = action;
    switch (type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
            return { ...state, categpriesMap: payload };
        default:
            return state;
    }
};