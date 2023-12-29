/**
 * @author <dutianhe@ruubypay.com>
 * @date 2023-03-30 11:34:07
 * @description 常用工具类
 * @module
 * @return
 */
import RPJSBridge from "./RPJSBridge";
import {compareVersions} from "compare-versions";
import {DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform, Text} from "react-native";


/** 获取广告信息 **/
let ADParams = null;
export const getADParams = async () => {
    return ADParams || await RPJSBridge.getADParams().then(res => {
        ADParams = res;
        return ADParams;
    }).catch(() => ({geo: {}, device: {}}));
}


/** 获取UA信息 **/
let userAgent = null;
export const getUserAgent = async () => {
    return userAgent || await RPJSBridge.getUserAgent().then(res => {
        userAgent = res.userAgent;
        return userAgent;
    }).catch(() => (""));
}


/** 获取设备信息 **/
let deviceInfo = null;
export const getDeviceInfo = async (data) => {
    return deviceInfo || await RPJSBridge.getDeviceInfo(data).then(res => {
        deviceInfo = res;
        return deviceInfo;
    }).catch(() => (null));
}

/** 获取userId 信息 **/
let userId = null;
export const getUserId = async () => {
    console.log("getUserId");
    return userId || await RPJSBridge.getUserId().then(res => {
        return res.userId;
    }).catch(() => (null));
}

/** 登录  **/
export const goLogin = async () => {
    return userId || await RPJSBridge.goLogin().then(res => {
        return res.userId;
    }).catch(() => (null));
}

/**
 * 清空userId
 * **/
export const ClearUserId = () => {
    userId = null;
}

/** 获取位置 信息 **/
let location = null;
export const getLocation = async () => {
    return location || await RPJSBridge.getLocation().then(res => {
        location = res;
        return location;
    }).catch(() => (null));
}

/** 转换首字符大小写 **/
export function titleCase(str) {
    if (!Boolean(str)) return str;
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}


/** 32位字符串 **/
export function getRandom() {

    var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],

        num = "";

    for (var i = 0; i < 32; i++) {

        num += arr[parseInt(Math.random() * 36)];

    }

    return num.toLowerCase();
    ;

}

/** 包装广告参数 **/
export const getPackADParam = async () => {
    try {
        // let { userAgent } = await RPJSBridge.getUserAgent();
        const {device, geo} = await getADParams();
        const myDeviceInfo = await getDeviceInfo({items: ['deviceBrand']});
        const imeimd5 = device.imeimd5 || getRandom()
        return {
            imei: imeimd5,
            imeiori: imeimd5,
            macori: device.macplain || '',
            idfa: '',
            idfaori: device.ifa || '',
            anid: device.aidmd5 || getRandom(),
            anidori: device.aidplain || '',
            brand: device.make || '',
            platform: device.model || '',
            os: device.os || '',
            os_version: device.osv || '',
            device_size: device.w && device.h ? `${device.w}*${device.h}` : '',
            operator: device.operator || '',
            longitude: geo.lon || '',
            latitude: geo.lat || '',
            geoPosition: (geo && geo.lon && geo.lat) ? [geo.lon, geo.lat].join(',') : '',
            screen_orientation: 0,
            ip: device.ip || '',
            // appVersion:Boolean(myDeviceInfo) ? myDeviceInfo.appVersion : "",
            // deviceModel:Boolean(myDeviceInfo) ? myDeviceInfo.deviceModel : "",
            deviceModel: Boolean(myDeviceInfo) ? titleCase(myDeviceInfo.deviceBrand) : "",
            // ua: userAgent,
            density: '',
            imsi: '',
        };
    } catch (e) {
        console.log(e);
        return {};
    }

};

/**
 *  获取当前亿通行版本号
 * */
let appVersion = null;
export const getCurrentVersion = async () => {
    return appVersion || await RPJSBridge.getAppVersion().then(res => {
        return res.version
    }).catch((e) => {
        // RPJSBridge.getAppVersion 客户端5.1.9支持
        console.log('获取当前亿通行版本号错误', e)
    });
}

/**
 * 比较版本号
 * @param {String} targetVersion 需要比较的版本号
 * @return {Number} 结果 -1:当前版本号小； 0：当前版本号相等； 1：当前版本号大；
 */

export const compareAppVersion = async (targetVersion) => {
    try {
        let currentVersion = await getCurrentVersion()
        return compareVersions(currentVersion, targetVersion)
    } catch (e) {
        console.log('比较版本号失败', e)
        return Promise.reject(e)
    }
}


export const RPopen = async ({url, type, needLogin, navigationBarHidden}) => {
    let myUrl = url;
    if (Boolean(url) && url.indexOf("$longitude") > 0 && url.indexOf("$latitude") > 0) {
        //经纬度变量值替换替换
        try {
            const {longitude, latitude, errorCode} = await getLocation();
            if (!errorCode && (longitude && latitude)) {
                myUrl = myUrl.replace("$longitude", longitude + '');
                myUrl = myUrl.replace("$latitude", latitude + '');
            } else {
                myUrl = myUrl.replace("$longitude", 0 + '');
                myUrl = myUrl.replace("$latitude", 0 + '');
            }
        } catch (e) {
            myUrl = myUrl.replace("$longitude", 0 + '');
            myUrl = myUrl.replace("$latitude", 0 + '');
        }
    }
    console.log("myUrl", myUrl);

    let param = {
        type: type || 'web'
    };
    if(Boolean(navigationBarHidden)) param['navigationBarHidden'] = true;
     RPJSBridge.open({
        url: myUrl,
        param
    })
}


