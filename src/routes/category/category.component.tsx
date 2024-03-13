import ProductCard from '../../components/product-card/product-card.component.jsx';
import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CategoryContainer,Title} from './category.styles.tsx';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector.ts';
import Spinner from '../../components/spinner/spinner.component.jsx';

type CategoryRouteParams = {
    category: string;
}

const Category = () => {
    const { category } = useParams<
        keyof CategoryRouteParams
    >() as CategoryRouteParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            {isLoading ?
                (<Spinner />
            ) : (
                <CategoryContainer>
                    {products &&
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </CategoryContainer>
            )}
        </Fragment>
    );
};

export default Category;