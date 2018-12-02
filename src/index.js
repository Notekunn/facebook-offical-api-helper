const moduleApi = {
    group: [
        'closeComment',
        'openComment',
        'blockMember',
        'unblockMember',
        'joinGroup',
        'replyQuestion',
        'removeMember',
        'addMember'
    ],
    user: [
        'getToken',
        'postBio',
        'getID'
    ]

}
module.exports = (api) => {
    for (i in moduleApi) {
        api[`${i}`] = new Object();
        moduleApi[i].forEach((e) => {
            api[`${i}`][`${e}`] = require(`./${i}/${e}.js`)(api);
        })
    }
    return api;
}