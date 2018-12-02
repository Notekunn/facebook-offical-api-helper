module.exports = (api) => {
    return function () {
        return api.post('https://www.facebook.com/v1.0/dialog/oauth/confirm', {
            "app_id": "165907476854626",
            "redirect_uri": "fbconnect://success",
            "display": "page",
            "access_token": "",
            "from_post": "1",
            "return_format": "access_token",
            "domain": "",
            "sso_device": "ios",
            "__CONFIRM__": "1",
        }, {}, 0).then(body => body.slice(body.indexOf('success#access_token=') + 'success#access_token='.length, body.indexOf('&expires_in')))
    }
}