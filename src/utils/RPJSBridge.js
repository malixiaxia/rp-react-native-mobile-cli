/**
 * @author <dutianhe@ruubypay.com>
 * @date 2023-03-30 11:49:48
 * @description 导出 RPJSBridge 模块
 * @module
 * @return
 */

import {NativeModules} from "react-native";

const _JSAPI = {
    checkJSAPI: {},
    alert: {},
    setNavigationBarHidden: {},
    exitBrowser: {},
    getLocation: {},
    toast: {},
    showLoading: {},
    hideLoading: {},
    getPoiList: {},
    getKoubeiCoupons: {},
    applyKoubeiCoupon: {},
    alipayAuth: {},
    getUserId: {},
    goLogin: {},
    setRightButton: {},
    open: {},
    setTitle: {},
    share: {},
    openSystemSetting: {},
    request: {},
    getUserRecentMessages: {},
    getADParams: {},
    onlineService: {},
    scan: {},
    parameter: {},
    chooseImage: {},
    verifySecurityCode: {},
    tradeWxpay: {},
    tradeAlipay: {},
    getNetworkType: {},
    launchWecahtMiniProgram: {},
    launchWechatBusinessWebview: {},
    goLogout: {},
    goHome: {},
    hasRealNameInfo: {},
    setupRealNameInfo: {},
    getAuthCode: {},
    getOpenId: {},
    finishAuth: {},
    openBaiXinPage: {},
    getDeviceInfo: {},
    tradeJDPay: {},
    saveImage: {},
    faceInput: {},
    tradeCMBPay: {},
    takePhotoOfId: {},
    faceUpdate: {},
    faceUpdateNew: {},
    getUserAgent: {},
    downloadFile: {},
    addPayment: {},
    openTrainCode: {},
    log: {},
    alipayBindAuth: {},
    getAddressBook: {},
    sendMessage: {},
    weexRoute: {},
    callback: {},
    appleShare: {},
    standardDialog: {},
    readOpenNotice: {},
    faceInputNew: {},
    setCurrentCity: {},
    getCurrentCity: {},
    sendBroadcast: {},
    refreshQRCodePage: {},
    bindBankCard: {},
    setIOSwebViewBounce: {},
    getAppVersion: {},
    getNearbyStation:{},
    selectStation:{},
    applyLocationPer:{},
}


/** 导出模块 处理web不存在模块时候 return null **/
export default  NativeModules.rp || (Object.keys(_JSAPI).reduce((pre,key)=>{
    pre[key] = async ()=>{return null};
    return pre;
},{}))
