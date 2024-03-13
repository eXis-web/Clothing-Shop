import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
// @ts-ignore
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils.ts';
// @ts-ignore
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action.ts';
// @ts-ignore
import { CATEGORIES_ACTION_TYPES } from './category.types.ts';

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield* call(getCategoriesAndDocuments);
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(fetchCategoriesFailed(error as Error));
    }
};

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}
export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
}