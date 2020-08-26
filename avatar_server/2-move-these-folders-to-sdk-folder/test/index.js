
let avatarA = new AVATAR(
    'https://avatar-dot-rqian-sps-summer20.df.r.appspot.com/Samples/TypeScript/avatar/',
    500,
    500,
    1000,
    500,
    0,
    0,
    {
        "avatar": "Mark",
        "gearandback": "false"
    }
)

avatarA.renderIn(window.document.getElementById('avatar1'))


let avatarB = new AVATAR(
    'https://avatar-dot-rqian-sps-summer20.df.r.appspot.com/Samples/TypeScript/avatar/',
    500,
    500,
    1000,
    1000,
    0,
    0,
    {
        // "avatar":"Mark",
        "gearandback": "false"
    }
)

avatarB.renderIn(window.document.getElementById('avatar2'))
