import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <App />
      </HashRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);


