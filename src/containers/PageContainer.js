import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Page from "../components/Page";

class PageContainer extends Component {
    render() {
        const { subject, pageData, dispatch, pageStyle, idx } = this.props;
        const subjectId = subject.id;
        const data = pageData[subjectId];
        return <Page
                   subject={subject}
                   data={data}
                   dispatch={dispatch}
                   pageStyle={pageStyle}
                   idx={idx} />;
    }
}

const mapStateToProps = (state) => {
    const { pageData } = state;
    return {
        pageData
    };
}

export default connect(mapStateToProps)(PageContainer);