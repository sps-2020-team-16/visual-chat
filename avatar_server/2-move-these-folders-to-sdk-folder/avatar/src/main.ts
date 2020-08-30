/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LAppDelegate } from './lappdelegate';
import {
  _global,
  setRenderTargetHeight,
  setRenderTargetWidth,
  setGearAndBack,
  pushFrontModelName,
  getModelList,
  setOnANewModelLoaded,
  setModelMatrix
} from './lappdefine'


let callbackMsg = null

let dictAfterLoading = {}
const afterLoadingANewModel = ()=>{
    for (let ele in dictAfterLoading){
        dictAfterLoading[ ele ]();
    }
}
setOnANewModelLoaded( afterLoadingANewModel );

dictAfterLoading[ 'sendCallbackMsg' ] = ()=>{
  
  if ( ( callbackMsg != null ) && ( !( window === parent ) ) ){
      parent.postMessage(
          String( callbackMsg ),
          "*"
      )
  }

}

const handleArgs = () => {

  const url = new URL(window.document.location.href);

  if (url.searchParams.has('height')) {
    const canvasHeight: number = parseInt(url.searchParams.get('height')) || 1000;
    setRenderTargetHeight(canvasHeight);
  }

  if (url.searchParams.has('width')) {
    const canvasWidth: number = parseInt(url.searchParams.get('width')) || 1900;
    setRenderTargetWidth(canvasWidth);
  }

  if (url.searchParams.has('avatar')) {
    const argAvatar: string = url.searchParams.get('avatar');
    pushFrontModelName(argAvatar)
  }

  const argGearAndBack: string = url.searchParams.get('GearAndBack'.toLowerCase()) || 'true';
  const gearAndBack: boolean = (String(argGearAndBack).toLowerCase() == 'true');
  setGearAndBack(gearAndBack);

  const argButtons: string = url.searchParams.get('buttons') || 'true';
  if (String(argButtons).toLowerCase() == 'true') {
    // setOnANewModelLoaded(renderButtons)
    dictAfterLoading[ 'renderButtons' ] = renderButtons;
  }

  const argModelMatrixX: number       = parseFloat( url.searchParams.get( 'matrixX'.toLowerCase()       ) ) || null;
  const argModelMatrixY: number       = parseFloat( url.searchParams.get( 'matrixY'.toLowerCase()       ) ) || null;
  const argModelMatrixWidth: number   = parseFloat( url.searchParams.get( 'matrixWidth'.toLowerCase()   ) ) || null;
  const argModelMatrixHeight: number  = parseFloat( url.searchParams.get( 'matrixHeight'.toLowerCase()  ) ) || null;
  setModelMatrix( argModelMatrixX , argModelMatrixY , argModelMatrixWidth , argModelMatrixHeight );

  if (url.searchParams.has('callbackmsg')) {
    callbackMsg = url.searchParams.get('callbackmsg');
  }

}

const renderButtons = () => {

  let expressionButtons = window.document.getElementById('expressionButtons')
  if (!expressionButtons) {
    expressionButtons = window.document.createElement('div')
    expressionButtons.id = 'expressionButtons'
    window.document.body.appendChild(expressionButtons)
  }
  expressionButtons.innerHTML = ''
  expressionButtons.innerText = 'Expressions:\n'

  for (let key in _global.AVATAR_MANIPULATE_EXPRESSIONS) {
    const keyStr: string = key
    const aButton = window.document.createElement('button')
    aButton.onclick = _global.AVATAR_MANIPULATE_EXPRESSIONS[key]
    aButton.innerText = keyStr
    expressionButtons.appendChild(aButton)
  }

  let motionButtons = window.document.getElementById('motionButtons')
  if (!motionButtons) {
    motionButtons = window.document.createElement('div')
    motionButtons.id = 'motionButtons'
    window.document.body.appendChild(motionButtons)
  }
  motionButtons.innerHTML = ''
  motionButtons.innerText = 'Motions:\n'

  for (let key in _global.AVATAR_MANIPULATE_MOTIONS) {
    const keyStr: string = key
    const aButton = window.document.createElement('button')
    aButton.onclick = _global.AVATAR_MANIPULATE_MOTIONS[key]
    aButton.innerText = keyStr
    motionButtons.appendChild(aButton)
  }

}

///////////////////////////////////////////////////////////////////////////////////
/////   EXTRA CHANGES HERE
///////////////////////////////////////////////////////////////////////////////////
/////   SET_POSTMESSAGE_LISTENER
///////////////////////////////////////////////////////////////////////////////////
window.addEventListener('message', (event) => {

  if( String( event.data ).length <= 0 ){
      return ;
  }

  const rJson = JSON.parse(event.data)
  if (rJson['type'] == 'setExpression') {

    const key = rJson['expression']
    if (key && _global.AVATAR_MANIPULATE_EXPRESSIONS.hasOwnProperty(key)) {
      _global.AVATAR_MANIPULATE_EXPRESSIONS[key]()
    }else{
      console.log(`Invalid expression key: ${ key }`)
    }

  } else if (rJson['type'] == 'setMotion') {

    const key = rJson['motion']
    if (key && _global.AVATAR_MANIPULATE_MOTIONS.hasOwnProperty(key)) {
      _global.AVATAR_MANIPULATE_MOTIONS[key]()
    }else{
      console.log(`Invalid motion key: ${ key }`)
    }

  } else if (rJson['type'] == 'release') {

    // LAppDelegate.releaseInstance()
    _global.AVATAR_RELEASE_FUNC()

  } else if (rJson['type'] == 'showExpressionList') {

    alert(`Expression list will be showed on the console (Please press F12 to check)`)
    console.log(_global.AVATAR_MANIPULATE_EXPRESSIONS)

  } else if (rJson['type'] == 'showMotionList') {

    alert(`Motion list will be showed on the console (Please press F12 to check)`)
    console.log(_global.AVATAR_MANIPULATE_MOTIONS)

  } else if (rJson['type'] == 'showModelList' ) {

    alert(`Model list will be showed on the console (Please press F12 to check)`)
    console.log(getModelList())

  } else {

    alert(`Unknown Message Type: ${rJson['type']}`)
    console.log(event)

  }

}, false)


/**
 * ブラウザロード後の処理
 */
window.onload = (): void => {

  handleArgs()
  _global.AVATAR_RELEASE_FUNC = () => {
    LAppDelegate.releaseInstance()
  }
  _global.AVATAR_GET_MODEL_LIST = getModelList

  // create the application instance
  if (LAppDelegate.getInstance().initialize() == false) {
    return;
  }

  LAppDelegate.getInstance().run();

//   if ( ( callbackMsg != null ) && ( !( window === parent ) ) ){
//       parent.postMessage(
//           String( callbackMsg ),
//           "*"
//       )
//   }

};

/**
 * 終了時の処理
 */
window.onbeforeunload = (): void => LAppDelegate.releaseInstance();
