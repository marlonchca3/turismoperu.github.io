import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.scss';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import { BookingProvider } from './booking/BookingContext';
import { createServer } from './server';

createServer();

ReactDOM.render(
  <Provider store={store}>
    <LanguageProvider>
      <BookingProvider>
        <App />
      </BookingProvider>
    </LanguageProvider>
  </Provider>,
  document.getElementById('root'),
);
