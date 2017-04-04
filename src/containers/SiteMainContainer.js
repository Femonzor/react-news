import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import SubjectsActions from "../actions/SubjectsActions";
import SiteMain from "../components/SiteMain";

class SiteMainContainer extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        if (this.props.curIdx === -1) {
            sessionStorage.removeItem("SCROLL_POSITIONS");
            sessionStorage.removeItem("NAV_SCROLL_LEFT");
            sessionStorage.removeItem("CURRENT_SUBJECT");
            dispatch(SubjectsActions.fetchSubjects());
        }
    }
    render() {
        return <SiteMain {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    const { nav } = state;
    const { subjects, selectId, curIdx, showMore } = nav;
    return {
        subjects,
        selectId,
        curIdx,
        showMore
    };
}

export default connect(mapStateToProps)(SiteMainContainer);