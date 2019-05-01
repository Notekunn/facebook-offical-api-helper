const untils = require('./untils');
const request = require("request-promise").defaults({
    jar: true
});
const jarRequest = request.jar();
const cheerio = require('cheerio');
const log = require('npmlog');
// const fs = require('fs');
module.exports = async (input) => {
    log.info('login', '...');
    let { appState, access_token } = input
    if (!appState && !access_token) return Promise.reject(log.error('login', 'input must be an object and have key appState or access_token') || 'ERR:: INPUT ERR');
    const createAppState = async function (access_token) {
        let { id: new_app_id } = await request.get({ url: 'https://graph.facebook.com/app', qs: { access_token }, json: true });
        let appState = await request.get({ url: 'https://api.facebook.com/method/auth.getSessionforApp', qs: { access_token, format: 'json', new_app_id, generate_session_cookies: '1' }, json: true });
        return appState.session_cookies

    }
    
    if (appState) {
        log.info('login', 'Login by appState');
    }
    else {

        try {
            appState = await createAppState(access_token);
            log.info('login', 'Login by token');
        } catch (error) {
            log.error('login', 'Login fail, please check your access_token');
            log.error('login', 'ERR:: ' + error.statusCode);
            return Promise.reject('Token not valid');
        }
    }
    appState.map(function (c) {

        var str = (c.name || c.key) + "=" + c.value + "; expires=" + c.expires + "; domain=" + c.domain.trim('.') + "; path=" + c.path + ";";
        jarRequest.setCookie(str, "http://" + c.domain);

    });
    let profileBodyHTML = await untils.get('https://mbasic.facebook.com/profile.php', jarRequest);
    log.info('login', 'Login success!');

    let $ = cheerio.load(profileBodyHTML);
    let formApply = Array.from($('input[type="hidden"]'))
        .map(e => ({ [$(e).attr('name')]: $(e).attr('value') }))
        .reduce((a, b) => ({ ...a, ...b }), {});
    formApply['__user'] = $('input[name="target"]').attr('value');

    const get = (url, qs = {}, options = {}) => untils.get(url, jarRequest, qs, options)
        .then(untils.parseResponse, untils.parseError);

    const post = (url, form = {}, qs = {}, __a = "1") => {
        let formRequest = new Object();
        if (__a == 0) formRequest = { ...form, ...formApply };
        else formRequest = { ...form, ...formApply, __a }
        return untils.post(url, jarRequest, formRequest, qs)
            .then(untils.parseResponse, untils.parseError);
    }
    const postFormData = (url, form = {}, qs = {}, options = {}, __a = "1") => {
        let formRequest = new Object();
        if (__a != "1") formRequest = { ...form, ...formApply };
        else formRequest = { ...form, ...formApply, __a }
        return untils.postFormData(url, jarRequest, formRequest, qs, options)
            .then(untils.parseResponse, untils.parseError);
    }
    const api = {
        get,
        post,
        postFormData,
        formApply
    };
    return require('./src/')(api); //Build
}  