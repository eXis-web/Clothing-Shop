import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.scss';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/cart.context';
import  {store}  from './store/store';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <BrowserRouter basename="/Clothing-Shop">
            <CartProvider>
              <App />
            </CartProvider>
        </BrowserRouter>
    </Provider>
);

reportWebVitals();