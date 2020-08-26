# (A) Online Deployment:

These online versions can be used for debugging

https://avatar-dot-rqian-sps-summer20.df.r.appspot.com/Samples/TypeScript/iframe/

https://avatar-dot-rqian-sps-summer20.df.r.appspot.com/Samples/TypeScript/avatar/

## For example:

In https://avatar-dot-rqian-sps-summer20.df.r.appspot.com/Samples/TypeScript/iframe/

Press F12 and in the console, the code below can be used for debugging

```
avatarA.say("hello",2000)
avatarA.getMotionList()
avatarA.setMotion("motion:Idle:5")

avatarB.say("hello",2000)
avatarB.getExpressionList()
avatarB.setExpression("expression:f05")
```


# (B) Usage

Regarding the usage of AVATAR class (and remote/local avatar service)

Please check the simplest example in 'example-iframe' folder:

[example-iframe](./example-iframe/)

### 1. import the helper functions to manipulate 2D avatar models

Import avatar.js from https://avatar-dot-rqian-sps-summer20.df.r.appspot.com/Samples/TypeScript/iframe/avatar.js

(It is also OK to import avatar.js from a local file)

Then the class called 'AVATAR' will be able to be used.

```

    <!-- Remote avatar.js -->
    <script src="https://avatar-dot-rqian-sps-summer20.df.r.appspot.com/Samples/TypeScript/iframe/avatar.js"></script>
    <!-- Local avatar.js -->
    <!-- <script src="../CubismSdkForWeb-4-r.1/Samples/TypeScript/iframe/avatar.js"></script> -->

```

### 2. render the model

Create a new instance of AVATAR class.
Then render it in one div called 'avatar1'.

```

const loadRemoteModel = () => {

    //////////////////////////////////////////////////////////////////////////////////////////
    /////
    /////   VERY IMPORTANT: (It is needed to set this for postMessage)
    /////   'AVATAR.iframeDomain' must be the domain of the avatar service
    /////   Otherwise, issues regrading cross-origin will appear
    /////
    /////   Therefore, this can be ignored when the avatar service is in the same domain
    /////
    AVATAR.iframeDomain = 'https://avatar-dot-rqian-sps-summer20.df.r.appspot.com/'
    //////////////////////////////////////////////////////////////////////////////////////////

    const modelName = String(window.document.getElementById('model-input').value)   // get the model name (default: Haru)
    console.log(modelName)
    window.avatarA = new AVATAR(
        'https://avatar-dot-rqian-sps-summer20.df.r.appspot.com/Samples/TypeScript/avatar/',
        // '../CubismSdkForWeb-4-r.1/Samples/TypeScript/avatar/',
        500,        // width of the new div
        500,        // height of the new div
        1000,       // width of the canvas (increase this to make the model larger)
        500,        // height of the canvas
        0,          // offset in x direction
        0,          // offset in y direction
        {
            "avatar": modelName,        // the name of the avatar 2D model
            "gearandback": "false",     // if true the switching gear the background will appear
            "buttons": "false"          // skip the render of buttons
        }           // additional arguments to be sent to the avatar service
    )
    window.avatarA.renderIn(window.document.getElementById('avatar1'))  // render the avatar in the div having the id of 'avatar1'
}

```

### 2.5 Regarding the postMessage and cross-origin issues

To make things easier, if the avatar service is not local:

```
...
    window.avatarA = new AVATAR(
        'https://avatar-dot-rqian-sps-summer20.df.r.appspot.com/Samples/TypeScript/avatar/',
        // '../CubismSdkForWeb-4-r.1/Samples/TypeScript/avatar/',
        500,        // width of the new div
...
```

then: 

* 'AVATAR.iframeDomain' must be set
* Use '.setExpression( name , true )'
* Use '.setMotion( name , true )'

If the avatar service is local (Or in the same domain):

```
...
    window.avatarA = new AVATAR(
        '../CubismSdkForWeb-4-r.1/Samples/TypeScript/avatar/',
        500,        // width of the new div
...
```

then: 

* 'AVATAR.iframeDomain' could be ignored
* Use '.setExpression( name )'
* Use '.setMotion( name )'


### 3. Set Motion and Expression

Use motions' string name or expressions' string name to launch a new motion or expression.

```
const setExpression = () => {
    ///// .setExpression('expression name')         =>  normal func
    ///// .setExpression('expression name', true)   =>  to use postMessage
    const expressionInput = String(window.document.getElementById('expression-input').value)
    window.avatarA.setExpression(expressionInput, true)
}

const setMotion = () => {
    ///// .setMotion('motion name')         =>  normal func
    ///// .setMotion('motion name', true)   =>  to use postMessage
    const motionInput = String(window.document.getElementById('motion-input').value)
    window.avatarA.setMotion(motionInput, true)
}
```

### 4. Chat Bubble

'.say( input text , lasting-milliseconds )' can be used to render a chat bubble with the input text. ( Will appear on the top of the avatar )

```
const saySth = () => {
    const sayInput = String(window.document.getElementById('say-input').value)
    window.avatarA.say(sayInput, 1500)
}
```

### 5. Model Release

'.hide()' to hide the avatar

'.release()' to stop the running of the avatar

```
const releaseAndHide = () => {
    ///// .release()      =>  normal func
    ///// .release(true)  =>  to use postMessage
    window.avatarA.release(true)
    window.avatarA.hide()
}
```


# (C) Installation (Server Deployment):

The avatar service is a service based on static resources and iframe. 

The service use GET arguments received to modify the model, canvas_size, background, and etc.

These steps can be skipped if you don't need to deploy your own avatar service. 

Simply check [(B) Usage](#b-usage), import the avatar.js and use AVATAR class to get a model from: 

https://avatar-dot-rqian-sps-summer20.df.r.appspot.com/Samples/TypeScript/avatar/

---

But if you want to deploy another avatar service, the steps below can be taken as an example.

### 1. 
Install a latest version of nodejs

### 2.
```
cd
git clone https://github.com/sps-2020-team-16/visual-chat.git
cd visual-chat/avatar_server/
npx serve
```

### 3.
```
Then use web browsers to open:
http://localhost:5000/example-iframe/
http://localhost:5000/CubismSdkForWeb-4-r.1/Samples/TypeScript/iframe/
http://localhost:5000/CubismSdkForWeb-4-r.1/Samples/TypeScript/avatar/
```

