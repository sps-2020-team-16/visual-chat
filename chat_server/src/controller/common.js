const User = require("../model/user");
const process = require('process');

async function currentUser(req) {
    const username = req.session.user;
    return await User.getUser(username);
}

exports.currentUser = currentUser;

exports.time = () => {
    var hrTime = process.hrtime();
    return hrTime[0] * 1000000000 + hrTime[1];
}
exports.snooze = ms => new Promise(resolve => setTimeout(resolve, ms));