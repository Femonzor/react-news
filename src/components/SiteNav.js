import React, { Component, PropTypes } from "react";
import SubjectsActions from "../actions/SubjectsActions";
import ClassNames from "classnames";
import IScrolls from "../global/IScrolls";

const siteNavPropTypes = {
    subjects: PropTypes.array,
    selectId: PropTypes.number,
    curIdx: PropTypes.number,
    dispatch: PropTypes.func
};

let process = 0, timer = null;

const step = (navList, unit) => {
    process += 1;
    navList.scrollLeft += unit;
    if (process < 15) timer = requestAnimationFrame(step.bind(null, navList, unit));
    else {
        sessionStorage.setItem("NAV_SCROLL_LEFT", navList.scrollLeft);
        cancelAnimationFrame(timer);
    }
}

class NavMore extends Component {
    render() {
        const moreClass = ClassNames({
            "nav-more": true,
            "r45deg": this.props.showMore
        });
        const { handleMoreClick } = this.props;
        return (
            <div className={moreClass} onClick={handleMoreClick}>
                <i className="demo-icon icon-plus">&#xe806;</i>
            </div>
        );
    }
}

class NavScroll extends Component {
    render() {
        const ulClass = ClassNames({
            "nav-list": true,
            "invis": this.props.showMore
        });
        return (
            <ul className="nav-list" ref={ref => { this.navList = ref; }}>
                {this.props.children}
            </ul>
        );
    }
}

class NavSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: true
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.showMore !== nextProps.showMore ||
               this.state.hide !== nextState.hide;
    }
    componentDidUpdate() {
        if (this.props.showMore && this.state.hide) {
            setTimeout(() => {
                this.setState({ hide: false });
            }, 0);
        } else if (!this.props.showMore && !this.state.hide) {
            setTimeout(() => {
                this.setState({ hide: true });
            }, 200);
        }
    }
    render() {
        const classN = ClassNames({
            "nav-switch": true,
            "hide": !this.props.showMore && this.state.hide,
            "invis": !(this.props.showMore && !this.state.hide)
        });
        return <div className={classN}>切换栏目</div>;
    }
}

class NavAll extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.showMore !== nextProps.showMore;
    }
    render() {
        const classN = ClassNames({
            "nav-all": true,
            "clearfix": true,
            "close": !this.props.showMore
        });
        return (
            <ul className={classN}>
                {this.props.children}
            </ul>
        );
    }
}

class NavItem extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.cur !== nextProps.cur;
    }
    render() {
        const { id, handleItemClick, name } = this.props;
        const navItemClass = ClassNames({
            "nav-item": true,
            "on": this.props.cur && !this.props.wrap
        });
        const nameClass = ClassNames({
            "name": true,
            "on": this.props.cur
        });
        return this.props.wrap ?
                   <li className={navItemClass}>
                       <span data-id={id} className={nameClass} onClick={handleItemClick}>{name}</span>
                   </li> :
                   <li data-id={id} className={navItemClass} onClick={handleItemClick}>{name}</li>;
    }
}

class SiteNav extends Component {
    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleMoreClick = this.handleMoreClick.bind(this);
        this.change = false;
    }
    handleItemClick(e) {
        const { dispatch } = this.props;
        const id = +e.target.dataset.id;
        dispatch(SubjectsActions.switchSubjectById(id));
    }
    handleMoreClick(e) {
        const { dispatch, showMore } = this.props;
        dispatch(SubjectsActions.showMoreSubjects(!showMore));
    }
    renderNavItems(wrap) {
        const { subjects, selectId } = this.props;
        if (!subjects.length) return null;
        return subjects.map(item => {
            if (item.id === selectId) {
                return <NavItem id={item.id} wrap={wrap} key={item.id} cur={true} handleItemClick={this.handleItemClick} name={item.name} />;
            } else {
                return <NavItem id={item.id} wrap={wrap} key={item.id} cur={false} handleItemClick={this.handleItemClick} name={item.name} />;
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        this.change = !(this.props.selectId === nextProps.selectId);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.subjects !== nextProps.subjects ||
               this.props.selectId !== nextProps.selectId ||
               this.props.curIdx !== nextProps.curIdx ||
               this.props.showMore !== nextProps.showMore;
    }
    componentDidUpdate() {
        const { subjects, selectId, curIdx } = this.props;
        const navList = this.refs.navs.navList;
        const navListWidth = navList.offsetWidth;
        const endIntervalStart = (navListWidth * 0.4 >> 0) + navList.scrollLeft;
        const endIntervalEnd = (navListWidth * 0.5 >> 0) + navList.scrollLeft;
        // const scrollIntervalStart = 0;
        // const scrollIntervalEnd = navList.scrollWidth - navListWidth;
        let navItem, distance;
        if (this.change) {
            var a = IScrolls;
            process = 0;
            navItem = navList.children[curIdx];
            if (navItem.offsetLeft < endIntervalStart) {
                // navList.scrollLeft -= endIntervalStart - navItem.offsetLeft;
                timer = requestAnimationFrame(step.bind(null, navList, (navItem.offsetLeft - endIntervalStart) / 15));
            } else if (navItem.offsetLeft > endIntervalEnd) {
                // navList.scrollLeft += navItem.offsetLeft - endIntervalEnd;
                timer = requestAnimationFrame(step.bind(null, navList, (navItem.offsetLeft - endIntervalEnd) / 15));
            }
        }
    }
    componentDidMount() {
        const { curIdx } = this.props;
        const scrollLeft = sessionStorage.getItem("NAV_SCROLL_LEFT");
        if (curIdx !== -1 && scrollLeft) this.refs.navs.navList.scrollLeft = +scrollLeft;
    }
    render() {
        const { showMore } = this.props;
        return (
            <div className="navbar">
                <NavMore showMore={showMore} handleMoreClick={this.handleMoreClick} />
                <NavScroll showMore={showMore} ref="navs">
                    {this.renderNavItems(false)}
                </NavScroll>
                <NavSwitch showMore={showMore} />
                <NavAll showMore={showMore}>
                    {this.renderNavItems(true)}
                </NavAll>
            </div>
        );
    }
}

SiteNav.propTypes = siteNavPropTypes;

export default SiteNav;