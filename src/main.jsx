import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './init';
import App from '~/App.jsx';
import { store } from './app/store';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>,
);
