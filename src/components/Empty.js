import React, { Component, PropTypes } from "react";

class Empty extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    render() {
        return <div className="h100pct"></div>;
    }
}

export default Empty;