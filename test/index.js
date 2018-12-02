const shako = require('../index');
const fs = require('fs')
const appState = require('../config/appstate.json');
const cheerio = require('cheerio');
(async () => {
    const api = await shako({ appState });
    // await api.group.unblockMember("1970910276566729", "100009850561321");
    const result = await api.user.getID('nay.zard')

    console.log(result)
})().catch((e) => console.log('ERROR: ' + e));