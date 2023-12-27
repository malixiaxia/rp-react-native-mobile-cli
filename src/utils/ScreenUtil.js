/**
 * @author <dutianhe@ruubypay.com>
 * @date 2023-03-13 18:13:56
 * @description  屏幕工具类 以及一些常用的工具类封装 width:750px
 * @module
 * @return
 */
import {
    PixelRatio,
    Dimensions,
    Platform,
    StyleSheet
} from 'react-native';

export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
const fontScale = PixelRatio.getFontScale();
export let pixelRatio = PixelRatio.get();
//像素密度
export const DEFAULT_DENSITY = 2;
//px转换成dp
let defaultWidth = 750;
let defaultHeight = 1624;
const w2 = defaultWidth / DEFAULT_DENSITY;
//px转换成dp
const h2 = defaultHeight / DEFAULT_DENSITY;

//缩放比例
const _scaleWidth = screenW / defaultWidth;
const _scaleHeight = screenH / defaultHeight;

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

/**
 * 屏幕适配,缩放size , 默认根据宽度适配，纵向也可以使用此方法
 * 横向的尺寸直接使用此方法
 * 如：width ,paddingHorizontal ,paddingLeft ,paddingRight ,marginHorizontal ,marginLeft ,marginRight
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function scaleSize(size: number) {
    return size * _scaleWidth;
}

/**
 * 屏幕适配 , 纵向的尺寸使用此方法应该会更趋近于设计稿
 * 如：height ,paddingVertical ,paddingTop ,paddingBottom ,marginVertical ,marginTop ,marginBottom
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function scaleHeight(size: number) {
    return size * _scaleHeight;
}

/* 最初版本尺寸适配方案 也许你会更喜欢这个
export function scaleSize(size: Number) {
    let scaleWidth = screenW / w2;
    let scaleHeight = screenH / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));
    return size / DEFAULT_DENSITY;
}*/

/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px , allowFontScaling 是否根据设备文字缩放比例调整，默认不会
 * @returns {Number} 返回实际sp
 */
function setSpText(size: number, allowFontScaling = false) {
    const scale = Math.min(_scaleWidth, _scaleHeight);
    const fontSize = allowFontScaling ? fontScale: 1;
    return size * scale / fontSize;
}

export function setSpText2(size: number) {
    let scaleWidth = screenW / w2;
    let scaleHeight = screenH / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));

    return size / DEFAULT_DENSITY * fontScale;
}

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
            (screenH === X_WIDTH && screenW === X_HEIGHT))
    )
}

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */
export function ifIphoneX(iphoneXStyle, iosStyle = {}, androidStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    } else if (Platform.OS === 'ios') {
        return iosStyle
    } else {
        if (androidStyle) return androidStyle;
        return iosStyle
    }
}


/**
 * 判断对象，数组，字符串是否为空
 * @param str  (null|undefined|''|'   '|[]|{}) 均判断为空，返回true
 * @returns {boolean}
 */
export function isEmpty(str) {
    if (!str) {
        return true;
    } else if (typeof str === 'object' && Object.keys(str).length === 0) {
        return true;
    } else if (str.replace(/(^\s*)|(\s*$)/g, "").length === 0) {
        return true;
    }
    return false;
}



/** 只有匹配到以下样式时候才会转换 **/
const scaleSizeStyleName = [
    'width' ,
    'paddingHorizontal',
    'paddingLeft',
    'paddingRight',
    'marginHorizontal',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'marginLeft' ,
    'marginRight'
]

const scaleHeightStyleName = [
    'height' ,
    'paddingVertical',
    'paddingTop',
    'paddingBottom',
    'marginVertical',
    'marginTop',
    'marginBottom'
]

const setSpTextStyleName = [
    'fontSize' ,
]

/**
 * @author <dutianhe@ruubypay.com>
 * @date 2023-03-13 18:43:11
 * @description 重写 StyleSheet.create
 * @module styles 样式表
 * @module myDefaultWidth 默认高度 2000
 * @module myDefaultHeight 默认高度 750
 * @return
 */
export const RPStyleSheet= {
    ...StyleSheet,
    create:(styles,defaultScreen)=>{
        if (Boolean(defaultScreen)){
            const {myDefaultWidth,myDefaultHeight} = defaultScreen;
            defaultWidth != myDefaultWidth ? defaultWidth = myDefaultWidth : '';
            defaultHeight != myDefaultHeight ? defaultHeight = myDefaultHeight : '';
        }

        Object.keys(styles).map(className=>{
            Object.keys(styles[className]).map(styleName=>{
                if (typeof styles[className][styleName] === "number"){
                    if(scaleSizeStyleName.includes(styleName)){
                        styles[className][styleName] = scaleSize(styles[className][styleName])
                    }else if(scaleHeightStyleName.includes(styleName)){
                        styles[className][styleName] = scaleHeight(styles[className][styleName])
                    }else if(setSpTextStyleName.includes(styleName)){
                        styles[className][styleName] = setSpText(styles[className][styleName])
                    }
                }

            })
        })
        return StyleSheet.create(styles);
    }
}
