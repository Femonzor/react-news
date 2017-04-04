import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import SubjectsActions from "../actions/SubjectsActions";
import SiteMain from "../components/SiteMain";

class SiteMainContainer extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(SubjectsActions.fetchSubjects());
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