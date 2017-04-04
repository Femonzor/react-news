import React, {Component, PropTypes} from "react";

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
            <div id="header" className="header">
                <MainTitle />
            </div>
        );
    }
}

export default SiteHeader;