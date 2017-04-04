import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import AttachInfo from "./AttachInfo";
import Settings from "../global/Settings";

class InfoItem extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.title !== nextProps.title ||
               this.props.count !== nextProps.count ||
               this.props.time !== nextProps.time ||
               this.props.id !== nextProps.id ||
               this.props.subjectName !== nextProps.subjectName;
    }
    render() {
        const { id, title, count, time, subjectName, src, handleItemClick } = this.props;
        return (
            <div className="info-item" data-info-id={id} data-subject-name={subjectName} onClick={handleItemClick}>
                <div className="info-contont">
                    <strong className="info-title">{title}</strong>
                    <AttachInfo count={count} time={time} />
                </div>
                <div className="img-wrap">
                    <img className="imgfx" src={Settings.blank4x3} alt="" data-src={src} />
                </div>
            </div>
        );
    }
}

export default InfoItem;