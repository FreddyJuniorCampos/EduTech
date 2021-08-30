import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import App from "./routes/App";
import reducer from "./reducers";

let cookies = {};
let listCookies = document.cookie;
listCookies = listCookies.split("; ");
for (let cookie in listCookies) {
  let valueCookie = listCookies[cookie].split("=");
  let key = valueCookie[0];
  let value = valueCookie[1];
  cookies = { ...cookies, [key]: value };
}

let initialState;
const { id, username, email, token } = cookies;

if (id) {
  initialState = {
    user: { id, username, email, token },
    messages: [],
  };
} else {
  initialState = { user: {}, messages: [] };
}

const middlewares = applyMiddleware(thunk);

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(middlewares)
);

ReactDOM.render(
  <Provider store={store}>
    <App isLogged={initialState.user.id} />
  </Provider>,
  document.getElementById("root")
);
