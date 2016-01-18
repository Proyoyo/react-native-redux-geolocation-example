import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux/native';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import devTools from 'remote-redux-devtools';

import * as reducers from '../reducers';
import ReverseApp from './reverseApp';

const loggerMiddleWare = createLogger();

const reducer = combineReducers(reducers);


export default function configureStore(initialState) {
    const finalCreateStore = compose(
        applyMiddleware(thunk, loggerMiddleWare),
        devTools({
            hostname: 'localhost',
            port: 5678,
            autoReconnect: true
        })
    )(createStore);
    return finalCreateStore(reducer, initialState);
}

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <ReverseApp />}
      </Provider>
    );
  }
}
