import React, { Component, PropTypes } from "react";
import PageContent from "./PageContent";

class Page extends Component {
    renderContent() {
        const { subject, data, dispatch, pageStyle, idx } = this.props;
        const { loaded } = subject;
        return loaded ?
                   <PageContent subject={subject} data={data} dispatch={dispatch} idx={idx} /> :
                   null;
    }
    render() {
        const { subject, pageStyle } = this.props;
        const { id } = subject;
        return (
            <div data-subject-id={id} className="page" style={pageStyle}>
                {this.renderContent()}
            </div>
        );
    }
}

export default Page;