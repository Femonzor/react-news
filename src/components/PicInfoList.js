import React, { Component, PropTypes } from "react";
import PicInfoItem from "./PicInfoItem";
import DetailActions from "../actions/DetailActions";

const propTypes = {
    picInfos: PropTypes.array
};

class PicInfoList extends Component {
    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
    }
    handleItemClick(e) {
        const { dispatch } = this.props;
        let id = +e.currentTarget.dataset.picinfoId;
        let subjectName = e.currentTarget.dataset.subjectName;
        subjectName = subjectName || this.props.subjectName;
        id = id % 3;
        if (id === 0) id = 3;
        dispatch(DetailActions.showDetail(subjectName, "pic-" + id));
    }
    renderPicInfoItems() {
        const { picInfos } = this.props;
        return picInfos.map((item, idx) => {
            return <PicInfoItem src={item.src} title={item.title} time={item.time}
                       key={item.id} id={item.id} count={item.count} handleItemClick={this.handleItemClick} />;
        });
    }
    render() {
        return (
            <div className="pinfos-wrap clearfix">
                {this.renderPicInfoItems()}
            </div>
        );
    }
}

PicInfoList.propTypes = propTypes;

export default PicInfoList;