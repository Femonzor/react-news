import React, { Component, PropTypes } from "react";

class Loading extends Component {
    constructor(props) {
        super(props);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.touchY = 0;
    }
    handleTouchStart(e) {
        this.touchY = e.touches[0].clientY;
    }
    handleTouchMove(e) {
        const el = e.currentTarget;
        const y = e.touches[0].clientY;
        if (el.scrollTop === 0) {
            if (y > this.touchY) e.preventDefault();
            else e.stopPropagation();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        var a = 1;
        return false;
    }
    render() {
        return (
            <div className="loading-page" onTouchMove={this.handleTouchMove} onTouchStart={this.handleTouchStart}>
                <span className="loading-icon"></span>
                <span className="loading-bg"></span><span className="rectify"></span>
            </div>
        );
    }
}

export default Loading;