import React, { Component, PropTypes } from "react";
import AttachInfo from "./AttachInfo";
import Settings from "../global/Settings";

class PicInfoItem extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.title !== nextProps.title ||
               this.props.count !== nextProps.count ||
               this.props.time !== nextProps.time ||
               this.props.id !== nextProps.id;
    }
    render() {
        const { id, title, count, time, src, handleItemClick } = this.props;
        return (
            <div className="pic-item" data-picinfo-id={id} onClick={handleItemClick}>
                <div className="img-wrap">
                    <img className="imgfx" src={Settings.blank5x3} data-src={src} alt="" />
                </div>
                <div className="pic-cont">
                    <strong className="pic-title">{title}</strong>
                    <div className="att-info">
                        <i className="demo-icon icon-picture">&#xe800;</i>
                        <span>{count}</span>
                        <span className="fr">{time}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default PicInfoItem;