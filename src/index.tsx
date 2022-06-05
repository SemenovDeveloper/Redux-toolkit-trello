import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import App from 'App';
import reportWebVitals from 'reportWebVitals';
import {createGlobalStyle} from 'styled-components';
import { store } from "store/store";
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
      <App />
    </Provider>    
  </React.StrictMode>
);

reportWebVitals();
