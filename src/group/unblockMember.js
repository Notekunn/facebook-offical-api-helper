module.exports = (api) => {
    return function (ID_GROUP, ID_MEMBER) {
        return api.post('https://m.facebook.com/a/group/unblock', {
            "group_id": ID_GROUP,
            "user_id": ID_MEMBER,
            "__ajax__": ""
        })
    }
}