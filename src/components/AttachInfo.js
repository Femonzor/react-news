import React, { Component, PropTypes } from "react";

class AttachInfo extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.time !== nextProps.time;
    }
    render() {
        return (
            <div className="att-info">
                <time className="">{this.props.time}</time>
            </div>
        );
    }
}

export default AttachInfo;