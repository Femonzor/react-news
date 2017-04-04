import React, { Component, PropTypes } from "react";
import SiteNav from "./SiteNav";
import ScrollContent from "./ScrollContent";

class SiteMain extends Component {
    render() {
        return (
            <div className="main">
                <SiteNav {...this.props} />
                <ScrollContent {...this.props} />
            </div>
        );
    }
}

export default SiteMain;