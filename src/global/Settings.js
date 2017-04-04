var config = require("../config");

var Settings = {
    blank1x1: config.siteRoot + "src/images/blank_1x1.png",
    blank4x3: config.siteRoot + "src/images/blank_4x3.png",
    blank5x3: config.siteRoot + "src/images/blank_5x3.png",
    pullDownTips: ["继续下拉刷新", "松手即可刷新", "正在加载"],
    iscrollOptions: {
        "list": {
            topOffset: 0,
            startY: 0,
            preventDefault: true,
            probeType: 2,
            bounce: true,
            scrollbars: false,
            click: true
        },
        "carousel": {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true,
            snapSpeed: 400
        },
        "page": {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true,
            snapSpeed: 400
        }
    }
};

module.exports = Settings;