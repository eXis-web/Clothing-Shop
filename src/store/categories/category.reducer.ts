// @ts-ignore
import { Category } from './category.types.ts';
import { AnyAction } from 'redux-saga';
// @ts-ignore
import { fetchCategoriesFailed, fetchCategoriesSuccess,fetchCategoriesStart} from './category.action.ts';

export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null,
}

export const categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE,
    action: AnyAction
): CategoriesState => {
    if (fetchCategoriesStart.match(action)) {
        return { ...state, isLoading: true };
    }
    if (fetchCategoriesSuccess.match(action)) {
        return { ...state, categories: action.payload, isLoading: false };
    }
    if (fetchCategoriesFailed) {
        return { ...state, error: action.payload, isLoading: false };
    }

    return state;
};