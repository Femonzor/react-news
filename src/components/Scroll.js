import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import IScroll from "../js/iscroll-probe";
import IScrolls from "../global/IScrolls";
import Settings from "../global/Settings";

class Scroll extends Component {
    constructor(props) {
        super(props);
        this.iscroll = null;
    }
    initIScroll() {
        const { scrollStartEvent, scrollEvent, scrollEndEvent, initStatus, type, idx, wrapId, isHistory } = this.props;
        this.iscroll = new IScroll(ReactDOM.findDOMNode(this.refs.scrollEl), Settings.iscrollOptions[type], !!isHistory);
        const positions = JSON.parse(sessionStorage.getItem("SCROLL_POSITIONS")) || {};
        if (type === "list") {
            IScrolls.setPage(this.iscroll, idx);
            if (positions[wrapId]) this.iscroll.scrollTo(0, positions[wrapId]);
        } else if (type === "carousel" && wrapId) {
            IScrolls.setCarl(this.iscroll);
        } else if (type === "page") {
            IScrolls.setMain(this.iscroll);
        }
        if (scrollStartEvent) this.iscroll.on("scrollStart", scrollStartEvent);
        if (scrollEvent) this.iscroll.on("scroll", scrollEvent);
        if (scrollEndEvent) this.iscroll.on("scrollEnd", scrollEndEvent);
        if (initStatus) initStatus();
    }
    componentDidUpdate() {
        const { dataLoaded, type, refresh, getRefreshElHeight } = this.props;
        const scrollEl = ReactDOM.findDOMNode(this.refs.scrollEl);
        let style = {};
        if (dataLoaded && !this.iscroll) {
            if (!scrollEl.style.height && refresh && getRefreshElHeight && type === "list") {
                getRefreshElHeight(style);
                scrollEl.style.height = scrollEl.scrollHeight - style.height + "px";
            }
            this.initIScroll();
        }
    }
    componentDidMount() {
        const { dataLoaded } = this.props;
        if (dataLoaded && !this.iscroll) this.initIScroll();
    }
    render() {
        const {
            wrapId,
            wrapClass,
            scrlId,
            scrlClass,
            scrlStyle,
            afterScrlElems,
            children,
            handleTouchStart,
            handleTouchEnd,
        } = this.props;
        return (
            <div id={wrapId} className={wrapClass} ref="scrollEl" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <div id={scrlId} className={scrlClass} style={scrlStyle}>
                    {children}
                </div>
                {afterScrlElems}
            </div>
        );
    }
}

export default Scroll;