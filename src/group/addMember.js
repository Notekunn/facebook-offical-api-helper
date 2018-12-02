module.exports = (api) => {
    return function (ID_GROUP, ID_MEMBER) {
        return api.post('https://m.facebook.com/groups/members/add_friend/write/', { "__ajax__": "" }, {
            "profile_id": ID_MEMBER,
            "group_id": ID_GROUP
        })
        // .catch(e => e)
    }
}