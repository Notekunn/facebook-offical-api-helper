module.exports = (api) => {
    return function (ID_GROUP) {
        return api.post(`https://m.facebook.com/a/group/join/?group_id=${ID_GROUP}`).then(f =>f, f => f.statusCode)
    }
}