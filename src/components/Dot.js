import React, { Component, PropTypes } from "react";
import ClassNames from "classnames";

const propTypes = {
    cur: PropTypes.bool
};

class Dot extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.cur !== nextProps.cur;
    }
    render() {
        const dotClass = ClassNames({
            "dot": true,
            "on": this.props.cur
        });
        return <span className={dotClass}></span>;
    }
}

Dot.propTypes = propTypes;

export default Dot;