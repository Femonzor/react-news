import "./js/requestAnimationFrame";
import React, { Component, PropTypes } from "react";
import ReactDOM, { render } from "react-dom";
import { Provider } from "react-redux";
import router from "./routers/AppRouter";
import store from "./stores/AppStore";

import "./styles/style.less";
import initReactFastclick from "react-fastclick";
initReactFastclick();

render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById("app")
);