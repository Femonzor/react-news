import React, { Component, PropTypes } from "react";
import Settings from "../global/Settings";
import Refresh from "./Refresh";
import PicCarousel from "./PicCarousel";
import InfoList from "./InfoList";
import PicInfoList from "./PicInfoList";
import Bottom from "./Bottom";
import Scroll from "./Scroll";
import Empty from "./Empty";
import SubjectDataActions from "../actions/SubjectDataActions";
import IScrolls from "../global/IScrolls";

let scrollProps = {
    wrapClass: "page-wrap",
    scrlClass: "page-scrl"
};

const throttle = (fn, delay, mustRunDelay) => {
    var timer = null;
    var t_start;
    return function () {
        var context = this, args = arguments, t_curr = +new Date();
        clearTimeout(timer);
        if (!t_start) {
            t_start = t_curr;
        }
        if (t_curr - t_start >= mustRunDelay) {
            fn.apply(context, args);
            t_start = t_curr;
        } else {
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        }
    };
};

class PageContent extends Component {
    constructor(props) {
        super(props);
        this.switchPicCarousel = this.switchPicCarousel.bind(this);
        this.setScrollTopOffset = this.setScrollTopOffset.bind(this);
        this.scrollStartEvent = this.scrollStartEvent.bind(this);
        this.scrollEvent = this.scrollEvent.bind(this);
        this.scrollEndEvent = this.scrollEndEvent.bind(this);
        this.getRefreshElHeight = this.getRefreshElHeight.bind(this);
        this.imgShow = this.imgShow.bind(this);
        const { idx } = props;
        this.wrapId = "wrap-" + idx;
        this.scrlId = "scrl-" + idx;
        this.dataLoaded = false;
        this.reset = false;
        this.loading = false;
        this.iscrollRefresh = false;
        this.isHistory = false;
    }
    imgShow() {
        const { iscrollType } = this.props;
        const iscrollOptions = Settings.iscrollOptions[iscrollType];
        const iscroll = this.refs[this.scrlId].iscroll;
        const height = Settings.iscrollOptions[iscrollType].topOffset;
        let i, len, anc, ancEndY,
            y = (-iscroll.y >> 0) - height,
            endY = y + iscroll.wrapperHeight,
            imgs = document.getElementById(this.scrlId).getElementsByTagName("img");
        for (i = 0, len = imgs.length; i < len; i++) {
            if (!(imgs[i].src.indexOf(Settings.blank4x3) !== -1 || imgs[i].src.indexOf(Settings.blank5x3) !== -1)) continue;
            anc = imgs[i].parentNode.parentNode;
            ancEndY = anc.offsetTop + anc.offsetHeight - height;
            if (ancEndY < y || anc.offsetTop - height > endY) continue;
            if (anc.offsetTop - height + anc.offsetHeight / 2 >= y && anc.offsetTop - height + anc.offsetHeight / 2 <= endY) {
                imgs[i].src = imgs[i].dataset.src;
                ((i) => {
                    imgs[i].onload = () => {
                        if (imgs[i].dataset.src) delete imgs[i].dataset.src;
                    }
                })(i);
            }
        }
    }
    scrollStartEvent() {
        IScrolls.scrollStartHandler();
    }
    scrollEvent() {
        IScrolls.scrollMoveHandler();
        const { iscrollType, data, dispatch, subject, idx } = this.props;
        const { id, type } = subject;
        const { page, end } = data;
        const iscrollOptions = Settings.iscrollOptions[iscrollType];
        const downStatus = data.downStatus;
        let iscroll = this.refs[this.scrlId].iscroll;
        if (iscroll.y >= 5 && downStatus !== 1) {
            iscroll.minScrollY = 0;
            dispatch(SubjectDataActions.setRefreshStatus(id, 1));
        } else if (iscroll.y < 5 && downStatus === 1) {
            iscroll.minScrollY = iscrollOptions.startY;
            dispatch(SubjectDataActions.setRefreshStatus(id, 0));
        }
        if (idx !== 0 && !end && iscroll.y - 50 <= iscroll.maxScrollY && !this.loading && this.iscrollRefresh) {
            this.loading = true;
            this.iscrollRefresh = false;
            dispatch(SubjectDataActions.fetchSubjectData(id, type, page));
        }
        throttle(this.imgShow, 200, 700)();
    }
    scrollEndEvent() {
        IScrolls.scrollEndHandler();
        let positions = JSON.parse(sessionStorage.getItem("SCROLL_POSITIONS")) || {};
        const { data, dispatch, subject, idx } = this.props;
        const { id, type } = subject;
        const { page, end } = data;
        const iscroll = this.refs[this.scrlId].iscroll;
        const downStatus = data.downStatus;
        positions[this.wrapId] = iscroll.y;
        sessionStorage.setItem("SCROLL_POSITIONS", JSON.stringify(positions));
        if (downStatus === 1) {
            dispatch(SubjectDataActions.setRefreshStatus(id, 2));
            setTimeout(() => {
                dispatch(SubjectDataActions.fetchSubjectData(id, type, 0));
            }, 1500);
        }
        if (idx !== 0 && !end && iscroll.y - 50 <= iscroll.maxScrollY && !this.loading && this.iscrollRefresh) {
            this.loading = true;
            this.iscrollRefresh = false;
            dispatch(SubjectDataActions.fetchSubjectData(id, type, page));
        }
    }
    switchPicCarousel(picInfoId) {
        const { subject, dispatch } = this.props;
        const { id } = subject;
        dispatch(SubjectDataActions.switchPicCarousel(id, picInfoId));
    }
    setScrollTopOffset(height) {
        const { iscrollType } = this.props;
        Settings.iscrollOptions[iscrollType].topOffset = height;
        Settings.iscrollOptions[iscrollType].startY = -height;
    }
    getRefreshElHeight(style) {
        const { iscrollType } = this.props;
        style.height = Settings.iscrollOptions[iscrollType].topOffset;
    }
    renderContent() {
        const { subject, data, dispatch } = this.props;
        const { type, loaded } = subject;
        const { downStatus, picInfos, selectId, infos } = data || {
            downStatus: 2,
            picInfos: [],
            selectId: 0,
            infos: []
        };
        const end = !!(data && data.end);
        if (!loaded) return <Empty />;
        else if (type === 0) {
            return [
                <Refresh
                    key="refresh"
                    downStatus={downStatus}
                    setScrollTopOffset={this.setScrollTopOffset} />,
                <PicCarousel
                    key="pic-carousel"
                    picInfos={picInfos}
                    selectId={selectId}
                    dispatch={dispatch}
                    switchPicCarousel={this.switchPicCarousel}
                    dataLoaded={this.dataLoaded} />,
                <InfoList
                    key="info-list"
                    dispatch={dispatch}
                    infos={infos} />
            ];
        } else if (type === 1) {
            return [
                <Refresh
                    key="refresh"
                    downStatus={downStatus}
                    setScrollTopOffset={this.setScrollTopOffset} />,
                <InfoList
                    key="info-list"
                    dispatch={dispatch}
                    infos={infos}
                    subjectName={subject.name} />,
                <Bottom key="bottom" end={end} loaded={this.dataLoaded} />
            ];
        } else if (type === 2) {
            return [
                <Refresh
                    key="refresh"
                    downStatus={downStatus}
                    setScrollTopOffset={this.setScrollTopOffset} />,
                <PicInfoList
                    key="picinfo-list"
                    dispatch={dispatch}
                    picInfos={picInfos}
                    subjectName={subject.name} />,
                <Bottom key="bottom" end={end} loaded={this.dataLoaded} />
            ];
        }
    }
    componentWillReceiveProps(nextProps) {
        this.reset = false;
        const { data } = this.props;
        if (data && this.props.data.downStatus === 2 &&
            nextProps.data.downStatus === 0) this.reset = true;
    }
    componentDidUpdate() {
        const { data } = this.props;
        const iscroll = this.refs[this.scrlId].iscroll;
        if (this.reset && this.dataLoaded && iscroll) {
            this.reset = false;
            iscroll.refresh();
        }
        if (data && data.downStatus === 0) {
            setTimeout(() => {
                iscroll.refresh(false);
                this.iscrollRefresh = true;
            }, 50);
        }
        this.loading = false;
        this.imgShow();
    }
    componentWillMount() {
        this.isHistory = false;
        const { data } = this.props;
        if (data) this.isHistory = true;
    }
    componentDidMount() {
        const { subject, dispatch, data } = this.props;
        const { id, type } = subject;
        if (!data) {
            setTimeout(() => {
                dispatch(SubjectDataActions.fetchSubjectData(id, type, data && data.page ? data.page : 0));
            }, 1500);
        } else {
            this.iscrollRefresh = true;
            this.imgShow();
        }
    }
    render() {
        const { iscrollType, data, idx } = this.props;
        if (data) this.dataLoaded = true;
        return (
            <Scroll
                wrapId={this.wrapId}
                wrapClass={scrollProps.wrapClass}
                scrlId={this.scrlId}
                scrlClass={scrollProps.scrlClass}
                dataLoaded={this.dataLoaded}
                ref={this.scrlId}
                scrollStartEvent={this.scrollStartEvent}
                scrollEvent={this.scrollEvent}
                scrollEndEvent={this.scrollEndEvent}
                type={iscrollType}
                getRefreshElHeight={this.getRefreshElHeight}
                refresh={true}
                isHistory={this.isHistory}
                idx={idx}>
                {this.renderContent()}
            </Scroll>
        );
    }
}

PageContent.defaultProps = { iscrollType: "list" };

export default PageContent;