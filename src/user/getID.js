const cheerio = require('cheerio');
module.exports = (api) => {
    return async function (username) {
        const result = await api.get(`https://mbasic.facebook.com/${username}`);
        let $ = cheerio.load(result);
        let urlBlock = $('a:contains("Chặn người này")').attr('href');
        let userID = urlBlock.slice(urlBlock.indexOf('?bid=') + '?bid='.length, urlBlock.indexOf('&'))
        return userID;
    }
}