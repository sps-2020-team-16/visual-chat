const PullClient = require('../push/pull_client');
const PushService = require('../push/push_service');

const Emotion = require('../../api/emotion');
const Chat = require('../../model/chat');

const Common = require('../common');

async function get_update_for(room, after, before) {
    return await Chat.getMessage(room, after, before);
}

async function pull_update_internal(req, res) {
    var user = await Common.currentUser(req);
    const room = req.body.room;
    const after = req.body.after;
    const before = req.body.before;
    var ret = {
        status: 0,
        update: []
    };
    ret.update = await get_update_for(room, after, before);
    if (ret.update.length == 0) {
        var client = new PullClient.LongPullClient(room);
        var message = await client.finish();
        if (message != null) {
            ret.update.push(message);
        }
    }
    return ret;
}

async function pull_update(req, res) {
    res.send(JSON.stringify(await pull_update_internal(req)));
}

async function send_message_internal(req) {
    var user = await Common.currentUser(req);
    const message = req.body.message;
    const room = req.body.room;
    var ret = {
        status: -1,
        message: ""
    };
    if (!message || !room) {
        ret.message = "No message or room";
        return ret;
    }
    var data = {
        type: "message",
        sender: user.username,
        // save avatar
        avatar: req.session.avatar,
        message: message,
        emotion: await Emotion.getEmotionWithTimeout(message)
    };
    let chat_msg = await Chat.addMessage(room, data);
    PushService.service.broadcast(room, chat_msg);
    ret.status = 0;
    return ret;
}

async function send_message(req, res) {
    res.send(JSON.stringify(await send_message_internal(req)));
}

exports.pull_update = pull_update;
exports.send_message = send_message;