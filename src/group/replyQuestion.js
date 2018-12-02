const cheerio = require('cheerio');
module.exports = (api) => {
    return async function (ID_GROUP, callback = f => f) {
        const body = await api.get(`https://m.facebook.com/groups/sync/membership_criteria_answer/edit/`, {group_id: ID_GROUP, source:'group_mall'});
        const $ = cheerio.load(body);
        const questions = Array.from($('div._2q7x div._2q7v span')).map(e => $(e).text().replace(new RegExp(unescape('%AD'), 'g'), ''))
        if (questions.length == 0) return false;
        const qs = new Object({ group_id: ID_GROUP, redirect_to_group: '1' });
        const form = new Object({ __ajax__: '' });
        for (let i = 0; i <= questions.length; i++) {
            qs[`custom_questions[${i}]`] = questions[i];
            form[`questionnaire_answers[${i}]`] = callback(questions[i]);
            
        }
        return await api.post(`https://m.facebook.com/groups/membership_criteria_answer/save/`, form, qs);
    }
}