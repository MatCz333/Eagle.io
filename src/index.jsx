/* eslint-disable no-underscore-dangle */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import loginFormReducer from "./store/reducers/loginFormReducer";
import dataInputReducer from "./store/reducers/dataInputReducer";
import errorHandlerReducer from "./store/reducers/errorHandlerReducer";
import watchDataInput from "./store/sagas";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const rootReducer = combineReducers({
  loginReducer: loginFormReducer,
  dataInputReducer,
  errorHandlerReducer
});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchDataInput);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
