AVATAR.iframeDomain = 'https://avatar-dot-rqian-sps-summer20.df.r.appspot.com/'

const width  = 200
const height = 400

const avatarArgs = {
    'Haru': {
        "matrixHeight": 15.0,
        "matrixY":      -5.0
    },
    'Hiyori': {
        "matrixHeight": 15.0,
        "matrixY":      -4.5 
    },
    'Mark': {
        "matrixHeight": 7.5, 
        "matrixY":      0.0
    },
    'Natori': {
        "matrixHeight": 15.0,
        "matrixY":      -5.0
    },
    'Rice': {
        "matrixHeight": 5.0, 
        "matrixY":      0.0 
    }
}

const loadModel = ( modelName , callbackFlag = null )=>{

    const options = {
            "avatar": modelName,           // the name of the avatar 2D model
            "gearandback": "false",     // if true the switching gear the background will appear
            "buttons": "false",         // skip the render of buttons

            "matrixHeight": avatarArgs[modelName]['matrixHeight'],
            "matrixY":      avatarArgs[modelName]['matrixY'],
            }
    if( !!callbackFlag ){
        options["callbackMsg"] = callbackFlag
    }

    let avatar = new AVATAR(
        'https://avatar-dot-rqian-sps-summer20.df.r.appspot.com/Samples/TypeScript/avatar/',        //  Remote Avatar
        // '../CubismSdkForWeb-4-r.1/Samples/TypeScript/avatar/',                                   //  Local Avatar
        width,        // width of the new div
        height,        // height of the new div
        width,       // width of the canvas (increase this to make the model larger)
        height,        // height of the canvas
        0,          // offset in x direction
        0,          // offset in y direction
        options
    )

    avatar.getContainerDiv().style.left = '0px'
    avatar.getContainerDiv().style.top = '0px'

    // give a relatively high z-index so the avatar won't be covered by other divs/imgs
    avatar.getContainerDiv().style['z-index'] = 50
    
    return avatar
}
