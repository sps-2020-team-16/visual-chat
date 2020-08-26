
let avatarA = new AVATAR(
    '../avatar/',
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
    '../avatar/',
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
