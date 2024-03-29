import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.components.tsx';
import Category from '../category/category.component.tsx';
import { fetchCategoriesStart } from '../../store/categories/category.action.ts';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(fetchCategoriesStart());
    }, [dispatch]);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    );
};

export default Shop;