const User = require("../../model/user");

async function login_internal(req) {
    const username = req.body.username;
    const password = req.body.password;
    let ret = {
        status: -1,
        message: "Already login"
    };
    if (req.session.user) {
        return ret;
    }
    let user = await User.getUser(username);
    if (user == null) {
        ret.message = "User not exist";
        return ret;
    }
    if (user.password != password) {
        ret.message = "Wrong password";
        return ret;
    }
    ret.status = 0;
    ret.message = "Ok";
    req.session.user = username;
    return ret;
}

async function register_internal(req) {
    const username = req.body.username;
    const password = req.body.password;
    let ret = {
        status: -1,
        message: ""
    };
    if (req.session.user) {
        return ret;
    }
    let user = await User.addUser(username, password);
    if (user == null) {
        ret.message = "User exist";
        return ret;
    }
    ret.status = 0;
    ret.message = "Ok";
    req.session.user = username;
    return ret;
}

async function login(req, res) {
    res.send(JSON.stringify(await login_internal(req)));
};

async function register(req, res) {
    res.send(JSON.stringify(await register_internal(req)));
};

async function logout(req, res) {
    if (req.session.user != null) {
        req.session.user = undefined;
        res.send(JSON.stringify({ status: 0 }));
    } else {
        res.send(JSON.stringify({ status: -1 }));
    }
};

async function current(req, res) {
    let ret = {
        status: 0,
        user: req.session.user
    };
    res.send(JSON.stringify(ret));
}

exports.login = login;
exports.register = register;
exports.logout = logout;
exports.current = current;
