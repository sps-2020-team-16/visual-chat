const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore();

const Common = require('../controller/common');

async function addMessage(room, data) {
    data.room = room;
    data.time = Common.time();
    let messageKey = datastore.key(['Message', ''+ data.time]);
    await datastore.insert({
        "key": messageKey,
        "data": data
    })
    await Common.snooze(100);
    return await datastore.get(messageKey);;
}

async function getMessage(room, after, before) {
    after = after ?? Common.time();
    var query = datastore
        .createQuery('Message')
        .filter('room', '=', room)
        .filter('time', '>=', after)
        .order('time', {
            descending: true,
        })
        .limit(50);
    if (before) query = query.filter('time', '<=', before);
    const [messages] = await datastore.runQuery(query);
    messages.forEach(task => console.log(task));
    // messages.forEach(task => datastore.delete(task[Datastore.KEY]));
    return messages;
}

async function clearMessage() {
    const query = datastore
        .createQuery('Message');
    const [messages] = await datastore.runQuery(query);
    messages.forEach(task => datastore.delete(task[Datastore.KEY]));
    console.log("delete", messages.length, "message");
}

exports.addMessage = addMessage;
exports.getMessage = getMessage;

// clearMessage();