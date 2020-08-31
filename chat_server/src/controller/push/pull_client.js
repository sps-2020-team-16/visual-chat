const push = require('./push_service').service;

'use strict';

class LongPullClient {
    constructor(channel_id) {
        var that = this;
        this.channel_id = channel_id;
        this.valid = true;
        this.resolve = null;
        this.functor = message => { that.try_set(message); };
        this.promise = new Promise(function(resolve, reject) {
            that.resolve = resolve;
            let wait = setTimeout(() => {
                clearTimeout(wait);
                that.try_set(null);
            }, 5000);
        });
        push.add_client(this.channel_id, this.functor);
    }

    try_set(value) {
        if (this.valid) {
            this.valid = false;
            this.resolve(value);
            push.remove_client(this.channel_id, this.functor);
        }
    }

    send(message) {
        this.try_set(message);
    }

    finish() {
        return this.promise;
    }
};

exports.LongPullClient = LongPullClient;