import React, { Component } from "react";
import { StatusBar, Platform, Dimensions } from "react-native";
import { ActionCreators } from "../actions";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import RootNavigator from "../config/navigator";
import * as types from "../actions/types";
import reducer from "../reducers";

// Middleware that logs actions
// Usefull for debug !
const middlewares = [thunkMiddleware];

if (__DEV__) {
  middlewares.push(createLogger());
}

function configureStore(initialState) {
  const enhancer = composeWithDevTools(
    applyMiddleware(thunkMiddleware, ...middlewares)
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

export let navigatorRef;

export default class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
