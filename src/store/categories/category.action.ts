// @ts-ignore
import { Action, ActionWithPayload, createAction, withMatcher } from '../../utils/reducer/reducer.utils.ts';
// @ts-ignore
import { CATEGORIES_ACTION_TYPES, Category } from '../categories/category.types.ts';

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

export const fetchCategoriesStart = withMatcher(() =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));    


export const fetchCategoriesSuccess = withMatcher(
    (categoriesArray: Category[]) =>
        createAction(
            CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
            categoriesArray
        )
);

export const fetchCategoriesFailed = withMatcher((error:Error) =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));     
