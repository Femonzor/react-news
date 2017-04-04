import React, { Component, PropTypes } from "react";
import Settings from "../global/Settings";

class PicCarouselItem extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.imgWrapStyle !== nextProps.imgWrapStyle ||
               this.props.src !== nextProps.src ||
               this.props.subjectName !== nextProps.subjectName ||
               this.props.id !== nextProps.id;
    }
    render() {
        const { id, imgWrapStyle, subjectName, src, lazy, handleClick } = this.props;
        return (
            <div data-picinfo-id={id} data-subject-name={subjectName} className="slide" style={imgWrapStyle} onClick={handleClick}>
                <img className="imgfx" src={lazy ? Settings.blank5x3 : src} data-src={lazy ? src : null} alt="remark" />
            </div>
        );
    }
}

export default PicCarouselItem;