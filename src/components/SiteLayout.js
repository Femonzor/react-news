import React, {Component, PropType} from "react";
import SiteHeader from "./SiteHeader";
import SiteMainContainer from "../containers/SiteMainContainer";
import DetailContainer from "../containers/DetailContainer";

class SiteLayout extends Component {
    render() {
        return (
            <div className="layout">
                <SiteHeader />
                <SiteMainContainer />
            </div>
        );
    }
}

export default SiteLayout;