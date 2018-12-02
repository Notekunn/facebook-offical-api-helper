module.exports = (api) => {
    return function (bio, public = false) {
        const form = new Object({ bio });
        if (public) form['publish_to_feed'] = "on";
        return api.post('https://mbasic.facebook.com/profile/intro/bio/save/', form);
    }
}