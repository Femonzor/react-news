function ajax(mySetting) {
    var setting = {
        url: window.location.pathname,
        async: true,
        type: "GET",
        data: {},
        dataType: "json",
        success: function (text) { },
        error: function () { }
    };
    var aData = [];
    var sData = "";
    for (var attr in mySetting) {
        setting[attr] = mySetting[attr];
    }
    for (var attr in setting.data) {
        aData.push(attr + "=" + filter(setting.data[attr]));
    }
    sData = aData.join("&");
    setting.type = setting.type.toUpperCase();

    var xhr = new XMLHttpRequest();
    try {
        if (setting.type == "GET") {
            sData = setting.url + "?" + sData;
            xhr.open(setting.type, sData + "&" + new Date().getTime(), setting.async);
            xhr.send();
        } else {
            xhr.open(setting.type, setting.url, setting.async);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(sData);
        }
    } catch (e) {
        return httpEnd();
    }

    if (setting.async) {
        xhr.addEventListener("readystatechange", httpEnd, false);
    } else {
        httpEnd();
    }

    function httpEnd() {
        if (xhr.readyState == 4) {
            var head = xhr.getAllResponseHeaders();
            var response = xhr.responseText;

            if (/application\/json/.test(head) || setting.dataType === "json" && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
                response = JSON.parse(response);
            }

            if (xhr.status == 200) {
                setting.success(response, setting, xhr);
            } else {
                setting.error(setting, xhr);
            }
        }
    }
    xhr.end = function () {
        xhr.removeEventListener("readystatechange", httpEnd, false);
    }

    return xhr;
}

export function post(pathname, data, success, error) {
    var setting = {
        url: pathname,
        type: "POST",
        data: data,
        success: success || function () { },
        error: error || function () { }
    };
    return ajax(setting);
}

export function get(pathname, data, success, error) {
    var setting = {
        url: pathname,
        type: "GET",
        data: data,
        success: success || function () { },
        error: error || function () { }
    };
    return ajax(setting);
}