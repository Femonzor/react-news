import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import Settings from "../global/Settings";
import ClassNames from "classnames";

const propTypes = {
    downStatus: PropTypes.number,
    setScrollTopOffset: PropTypes.func
};

class Refresh extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.downStatus !== nextProps.downStatus;
    }
    componentDidUpdate() {
        const height = ReactDOM.findDOMNode(this.refs.refreshEl).clientHeight;
        this.props.setScrollTopOffset(height);
    }
    componentDidMount() {
        const height = ReactDOM.findDOMNode(this.refs.refreshEl).clientHeight;
        this.props.setScrollTopOffset(height);
    }
    render() {
        const refreshClass = ClassNames({
            "pulldown": true,
            "flip": this.props.downStatus === 1,
            "loading": this.props.downStatus === 2
        });
        return (
            <div className={refreshClass} ref="refreshEl">
                <span className="pulldown-icon"></span>
                <span className="pulldown-label">
                    {Settings.pullDownTips[this.props.downStatus]}
                </span><span className="rectify"></span>
            </div>
        );
    }
}

Refresh.propTypes = propTypes;

export default Refresh;