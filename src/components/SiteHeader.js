import React, {Component, PropTypes} from "react";
import { Link } from "react-router";

class MainTitle extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    render() {
        return (
            <h1 className="title"></h1>
        );
    }
}

class SiteHeader extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    render() {
        return (
            <Link to="/detail" id="header" className="header">
                <MainTitle />
            </Link>
        );
    }
}

export default SiteHeader;