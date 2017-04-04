import React, { Component, PropTypes } from "react";
import Indicator from "./Indicator";
import ClassNames from "classnames";

class TitlePart extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.title !== nextProps.title;
    }
    render() {
        return (
            <div className="fl">
                <span>{this.props.title}</span>
                <i className="demo-icon icon-picture">&#xe800;</i>
            </div>
        );
    }
}

class PicCarouselTitle extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.title !== nextProps.title ||
               this.props.idx !== nextProps.idx ||
               this.props.count !== nextProps.count;
    }
    render() {
        const titleClass = ClassNames({
            "title": true,
            "hide": !this.props.count
        });
        const { title, idx, count } = this.props;
        return (
            <div className={titleClass}>
                <TitlePart title={title} />
                <Indicator idx={idx} count={count} />
            </div>
        );
    }
}

export default PicCarouselTitle;