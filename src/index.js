import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';

import {App} from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor}  from './store/store';
import { stripePromise } from './utils/stripe/stripe.utils';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter basename="/Clothing-Shop">
                <Elements stripe={stripePromise}>
                    <App />
                </Elements>    
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

reportWebVitals();