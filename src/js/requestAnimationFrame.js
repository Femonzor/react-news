(function() {
    var lastTime = 0,
        vendors = ["webkit", "moz", "o", "ms"],
        i, len;
    for(i = 0, len = vendors.length; i < vendors.length && !window.requestAnimationFrame; i++) {
        window.requestAnimationFrame = window[vendors[i] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[vendors[i] + "CancelAnimationFrame"] ||
                                      window[vendors[i] + "CancelRequestAnimationFrame"];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 1000 / 60 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
})();