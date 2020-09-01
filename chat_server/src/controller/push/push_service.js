'use strict';

class PushService {
    constructor() {
        this.clients = new Map();
    }

    get_clients(channel_id) {
        channel_id = "" + channel_id;
        var set;
        if (this.clients.has(channel_id)) {
            set = this.clients.get(channel_id);
        } else {
            set = new Set();
            this.clients.set(channel_id, set);
        }
        return set;
    }

    add_client(channel_id, client) {
        var clients = this.get_clients(channel_id);
        clients.add(client);
    }

    remove_client(channel_id, client) {
        var clients = this.get_clients(channel_id);
        clients.delete(client);
        if (clients.size == 0) {
            this.clients.delete(channel_id);
        }
    }

    broadcast(channel_ids, message) {
        for (var channel_id in channel_ids) {
            var clients = this.get_clients(channel_id);
            for (var client of clients) {
                client(message);
            }
        }
    }
};

exports.service = new PushService();
