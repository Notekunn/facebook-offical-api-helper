const request = require("request-promise").defaults({ jar: true });

function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

function getHeaders(url, options = {}) {
    var headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: "https://www.facebook.com/",
        Host: url.replace("https://", "").split("/")[0],
        Origin: "https://www.facebook.com",
        "User-Agent": options.userAgent || 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
        Connection: "keep-alive"
    };

    return headers;
}

function get(url, jar, qs = {}, options = {}) {
    // I'm still confused about this
    if (getType(qs) === "Object") {
        for (var prop in qs) {
            if (qs.hasOwnProperty(prop) && getType(qs[prop]) === "Object") {
                qs[prop] = JSON.stringify(qs[prop]);
            }
        }
    }
    var op = {
        headers: getHeaders(url, options),
        timeout: 60000,
        qs: qs,
        url: url,
        method: "GET",
        jar: jar,
        gzip: true
    };

    return request(op).then(function (res) {
        return res;
    });
}

function post(url, jar, form = {}, qs = {}) {
    var op = {
        headers: getHeaders(url),
        qs,
        timeout: 60000,
        url,
        method: "POST",
        form,
        jar,
        gzip: true
    };

    return request(op).then(function (res) {
        return res;
    });
}

function postFormData(url, jar, form = {}, qs = {}, options = {}) {
    var headers = getHeaders(url, options);
    headers["Content-Type"] = "multipart/form-data";
    var op = {
        headers: headers,
        timeout: 60000,
        url: url,
        method: "POST",
        formData: form,
        qs: qs,
        jar: jar,
        gzip: true
    };

    return request(op).then(function (res) {
        return res;
    });
}
function saveCookies(jar) {
    return function (res) {
        var cookies = res.headers["set-cookie"] || [];
        cookies.forEach(function (c) {
            if (c.indexOf(".facebook.com") > -1) {
                jar.setCookie(c, "https://www.facebook.com");
            }
            var c2 = c.replace(/domain=\.facebook\.com/, "domain=.messenger.com");
            jar.setCookie(c2, "https://www.messenger.com");
        });
        return res;
    };
}
function parseResponse(response) {
    try {
        let jsonResponse = response.slice("for (;;);".length, response.length);
        if (!response.includes('for (;;);')) responseObject = response;
        let responseObject = JSON.parse(jsonResponse);
        return responseObject;
    }
    catch (e) {
        return response;
    }

}

function parseError(error) {
    if (error && error.statusCode == 302) return Promise.resolve(error.message);
    return Promise.reject(error && error.statusCode);
}
module.exports = {
    get,
    getHeaders,
    getType,
    saveCookies,
    post,
    postFormData,
    parseResponse,
    parseError
}