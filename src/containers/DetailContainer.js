import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import DetailPage from "../components/DetailPage";

class DetailContainer extends Component {
    render() {
        const { dataId, show, subjectName, items, dispatch } = this.props;
        const data = dataId ? items[dataId] : null;
        return <DetailPage
                   show={show}
                   subjectName={subjectName}
                   data={data}
                   dataId={dataId}
                   dispatch={dispatch} />;
    }
}

const mapStateToProps = (state) => {
    const { detailData } = state;
    const { dataId, show, subjectName, items } = detailData;
    return {
        dataId,
        show,
        subjectName,
        items
    };
}

export default connect(mapStateToProps)(DetailContainer);