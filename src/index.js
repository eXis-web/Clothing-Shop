import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.scss';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/user.context';
import { CategoriesProvider } from './context/categories.context';
import { CartProvider } from './context/cart.context';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/Clothing-Shop">
        <UserProvider>
          <CategoriesProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CategoriesProvider>
        </UserProvider>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();