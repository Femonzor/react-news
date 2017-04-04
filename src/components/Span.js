import React, { Component, PropTypes } from "react";

const propTypes = {
    classN: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

class Span extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.classN !== nextProps.classN ||
               this.props.content !== nextProps.content;
    }
    render() {
        var a = 1;
        const { classN, content } = this.props;
        return <span className={classN}>{content}</span>;
    }
}

Span.propTypes = propTypes;

export default Span;