import React, { Component, PropTypes } from "react";
import Scroll from "./Scroll";
import PicCarouselItem from "./PicCarouselItem";
import PicCarouselTitle from "./PicCarouselTitle";
import DetailActions from "../actions/DetailActions";
import IScrolls from "../global/IScrolls";

let scrollProps = {
    wrapId: "news-carl",
    wrapClass: "pic-wrap",
    scrlId: "news-scrl",
    scrlClass: "pic-scrl clearfix",
    scrlStyle: null,
    curIdx: 1,
    title: null
};

class PicCarousel extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    constructor(props, context) {
        super(props, context);
        this.initStatus = this.initStatus.bind(this);
        this.scrollEndEvent = this.scrollEndEvent.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.touchY = 0;
        this.mounted = false;
    }
    iscrollCircle() {
        const iscroll = this.refs.scroll.iscroll;
        const pageSize = iscroll.pages.length;
        let curPage = iscroll.currentPage.pageX,
            nextPage = curPage + 1;
        if (curPage === 0) {
            curPage = pageSize - 2;
            iscroll.goToPage(curPage, 0, 0);
            nextPage = pageSize - 1;
        } else if (curPage === pageSize - 1) {
            curPage = 1;
            iscroll.goToPage(1, 0, 0);
            nextPage = 2;
        }
        return +iscroll.scroller.children[curPage].dataset.picinfoId;
    }
    initStatus() {
        const iscroll = this.refs.scroll && this.refs.scroll.iscroll;
        if (this.mounted && iscroll.currentPage.pageX !== 1) iscroll.goToPage(1, 0, 0);
    }
    scrollEndEvent() {
        const { selectId, switchPicCarousel } = this.props;
        const iscroll = this.refs.scroll.iscroll;
        const curIdx = iscroll.currentPage.pageX;
        let id = +iscroll.scroller.children[curIdx].dataset.picinfoId;
        if (selectId !== id) {
            id = this.iscrollCircle();
            switchPicCarousel(id);
        }
    }
    handleClick(e) {
        const { dispatch } = this.props;
        let id = +e.currentTarget.dataset.picinfoId;
        let subjectName = e.currentTarget.dataset.subjectName;
        subjectName = subjectName || this.props.subjectName;
        id = id % 3;
        if (id === 0) id = 3;
        dispatch(DetailActions.showDetail(subjectName, "pic-" + id));
        this.context.router.push(`/detail?id=${id}&type=pic`);
    }
    handleTouchStart() {
        IScrolls.switchMain(false);
    }
    handleTouchEnd() {
        IScrolls.switchMain(true);
    }
    renderPicCarouselItems() {
        const { picInfos, selectId } = this.props;
        let data = picInfos.map(item => item);
        let len, pct, title, picCarouselItems = null, imgWrapStyle = null;
        if (len = data.length) {
            data.unshift(data[len - 1]);
            data.push(data[1]);
            len = data.length;
            pct = 100 / len;
            imgWrapStyle = { width: pct + "%" };
            picCarouselItems = data.map((item, idx) => {
                let id = idx === 0 || idx === len - 1 ? "_" + item.id : item.id;
                if (id === selectId) {
                    scrollProps.title = item.title;
                    scrollProps.curIdx = idx;
                }
                return <PicCarouselItem id={id} key={id} src={item.src} imgWrapStyle={imgWrapStyle}
                           handleClick={this.handleClick} subjectName={item.subjectName} lazy={true} />;
            });
        }
        if (len) scrollProps.scrlStyle = { width: 100 * len + "%" };
        return picCarouselItems;
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.picInfos !== nextProps.picInfos ||
               this.props.selectId !== nextProps.selectId;
    }
    componentDidUpdate() {
        const iscroll = this.refs.scroll.iscroll;
        const curIdx = scrollProps.curIdx;
        if (iscroll && iscroll.currentPage.pageX !== curIdx) iscroll.goToPage(curIdx, 0, 0);
    }
    componentDidMount() {
        this.mounted = true;
        const iscroll = this.refs.scroll.iscroll;
        const { picInfos, selectId } = this.props;
        let curIdx = 0;
        if (iscroll) {
            picInfos.forEach((item, idx) => {
                if (item.id === selectId) curIdx = idx + 1;
            });
            if (iscroll.currentPage.pageX !== curIdx) iscroll.goToPage(curIdx, 0, 0);
        }
    }
    render() {
        const { iscrollType, picInfos, dataLoaded } = this.props;
        const items = this.renderPicCarouselItems();
        return (
            <Scroll
                wrapId={scrollProps.wrapId}
                wrapClass={scrollProps.wrapClass}
                scrlId={scrollProps.scrlId}
                scrlClass={scrollProps.scrlClass}
                scrlStyle={scrollProps.scrlStyle}
                dataLoaded={dataLoaded}
                ref="scroll"
                initStatus={this.initStatus}
                scrollEndEvent={this.scrollEndEvent}
                handleTouchStart={this.handleTouchStart}
                handleTouchEnd={this.handleTouchEnd}
                type={iscrollType}
                afterScrlElems={[<PicCarouselTitle key="idxpct" title={scrollProps.title} idx={scrollProps.curIdx - 1} count={picInfos.length} />]}>
                {items}
            </Scroll>
        );
    }
}

PicCarousel.defaultProps = { iscrollType: "carousel" };

export default PicCarousel;