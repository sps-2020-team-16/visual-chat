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

# (B) Installation:

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

# (C) Regarding the usage of AVATAR class:

Please check the simplest example in 'example-iframe' folder

### 1. import the helper functions to manipulate 2D avatar models

```
<script src="../CubismSdkForWeb-4-r.1/Samples/TypeScript/iframe/avatar.js"></script>
```

### 2. render the model

Create a new instance of AVATAR class.
Then render it in one div.

```
const modelName = String(window.document.getElementById('model-input').value)

window.avatarA = new AVATAR(
    // 'https://avatar-dot-rqian-sps-summer20.df.r.appspot.com/Samples/TypeScript/avatar/',
    '../CubismSdkForWeb-4-r.1/Samples/TypeScript/avatar/',
    500,
    500,
    1000,
    500,
    0,
    0,
    {
        "avatar": modelName,
        "gearandback": "false"
    }
)
window.avatarA.renderIn(window.document.getElementById('avatar1'))

```

### 3. Set Motion and Expression

Use motions' string name or expressions' string name to launch a new motion or expression.

```
const setExpression = () => {
    const expressionInput = String(window.document.getElementById('expression-input').value)
    window.avatarA.setExpression(expressionInput)
}

const setMotion = () => {
    const motionInput = String(window.document.getElementById('motion-input').value)
    window.avatarA.setMotion(motionInput)
}
```
