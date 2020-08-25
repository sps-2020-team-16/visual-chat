
class AVATAR {

    static iframeDomain = 'http://localhost:5000'

    constructor(
        url,
        divWidth,
        divHeight,
        canvasWidth,
        canvasHeight,
        xOffset,
        yOffset,
        options
    ) {
        this._url = url
        this._divWidth = divWidth
        this._divHeight = divHeight
        this._canvasWidth = canvasWidth
        this._canvasHeight = canvasHeight
        this._xOffset = xOffset
        this._yOffset = yOffset
        this._options = options

        this._divRef = null
        this._innerDiv = null
        this._iframeRef = null
        this._createDiv()

        this._bubble = null
        this._bubbleArrow = null
        this._bubbleText = null
        this._bubbleCount = 0
        this._createBubble()
    }

    renderIn(targetDiv) {

        if (!targetDiv) {
            console.log(`Invalid target div: ${targetDiv}`)
            return false
        }
        else if (targetDiv.tagName != 'DIV') {
            console.log(`The tag name should be DIV instead of: ${targetDiv.tagName}`)
            return false
        }
        else {
            targetDiv.appendChild(this._divRef)
            return true
        }

        // if (targetDiv && targetDiv.tagName == 'DIV') {
        //     targetDiv.appendChild( this._divRef )
        //     return true
        // }
        // else {
        //     return false
        // }

    }

    moveTo(targetDivID) {
        if (((typeof targetDivID) === 'string') == false) {
            console.log(`Invalid input type: typeof ${targetDivID} = ${(typeof targetDivID)}`)
            return false
        }

        const targetDiv = window.document.getElementById(targetDivID)
        if (!targetDiv) {
            console.log(`Not found the div with id: ${targetDivID}`)
            return false
        }

        return this.renderIn(targetDiv)
    }

    _createDiv() {

        let divRef = window.document.createElement('div')
        divRef.style.width = `${this._divWidth}px`
        divRef.style.height = `${this._divHeight}px`
        divRef.style.position = 'absolute'

        let innerDiv = window.document.createElement('div')
        innerDiv.style.width = `${this._divWidth}px`
        innerDiv.style.height = `${this._divHeight}px`
        innerDiv.style.position = 'absolute'
        innerDiv.style.overflow = 'hidden'

        let iframeRef = window.document.createElement('iframe')
        iframeRef.style.width = `${this._canvasWidth}px`
        iframeRef.style.height = `${this._canvasHeight}px`
        iframeRef.style.position = 'absolute'
        iframeRef.style.left = `calc(50% - ${this._canvasWidth / 2 - this._xOffset}px)`
        iframeRef.style.top = `calc(50% - ${this._canvasHeight / 2 - this._yOffset}px)`

        iframeRef.scrolling = 'no'
        iframeRef.frameBorder = 0

        let tmpSrcURL = `${this._url}?width=${this._canvasWidth}&height=${this._canvasHeight}`
        for (let ele in this._options) {
            tmpSrcURL += `&${String(ele).toLowerCase()}=${this._options[ele]}`
        }
        iframeRef.src = tmpSrcURL

        // iframeRef.src = `../avatar/?width=${this._canvasWidth}&height=${this._canvasHeight}`
        // // ifrm.src = `../avatar/?avatar=Mark&gearandback=false&height=${ARGHEIGHT}&width=${ARGWIDTH}`
        // ifrm.src = 'https://avatar-dot-rqian-sps-summer20.df.r.appspot.com/Samples/TypeScript/Demo/'

        innerDiv.appendChild(iframeRef)
        divRef.appendChild(innerDiv)

        this._iframeRef = iframeRef
        this._innerDiv = innerDiv
        this._divRef = divRef
        // return this._divRef

    }

    changeBubbleStyle(aStyle) {
        for (let key in aStyle) {
            this._bubble.style[key] = aStyle[key]
        }
    }
    changeBubbleArrorStyle(aStyle) {
        for (let key in aStyle) {
            this._bubbleArrow.style[key] = aStyle[key]
        }
    }

    hide() {
        this._divRef.hidden = true
    }

    show() {
        this._divRef.hidden = false
    }

    getContainerDiv() {
        return this._divRef
    }

    say(rawMsg, lastingMilliseconds) {

        this._bubbleText.innerText = String(rawMsg)
        this._bubbleCount += 1
        if (this._bubbleCount >= 1) {
            this._bubble.hidden = false
        }

        setTimeout(() => {
            this._bubbleCount -= 1
            if (this._bubbleCount < 1) {
                this._bubble.hidden = true
            }
        }, lastingMilliseconds);

    }

