﻿import React, { Component, PropTypes } from "react";
import PageContainer from "../containers/PageContainer";
import Scroll from "./Scroll";
import SubjectsActions from "../actions/SubjectsActions";
import IScrolls from "../global/IScrolls";

let scrollProps = {
    wrapId: "main-wrap",
    wrapClass: "main-wrap",
    scrlId: "main-scrl",
    scrlClass: "main-scrl clearfix",
    scrlStyle: null,
    dataLoaded: false,
    iscrollType: "page"
}

class ScrollContent extends Component {
    constructor(props) {
        super(props);
        this.scrollEndEvent = this.scrollEndEvent.bind(this);
    }
    scrollEndEvent() {
        const { dispatch } = this.props;
        const iscroll = this.refs.scroll.iscroll;
        const curIdx = iscroll.currentPage.pageX;
        let subject = null;
        if (curIdx !== this.props.curIdx) {
            subject = JSON.parse(sessionStorage.getItem("CURRENT_SUBJECT")) || {};
            subject.curIdx = curIdx;
            subject.name = this.props.subjects[curIdx].name;
            subject.id = this.props.subjects[curIdx].id;
            sessionStorage.setItem("CURRENT_SUBJECT", JSON.stringify(subject));
            dispatch(SubjectsActions.switchSubjectByIdx(curIdx));
            IScrolls.setCurIdx(curIdx);
        }
        IScrolls.switchCurrent(true);
    }
    renderPages() {
        const { subjects } = this.props;
        const len = subjects.length;
        const pct = 100 / len;
        const pageStyle = { width: pct + "%" };
        return subjects.map((item, idx) => {
            return <PageContainer key={item.id} subject={item} idx={idx} pageStyle={pageStyle} />
        });
    }
    componentDidUpdate() {
        const { curIdx } = this.props;
        const iscroll = this.refs.scroll.iscroll;
        let subject = JSON.parse(sessionStorage.getItem("CURRENT_SUBJECT")) || {};
        if (iscroll.currentPage.pageX !== curIdx) {
            subject.curIdx = curIdx;
            subject.name = this.props.subjects[curIdx].name;
            subject.id = this.props.subjects[curIdx].id;
            sessionStorage.setItem("CURRENT_SUBJECT", JSON.stringify(subject));
            iscroll.goToPage(curIdx, 0, 0);
            IScrolls.setCurIdx(curIdx);
        }
    }
    componentDidMount() {
        const { curIdx } = this.props;
        const iscroll = this.refs.scroll.iscroll;
        const subject = JSON.parse(sessionStorage.getItem("CURRENT_SUBJECT")) || {};
        if (curIdx !== -1 && subject.curIdx) {
            iscroll.goToPage(subject.curIdx, 0, 0);
            IScrolls.setCurIdx(subject.curIdx);
        }
    }
    render() {
        const { subjects } = this.props;
        const len = subjects.length;
        scrollProps.scrlStyle = { width: 100 * len + "%" };
        if (len) scrollProps.dataLoaded = true;
        return (
            <Scroll
                wrapId={scrollProps.wrapId}
                wrapClass={scrollProps.wrapClass}
                scrlId={scrollProps.scrlId}
                scrlClass={scrollProps.scrlClass}
                scrlStyle={scrollProps.scrlStyle}
                dataLoaded={scrollProps.dataLoaded}
                ref="scroll"
                scrollEvent={this.scrollEvent}
                scrollEndEvent={this.scrollEndEvent}
                type={scrollProps.iscrollType}>
                {this.renderPages()}
            </Scroll>
        );
    }
}

export default ScrollContent;