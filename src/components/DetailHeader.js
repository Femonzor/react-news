import React, { Component, PropTypes } from "react";
import DetailActions from "../actions/DetailActions";

const propTypes = {
    subjectName: PropTypes.string,
    dispatch: PropTypes.func
};

class DetailHeader extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    constructor(props, context) {
        super(props, context);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        const { dispatch } = this.props;
        this.context.router.goBack();
        // dispatch(DetailActions.hideDetail());
        // setTimeout(() => {
        //     dispatch(DetailActions.resetDetail());
        // }, 400);
    }
    handleTouchMove(e) {
        e.preventDefault();
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.subjectName !== nextProps.subjectName ||
               this.props.dispatch !== nextProps.dispatch;
    }
    render() {
        return (
            <div className="detail-head" onTouchMove={this.handleTouchMove}>
                <span className="goback" onClick={this.handleClick}></span>
                <span className="title">{this.props.subjectName}</span>
            </div>
        );
    }
}

DetailHeader.propTypes = propTypes;

export default DetailHeader;