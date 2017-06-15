import React from 'react';
import './App.css';
import Header from '../header/Header';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import app from '../../reducers';

import SeoStatistics from '../seo-statistics/SeoStatistics';

const store = createStore(app);

const App = (props) => {
    return (
        <Provider store={store}>
          <div>
            <Header text="Statistics" className="converter-header" />
            <SeoStatistics />
          </div>
        </Provider>
    );
};

export default App;
