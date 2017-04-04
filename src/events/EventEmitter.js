var EventEmitter = {
    _events: {},
    dispatch: function (event, data) {
        var i, len;
        if (!this._events[event]) return;
        for (i = 0, len = this._events[event].length; i < len; i++)
            this._events[event][i](data);
    },
    subscribe: function (event, callback) {
        if (!this._events[event]) this._events[event] = [];
        this._events[event].push(callback);
    },
    unSubscribe: function (event) {
        if (this._events && this._events[event]) {
            delete this._events[event];
        }
    }
}

module.exports = EventEmitter;