/**
 * @author <dutianhe@ruubypay.com>
 * @date 2023-07-14 18:06:03
 * @description 打开链接前检测是否登录
 * @module
 * @return boolean 是否登录
 */
/**
 *  openTag:判断登录后是否需要打开点击页面，不传默认为false，即不需要打开
 *  **/
export const AutoLoginAndOpen = async ({
                                           url,
                                           type = 'web',
                                           openTag = true,
                                           needLogin = true,
                                           navigationBarHidden = false
                                       }) => {
    console.log(url, type, openTag)
    try {
        if (needLogin) {
            let userId = await getUserId();
            console.log('获取到了userId---》', userId)
            if (!Boolean(userId)) {
                userId = await goLogin();
                if (!userId) {
                    //用户取消了登录
                    return false;
                }
            }
        }


        if (Boolean(url)) {
            await RPopen({
                url, type, navigationBarHidden
            })
        }
        return true;
    } catch (e) {
        return false;
    }
}
/**
 * @author <malixia@ruubypay.com>
 * @date 2023-07-17 15:18:35
 * @description 打开链接前检测用户是否登录，没有登录---登录不跳转；登录---跳转
 * @module
 * @return
 */

export const beforeOpenLink = async ({url, type = 'web'}) => {
    try {
        let userId = await getUserId();
        console.log('获取到了userId---》', userId)
        if (!Boolean(userId)) {
            userId = await goLogin();
            if (!userId) {
                //用户取消了登录
                return false;
            }
        } else {
            await RPopen({
                url, type,
            })
        }

    } catch (e) {
        return false;
    }
}
/**
 * @author <dutianhe@ruubypay.com>
 * @date 2023-07-14 18:27:45
 * @description  添加原生事件监听
 * @module
 * @return null
 */
export const addAppListener = (eventName, callBack) => {
    if (Platform.OS === 'android') {
        DeviceEventEmitter.addListener(eventName, (message) => {

            if (callBack) callBack(message)
        });
    } else {
        const {ruubypayManager} = NativeModules;
        const ruubypayManagerEmitter = new NativeEventEmitter(ruubypayManager);
        ruubypayManagerEmitter.addListener(
            eventName,
            (message) => {

                if (callBack) callBack(message)
            }
        );
    }

}


export const emitAppListener = (eventName, params) => {
    if (Platform.OS === 'android') {
        DeviceEventEmitter.emit(eventName, params)
    } else {
        const {ruubypayManager} = NativeModules;
        const ruubypayManagerEmitter = new NativeEventEmitter(ruubypayManager);
        ruubypayManagerEmitter.emit(eventName, params);
    }

}

/** 判断所选时间(或者当前时间)是否在规定时间内 **/
export const timeRange = (beginTime, endTime) => {
    let strb = beginTime.split(":");
    if (strb.length != 2) {
        return false;
    }

    let stre = endTime.split(":");
    if (stre.length != 2) {
        return false;
    }

    let b = new Date();
    let e = new Date();
    let n = new Date();

    b.setHours(strb[0]);
    b.setMinutes(strb[1]);
    e.setHours(stre[0]);
    e.setMinutes(stre[1]);

    if (n.getTime() - b.getTime() >= 0 && n.getTime() - e.getTime() < 0) {
        return true;
    } else {
        return false;
    }
}


/** 禁止字体缩放 **/
export const allowFontScaling = () => {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
}
/** 获取定位权限 **/

export const getApplyLocationPer = () => {
    return RPJSBridge.applyLocationPer().then((res) => {
        if (res.errorCod) return null
        return res

    })
}
/**
 * 获取最近的站点信息
 * **/
export const getStartStation = () => {
    return RPJSBridge.getNearbyStation().then(res => {
        return res
    })

}
/**
 * @author <malixia@ruubypay.com>
 * @date 2023-08-01 14:28:42
 * @description 获取消息返回时间戳处理逻辑：
 * @module
 * @return
 */
export const TimeComparison = (backTime) => {
    if(backTime===0 || !Boolean(backTime)) return ''
    const nowTime = Math.floor(Date.now() / 1000);
    const backDate = new Date(backTime * 1000);
    const nowDate = new Date(nowTime * 1000);
   return  getTimeDiff(backDate,nowDate)
}
/** 判断返回时间是否处于昨天 **/
export const isYesterday = (backDate, nowDate) => {
    const yesterday = new Date(nowDate);
    yesterday.setDate(nowDate.getDate() - 1);
    return backDate.toDateString() === yesterday.toDateString();
}

/** 时间戳逻辑处理  **/
export const getTimeDiff = (backDate, nowDate) => {
    const diffInSeconds = (nowDate - backDate) / 1000;
    if (diffInSeconds < 60) {
        return "刚刚";
    } else if (diffInSeconds < 60 * 60) {
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        return `${diffInMinutes}分钟前`;
    } else if (backDate.toDateString() === nowDate.toDateString()) {
        const diffInHours = Math.floor(diffInSeconds / 3600);
        return `${diffInHours}小时前`;
    } else if (isYesterday(backDate, nowDate)) {
        return "昨天";
    } else if (backDate.getFullYear() === nowDate.getFullYear()) {
        const month = backDate.getMonth() + 1;
        const day = backDate.getDate();
        return `${month}月${day}日`;
    } else {
        const year = backDate.getFullYear();
        const month = backDate.getMonth() + 1;
        const day = backDate.getDate();
        return `${year}年${month}月${day}日`;
    }
}
