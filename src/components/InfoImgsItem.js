import React, { Component, PropTypes } from "react";
import AttachInfo from "./AttachInfo";
import Settings from "../global/Settings";

class InfoImgsItem extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.title !== nextProps.title ||
               this.props.count !== nextProps.count ||
               this.props.time !== nextProps.time ||
               this.props.id !== nextProps.id ||
               this.props.subjectName !== nextProps.subjectName ||
               this.props.src !== nextProps.src;
    }
    render() {
        const { id, title, count, time, subjectName, handleItemClick, src } = this.props;
        return (
            <div className="infoimg-item" data-info-id={id} data-subject-name={subjectName} onClick={handleItemClick}>
                <strong className="info-title">{title}</strong>
                <div className="info-imgs">
                    <div className="img-wrap">
                        <img className="imgfx" src={Settings.blank4x3} data-src={src[0]} alt="" />
                    </div>
                    <div className="img-wrap">
                        <img className="imgfx" src={Settings.blank4x3} data-src={src[1]} alt="" />
                    </div>
                    <div className="img-wrap">
                        <img className="imgfx" src={Settings.blank4x3} data-src={src[2]} alt="" />
                    </div>
                </div>
                <AttachInfo time={time} />
            </div>
        );
    }
}

export default InfoImgsItem;