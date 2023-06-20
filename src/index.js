import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';

import './index.scss';

ReactDOM.render(
    <Provider store={store}>
      <Router basename='diplom-front'>
        <App />
      </Router>
    </Provider>,
  document.getElementById('root'),
);

