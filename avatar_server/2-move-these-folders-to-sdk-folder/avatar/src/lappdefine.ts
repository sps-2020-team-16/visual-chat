/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LogLevel } from '@framework/live2dcubismframework';

/**
 * Sample Appで使用する定数
 */
// 画面
export const ViewMaxScale = 2.0;
export const ViewMinScale = 0.8;

export const ViewLogicalLeft = -1.0;
export const ViewLogicalRight = 1.0;

export const ViewLogicalMaxLeft = -2.0;
export const ViewLogicalMaxRight = 2.0;
export const ViewLogicalMaxBottom = -2.0;
export const ViewLogicalMaxTop = 2.0;

// 相対パス
export const ResourcesPath = '../../Resources/';

// モデルの後ろにある背景の画像ファイル
export const BackImageName = 'back_class_normal.png';
// export const BackImageName = '';

// 歯車
export const GearImageName = 'icon_gear.png';

// 終了ボタン
export const PowerImageName = 'CloseNormal.png';


////////////////////////////////////////////
// EXTRA CHANGES HERE:
////////////////////////////////////////////
// CLOSE_RANDOM_MOTION
////////////////////////////////////////////

// // モデル定義---------------------------------------------
// // モデルを配置したディレクトリ名の配列
// // ディレクトリ名とmodel3.jsonの名前を一致させておくこと
// // export const ModelDir: string[] = ['Haru', 'Hiyori', 'Mark', 'Natori', 'Rice'];
// export const ModelDir: string[] = ['Mark', 'Haru', 'Hiyori', 'Natori', 'Rice'];
// export const ModelDirSize: number = ModelDir.length;

export let ModelDir: string[] = ['Haru', 'Hiyori', 'Mark', 'Natori', 'Rice'];
export let ModelDirSize: number = ModelDir.length;
export const pushFrontModelName = ( v: string ) => {
    let newModelDir: string[] = [ v ].concat( ModelDir );
    ModelDir = newModelDir
    ModelDirSize = ModelDir.length;
}
export const getModelList = (): string[] => {
    return ModelDir
}

// 外部定義ファイル（json）と合わせる
export const MotionGroupIdle = 'Idle'; // アイドリング
export const MotionGroupTapBody = 'TapBody'; // 体をタップしたとき

// 外部定義ファイル（json）と合わせる
export const HitAreaNameHead = 'Head';
export const HitAreaNameBody = 'Body';

// モーションの優先度定数
export const PriorityNone = 0;
export const PriorityIdle = 1;
export const PriorityNormal = 2;
export const PriorityForce = 3;

// デバッグ用ログの表示オプション
export const DebugLogEnable = true;
export const DebugTouchLogEnable = false;

// Frameworkから出力するログのレベル設定
export const CubismLoggingLevel: LogLevel = LogLevel.LogLevel_Verbose;

// デフォルトのレンダーターゲットサイズ
// export const RenderTargetWidth = 1900;
// export const RenderTargetHeight = 1000;

export let RenderTargetWidth = 1900;
export let RenderTargetHeight = 1000;

export const setRenderTargetWidth   = ( v: number ): void => {
    RenderTargetWidth = v
}
export const setRenderTargetHeight  = ( v: number ): void => {
    RenderTargetHeight = v
}

export let gearAndBack = true
export const setGearAndBack = ( v: boolean ): void => {
    gearAndBack = v
}

///////////////////////////////////////////////////////////////////////////////////
/////   EXTRA CHANGES HERE
///////////////////////////////////////////////////////////////////////////////////
/////   EXPOSE_GLOBAL_FUNCTIONS
///////////////////////////////////////////////////////////////////////////////////

export const _global = ( window || global ) as any
_global.AVATAR_MANIPULATE_EXPRESSIONS = {}
_global.AVATAR_MANIPULATE_MOTIONS = {}

export let onANewModelLoaded = null
export const setOnANewModelLoaded = ( v ) => {
    onANewModelLoaded = v
}

export let modelMatrixX         = null
export let modelMatrixY         = null
export let modelMatrixWidth     = null
export let modelMatrixHeight    = null
export const setModelMatrix = ( aX , aY , aWidth , aHeight ) => {
    modelMatrixX        = aX
    modelMatrixY        = aY
    modelMatrixWidth    = aWidth
    modelMatrixHeight   = aHeight
}
