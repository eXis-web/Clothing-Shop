import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call } from 'typed-redux-saga/macro';
import { fetchCategoriesAsync, onFetchCategories, categoriesSaga } from '../category.saga';
import { CATEGORIES_ACTION_TYPES } from '../category.types';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from '../category.action';
import { getCategoriesAndDocuments } from '../../../utils/firebase/firebase.utils';

jest.mock('../../../utils/firebase/firebase.utils', () => ({
    getCategoriesAndDocuments: jest.fn(),
}));

describe('category sagas', () => {
    test('categoriesSaga', () => {
        testSaga(categoriesSaga)
            .next()
            .all([call(onFetchCategories)])
            .next()
            .isDone();
    });

    test('onFetchCategories', () => {
        testSaga(onFetchCategories)
            .next()
            .takeLatest(
                CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
                fetchCategoriesAsync
            )
            .next()
            .isDone();
    });

    test('fetchCategoriesAsync', () => {
        const mockCategoriesArray = [
            { id: 1, name: 'Category 1' },
            { id: 2, name: 'Category 2' },
        ];

    jest.spyOn(require('../../../utils/firebase/firebase.utils'), 'getCategoriesAndDocuments').mockImplementation(() => mockCategoriesArray);

    return expectSaga(fetchCategoriesAsync)
        .put(fetchCategoriesSuccess(mockCategoriesArray))
        .run();
    });

    test('fetchCategoriesAsync failure', () => {
        const mockError = new Error('Error fetching categories');
            return expectSaga(fetchCategoriesAsync)
            .provide([[call(getCategoriesAndDocuments), throwError(mockError)]])
            .put(fetchCategoriesFailed(mockError))
            .run();
    });
});
