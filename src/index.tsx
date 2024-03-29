import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import Favicon from 'react-favicon';
import { HelmetProvider } from 'react-helmet-async';
import store from './store/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <Favicon url="https://raw.githubusercontent.com/KNIDZE/my_trello/main/src/favic.ico" />
        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
