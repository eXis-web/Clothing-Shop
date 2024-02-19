import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import {
//   onAuthStateChangedListener,
//   createUserDocumentFromAuth,
// } from './utils/firebase/firebase.utils';

import Home from './routes/home/home.components'
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
// import { setCurrentUser } from 'store/user/user.action';
import { getCurrentUser } from './utils/firebase/firebase.utils';
export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser().then((user) => console.log(user));
  }, [dispatch]);
    return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='Clothing-Shop' element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};
