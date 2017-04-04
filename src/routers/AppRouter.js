import React, {Component, PropTypes} from "react";
import {Router, Route, IndexRoute, browserHistory, hashHistory} from "react-router";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import SiteLayout from "../components/SiteLayout";
import SiteMainContainer from "../containers/SiteMainContainer";
import DetailContainer from "../containers/DetailContainer";

//const history = process.env.NODE_ENV !== "production" ? browserHistory : hashHistory;
const history = hashHistory;

class Temp extends Component {
    render() {
        return <div></div>;
    }
}

history.listen((evt) => {
    console.log("LISTENER: ", evt);
});

const RouteConfig = (
    <Router history={history}>
        <Route path="/" component={SiteLayout} />
        <Route path="/detail" component={Temp} />
    </Router>
);

export default RouteConfig;