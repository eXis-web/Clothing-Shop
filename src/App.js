import { Routes, Route } from 'react-router-dom';
import { useEffect, lazy, Suspense} from 'react';
import { useDispatch } from 'react-redux';

import { checkUserSession } from './store/user/user.action.ts';
import Spinner from './components/spinner/spinner.component.jsx';

const Home = lazy(() => import('./routes/home/home.components.tsx'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component.tsx'));
const Navigation = lazy(() => import('./routes/navigation/navigation.component.tsx'));
const Shop = lazy(() => import('./routes/shop/shop.component.tsx'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component.tsx'));


export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='Clothing-Shop' element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