    getExpressionList(usePostMsg = false) {
        if (usePostMsg) {
            this._postMsgToIframe({ 'type': 'showExpressionList' })
            return []
        }
        return Object.keys(this._iframeRef.contentWindow.AVATAR_MANIPULATE_EXPRESSIONS)
    }

    getExpressionFuncDict(usePostMsg = false) {
        if (usePostMsg) {
            this._postMsgToIframe({ 'type': 'showExpressionList' })
            return {}
        }
        return this._iframeRef.contentWindow.AVATAR_MANIPULATE_EXPRESSIONS
    }

    setExpression(v, usePostMsg = false) {
        const key = String(v)
        if (usePostMsg) {
            this._postMsgToIframe({
                'type': 'setExpression',
                'expression': key
            })
            return
        }
        if (this._iframeRef.contentWindow.AVATAR_MANIPULATE_EXPRESSIONS.hasOwnProperty(key)) {
            this._iframeRef.contentWindow.AVATAR_MANIPULATE_EXPRESSIONS[key]()
        }else{
            console.log(`Invalid expression key: ${ key }`)
        }
    }

    getMotionList(usePostMsg = false) {
        if (usePostMsg) {
            this._postMsgToIframe({ 'type': 'showMotionList' })
            return []
        }
        return Object.keys(this._iframeRef.contentWindow.AVATAR_MANIPULATE_MOTIONS)
    }

    getMotionFuncDict(usePostMsg = false) {
        if (usePostMsg) {
            this._postMsgToIframe({ 'type': 'showMotionList' })
            return {}
        }
        return this._iframeRef.contentWindow.AVATAR_MANIPULATE_MOTIONS
    }

    setMotion(v, usePostMsg = false) {
        const key = String(v)
        if (usePostMsg) {
            this._postMsgToIframe({
                'type': 'setMotion',
                'motion': key
            })
            return
        }
        if (this._iframeRef.contentWindow.AVATAR_MANIPULATE_MOTIONS.hasOwnProperty(key)) {
            this._iframeRef.contentWindow.AVATAR_MANIPULATE_MOTIONS[key]()
        }else{
            console.log(`Invalid motion key: ${ key }`)
        }
    }

    release(usePostMsg = false) {
        if(usePostMsg){
            this._postMsgToIframe({
                'type': 'release'
            })
        }else{
            this._iframeRef.contentWindow.AVATAR_RELEASE_FUNC()
        }
        // this._divRef.hidden=true
    }

    getModelList( usePostMsg = false ){
        if(usePostMsg){
            this._postMsgToIframe({
                'type': 'showModelList'
            })
            return []
        }
        return this._iframeRef.contentWindow.AVATAR_GET_MODEL_LIST()
    }

    _postMsgToIframe(msgDict) {
        if ((typeof msgDict) != 'object') {
            console.log(`Invalid message type: ${typeof msgDict} (The type should be 'object')`)
            return
        }
        this._iframeRef.contentWindow.postMessage(
            JSON.stringify(msgDict),
            AVATAR.iframeDomain
        )
    }

    _createBubble() {
        const aBubble = window.document.createElement('blockquote')
        this._bubble = aBubble

        const BORDER_RADIUS_VALUE = 10
        const PADDING_VALUE = 15
        this.changeBubbleStyle({
            "position": "absolute",
            "padding": `${PADDING_VALUE}px`,
            "margin": "1em 0 3em",
            "color": "#fff",
            "background": "#075698",

            "-webkit-border-radius": `${BORDER_RADIUS_VALUE}px`,
            "-moz-border-radius": `${BORDER_RADIUS_VALUE}px`,
            "border-radius": `${BORDER_RADIUS_VALUE}px`,

            "width": `${this._divWidth}px`,
            "bottom": `${this._divHeight}px`,
            "left": `-${PADDING_VALUE}px`
        })

        const aBubbleArrow = window.document.createElement('div')
        this._bubbleArrow = aBubbleArrow

        const BUBBLE_ARROW_SIZE = 25
        this.changeBubbleArrorStyle({
            "position": "absolute",
            "border-width": `${BUBBLE_ARROW_SIZE}px 0 0 ${BUBBLE_ARROW_SIZE}px`,
            "border-style": "solid",
            "border-color": "#075698 transparent",

            "display": "block",
            "width": "0",

            "left": `${Math.floor(this._divWidth / 3)}px`,
            "bottom": `-${BUBBLE_ARROW_SIZE}px`
        })

        this._bubbleText = window.document.createElement('div')

        this._bubble.hidden = true

        this._divRef.appendChild(this._bubble)
        this._bubble.appendChild(this._bubbleText)
        this._bubble.appendChild(this._bubbleArrow)
    }

}
