import React from 'react';
import './App.css';
import Header from '../header/Header';

import { createStore } from 'redux';
import { Provider } from 'react-redux'
import app from '../../reducers'

const store = createStore(app);

const App = (props) => {
    return (
        <Provider store={store}>
          <Header text="Statistics" className="converter-header" />
        </Provider>
    );
};

export default App;
