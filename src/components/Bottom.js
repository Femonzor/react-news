import React, { Component, PropTypes } from "react";
import ClassNames from "classnames";

const propTypes = {
    loaded: PropTypes.bool,
    end: PropTypes.bool
};

class Bottom extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.loaded !== nextProps.loaded ||
               this.props.end !== nextProps.end;
    }
    render() {
        const { loaded, end } = this.props;
        const bottomClass = ClassNames({
            "bottom": true,
            "hide": !loaded
        });
        const loadedClass = ClassNames({
            "bottom-loading": true,
            "hide": end
        });
        const endClass = ClassNames({
            "bottom-end": true,
            "hide": !end
        });
        return (
            <div className={bottomClass}>
                <div className={loadedClass}>
                    <span className="loading-icon"></span>
                    <span className="loading-text">加载中...</span>
                </div>
                <div className={endClass}>已至末尾</div>
            </div>
        );
    }
}

Bottom.propTypes = propTypes;

export default Bottom;