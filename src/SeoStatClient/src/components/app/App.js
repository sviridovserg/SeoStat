import React from 'react';
import './App.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import app from '../../reducers';

import Header from '../header/Header';
import SeoStatistics from '../seo-statistics/SeoStatistics';
import ErrorMessage from  '../error-message/ErrorMessage';

const store = createStore(app);

const App = (props) => {
    return (
        <Provider store={store}>
          <div>
            <div className="error-message">
              <ErrorMessage />
            </div>
            <Header text="Statistics" className="converter-header" />
            <SeoStatistics />
          </div>
        </Provider>
    );
};

export default App;
