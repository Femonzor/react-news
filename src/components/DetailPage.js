import React, { Component, PropTypes } from "react";
import DetailActions from "../actions/DetailActions";
import DetailHeader from "./DetailHeader";
import PicCarouselItem from "./PicCarouselItem";
import DetailImgTitle from "./DetailImgTitle";
import Scroll from "./Scroll";
import Loading from "./Loading";
import ClassNames from "classnames";

class PicDetail extends Component {
    constructor(props) {
        super(props);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.scrollEndEvent = this.scrollEndEvent.bind(this);
        this.state = {
            curIdx: 0,
            name: this.props.imgs[0].name
        };
        this.touchY = 0;
    }
    handleTouchStart(e) {
        if (e.target.nodeName.toLowerCase() === "img") return;
        this.touchY = e.touches[0].clientY;
    }
    handleTouchMove(e) {
        if (e.target.nodeName.toLowerCase() === "img") return;
        const el = e.currentTarget;
        const y = e.touches[0].clientY;
        if (el.scrollTop === 0) {
            if (y > this.touchY) e.preventDefault();
            else e.stopPropagation();
        }
    }
    renderItems() {
        const { title, imgs } = this.props;
        const len = imgs.length;
        const pct = 100 / len;
        const imgWrapStyle = { width: pct + "%" };
        return imgs.map((item, idx) => {
            return <PicCarouselItem key={idx} src={item.src} imgWrapStyle={imgWrapStyle} lazy={false} />;
        });
    }
    scrollEndEvent() {
        const { imgs } = this.props;
        const iscroll = this.refs.scroll.iscroll;
        const curIdx = iscroll.currentPage.pageX;
        this.setState({
            curIdx: curIdx,
            name: imgs[curIdx].name
        });
    }
    render() {
        const { title, imgs, iscrollType } = this.props;
        const len = imgs.length;
        const scrlStyle = { width: 100 * len + "%" };
        return (
            <div className="pic-content animate-infoshow" onTouchMove={this.handleTouchMove} onTouchStart={this.handleTouchStart}>
                <Scroll
                    wrapClass="pic-wrap mt1d5r"
                    scrlClass="pic-scrl clearfix"
                    scrlStyle={scrlStyle}
                    dataLoaded={true}
                    ref="scroll"
                    scrollEndEvent={this.scrollEndEvent}
                    type={iscrollType}>
                    {this.renderItems()}
                </Scroll>
                <DetailImgTitle title={title} num={this.state.curIdx + 1} name={this.state.name} len={len} />
            </div>
        );
    }
}

PicDetail.defaultProps = { iscrollType: "carousel" };

class InfoDetail extends Component {
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
    render() {
        const { title, time, org, content } = this.props;
        const createMarkup = () => {
            return {
                __html: content
            }
        }
        return (
            <div className="info-content animate-infoshow" onTouchMove={this.handleTouchMove} onTouchStart={this.handleTouchStart}>
                <h1 className="title">{title}</h1>
                <div className="subinfo">
                    <span className="org">{org}</span>
                    <span>{time}</span>
                </div>
                <div dangerouslySetInnerHTML={createMarkup()}></div>
            </div>
        );
    }
}

class DetailPage extends Component {
    renderContent() {
        const { data, dataId } = this.props;
        const type = dataId ? dataId.split("-")[0] : null;
        return data ? type === "info" ? <InfoDetail title={data.title} time={data.time} org={data.org} content={data.content} /> :
                      <PicDetail title={data.title} imgs={data.imgs} /> :
               <Loading />;
    }
    componentWillReceiveProps(nextProps) {
        const { dispatch } = nextProps;
        let el = null;
        if (!this.props.show && nextProps.show && !nextProps.data) {
            el = nextProps.dataId.split("-");
            setTimeout(() => {
                el[0] === "info" ? dispatch(DetailActions.fetchInfoDetail(el[1])) : dispatch(DetailActions.fetchPicDetail(el[1]));
            }, 500);
        }
    }
    render() {
        const { show, subjectName, dispatch } = this.props;
        const detailClass = ClassNames({
            "detail": true
        });
        return (
            <div className={detailClass}>
                <DetailHeader subjectName={subjectName} dispatch={dispatch} />
                {this.renderContent()}
            </div>
        );
    }
}

export default DetailPage;