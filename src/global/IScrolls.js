var IScrolls = {
    main: null,
    carl: null,
    pages: [],
    curIdx: 0,
    prevIdx: 0,
    pageMoving: false,
    mainMoving: false,
    scrollStartX: 0,
    scrollStartY: 0,
    setMain: function (iscroll) {
        this.main = iscroll;
    },
    setCarl: function (iscroll) {
        this.carl = iscroll;
    },
    setPage: function (iscroll, idx) {
        this.pages[idx] = iscroll;
    },
    switchMain: function (enable) {
        var iscroll = this.main;
        if (iscroll) enable ? iscroll.enable() : iscroll.disable();
    },
    switchCarl: function (enable) {
        var iscroll = this.carl;
        if (iscroll) enable ? iscroll.enable() : iscroll.disable();
    },
    switchCurrent: function (enable) {
        var iscroll = this.pages[this.curIdx];
        if (iscroll) enable ? iscroll.enable() : iscroll.disable();
    },
    setCurIdx: function (idx) {
        this.prevIdx = this.curIdx;
        this.curIdx = idx;
        if (this.pages[this.prevIdx]) this.pages[this.prevIdx].disable();
        if (this.pages[this.curIdx]) this.pages[this.curIdx].enable();
    },
    scrollStartHandler: function () {
        this.pageMoving = this.mainMoving = false;
        this.scrollStartX = this.main.x;
        this.scrollStartY = this.pages[this.curIdx].y;
    },
    scrollMoveHandler: function () {
        var moveX, moveY, pageIScroll;
        if (!this.pageMoving && !this.mainMoving) {
            pageIScroll = this.pages[this.curIdx];
            moveX = Math.abs(this.main.x - this.scrollStartX);
            moveY = Math.abs(pageIScroll.y - this.scrollStartY);
            if (moveX > 5 || moveY > 5) {
                if (moveX > moveY) {
                    this.switchCurrent(false);
                    pageIScroll.scrollTo(0, this.scrollStartY);
                    this.mainMoving = true;
                } else {
                    this.switchMain(false);
                    this.main.goToPage(this.main.currentPage.pageX, 0);
                    this.pageMoving = true;
                }
            }
        }
    },
    scrollEndHandler: function () {
        this.switchCurrent(true);
        this.switchMain(true);
    }
};

module.exports = IScrolls;