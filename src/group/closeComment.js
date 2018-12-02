module.exports = (api) => {
    return function (IDPOST) {
        return api.post('https://www.facebook.com/feed/ufi/disable_comments/?dpr=1', {
            "ft_ent_identifier": IDPOST,
            "disable_comments": "1",
        })
    }
}