import React, { Component, PropTypes } from "react";
import Span from "./Span";

class ImgTitle extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.title !== nextProps.title;
    }
    render() {
        return <h3 className="title">{this.props.title}</h3>;
    }
}

class ImgName extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.name !== nextProps.name;
    }
    render() {
        return <p className="img-name">{this.props.name}</p>;
    }
}

class DetailImgTitle extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.title !== nextProps.title ||
               this.props.name !== nextProps.name ||
               this.props.num !== nextProps.num ||
               this.props.len !== nextProps.len;
    }
    render() {
        return (
            <div className="img-info">
                <div className="cur-info">
                    <Span classN="cur-num" content={this.props.num} />
                    <Span classN="total-num" content={"/" + this.props.len} />
                </div>
                <ImgTitle title={this.props.title} />
                <ImgName name={this.props.name} />
            </div>
        );
    }
}

export default DetailImgTitle;