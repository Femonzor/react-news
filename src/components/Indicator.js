import React, { Component, PropTypes } from "react";
import Dot from "./Dot";

const propTypes = {
    idx: PropTypes.number,
    count: PropTypes.number
}

class Indicator extends Component {
    renderDots() {
        const { idx, count } = this.props;
        let dots = [], i;
        for (i = 0; i < count; i++) {
            if (i === idx) dots.push(<Dot key={i} cur={true} />);
            else dots.push(<Dot key={i} cur={false} />);
        }
        return dots;
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.idx !== nextProps.idx ||
               this.props.count !== nextProps.count;
    }
    render() {
        return (
            <div className="fr h100pct">
                <div className="h100pct">
                    {this.renderDots()}
                </div>
            </div>
        );
    }
}

Indicator.propTypes = propTypes;

export default Indicator;