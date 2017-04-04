import React, { Component, PropTypes } from "react";
import InfoItem from "./InfoItem";
import InfoImgsItem from "./InfoImgsItem";
import DetailActions from "../actions/DetailActions";

class InfoList extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    constructor(props, context) {
        super(props, context);
        this.handleItemClick = this.handleItemClick.bind(this);
    }
    handleItemClick(e) {
        const { dispatch } = this.props;
        let id = +e.currentTarget.dataset.infoId;
        let subjectName = e.currentTarget.dataset.subjectName;
        subjectName = subjectName || this.props.subjectName;
        id = id % 5;
        if (id === 0) id = 5;
        dispatch(DetailActions.showDetail(subjectName, "info-" + id));
        this.context.router.push("/detail");
    }
    renderInfoItems() {
        const { infos } = this.props;
        return infos.map((item, idx) => {
            return typeof item.src === "object" ?
                      <InfoImgsItem src={item.src} title={item.title} time={item.time} key={item.id}
                        id={item.id} subjectName={item.subjectName} handleItemClick={this.handleItemClick} /> :
                      <InfoItem src={item.src} title={item.title} time={item.time} key={item.id}
                        id={item.id} subjectName={item.subjectName} handleItemClick={this.handleItemClick} />;
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.infos !== nextProps.infos;
    }
    render() {
        return (
            <div className="infos-wrap">
                {this.renderInfoItems()}
            </div>
        );
    }
}

export default InfoList;