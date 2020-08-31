const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore();

const Common = require('../controller/common');

async function getUser(username) {
    let userKey = datastore.key(['User', username]);
    let [user] = await datastore.get(userKey);
    return user;
}

async function listUser() {
    let [users] = await datastore.runQuery(datastore.createQuery('User'));
    return users;
}

async function addUser(username, password) {
    let user = await getUser(username);
    if (user != null) {
        return null;
    } else {
        let userKey = datastore.key(['User', username]);
        await datastore.insert({
            "key": userKey,
            "data": {
                "username": username,
                "password": password
            }
        });
        await Common.snooze(100);
        user = await getUser(username);
    }
    return user;
}

async function delUser(username) {
    let user = await getUser(username);
    if (user != null) {
        datastore.delete(user[Datastore.KEY]);
    }
}

exports.getUser = getUser;
exports.addUser = addUser;
exports.delUser = delUser;
exports.listUser = listUser;
