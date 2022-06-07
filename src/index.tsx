import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import App from 'App';
import reportWebVitals from 'reportWebVitals';
import {createGlobalStyle} from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from 'store/store'
import { Provider } from 'react-redux';


const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family:'Roboto', sans-serif;
  }
`

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Global />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>    
  </React.StrictMode>
);

reportWebVitals();
