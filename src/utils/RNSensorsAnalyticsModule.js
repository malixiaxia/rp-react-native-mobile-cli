import {NativeModules, Platform} from 'react-native';
import {requestReportAdvert} from '../servers/public'

export const RNSensorsAnalyticsModule = NativeModules.RNSensorsAnalyticsModule;


// 上报曝光埋点
export const elementExposureNew = (location, item, stationName = '', other = {}) => {
    if (Platform.OS === "web") {
        console.log("神策上报事件-->>elementExposureNew：", location, item, stationName = '', other = {})
        return;
    }
    //如果是小米广告 上报
    if (Boolean(item.impression)) {
        item.impression.map(url => {
            yikongAD.adView(url)
        })
    }
    RNSensorsAnalyticsModule.track('elementExposureNew', {
        page_location: location,
        contentType: item.placeName,
        contentID: item.projectId,
        contentName: item.projectName,
        cache: Boolean(item.cache) ? 1 : 0,
        putName: item.name,
        contentTitle: Boolean(item.title) ? item.title : item.name,
        stationName: Boolean(stationName) ? stationName : null,
        ...other
    });
}


// 上报点击埋点
export const viewcontentDetail = (location, item, stationName = '', other = {}) => {
    if (Platform.OS === "web") {
        console.log("神策上报事件-->>viewcontentDetail：", location, item, stationName = '', other = {})
        return;
    }
    //如果是小米广告 上报
    if (Boolean(item.click)) {
        item.click.map(url => {
            yikongAD.adClick(url)
        })
    }
    RNSensorsAnalyticsModule.track('viewcontentDetail', {
        page_location: location,
        contentType: item.placeName,
        contentID: item.projectId,
        contentName: item.projectName,
        cache: Boolean(item.cache) ? 1 : 0,
        putName: item.name,
        contentTitle: Boolean(item.title) ? item.title : item.name,
        stationName: Boolean(stationName) ? stationName : null,
        ...other
    });

    let adverts = []
    item.id && item.projectId && adverts.push({
        id: item.id,
        projectId: item.projectId
    })
    adverts.length !== 0 && packageRequestReportAdvert(adverts)
}

// 上报页面曝光
export const pageExposure = (location, item, stationName = '', other = {}) => {
    if (Platform.OS === "web") {
        console.log("神策上报事件-->>pageExposure：", location, item, stationName = '', other = {})
        return;
    }
    RNSensorsAnalyticsModule.track('pageExposureNew', {
        page_location: location,
        stationName,
        ...other,
    });
}


// 上报SDK广告曝光
export const elementSDKADExposureNew = (location, item, stationName = '', other = {}) => {
    if (Platform.OS === "web") {
        console.log("神策上报事件-->>elementSDKADExposureNew：", location, item, stationName = '', other = {})
        return;
    }

    //暂停上报 ubix
    if (item.name === "地铁进站反馈页-ubix广告") return;
    RNSensorsAnalyticsModule.track('elementSDKADExposureNew', {
        page_location: location,
        putName: item.name,
        contentTitle: Boolean(item.title) ? item.title : item.name,
        stationName: Boolean(stationName) ? stationName : null,
        ...other
    });

    if (other.FXAdShow === 1) {
        let adverts = []
        item.id && item.projectId && adverts.push({
            id: item.id,
            projectId: item.projectId
        })
        adverts.length !== 0 && packageRequestReportAdvert(adverts)
    }
}


/** SDK广告曝光事件 **/
export const businessSDK = {
    /** 点击报告 **/
    onClick:function (location, item, stationName = '', other = {}){
        if (Platform.OS === "web") {
            console.log("神策上报事件-->>businessSDKOnClick：", location, item, stationName = '', other = {})
            return;
        }
        this.track("businessSDKOnClick", location, item, stationName = '', other = {});
    },


    /** 展示成功 **/
    onSuccess:function (location, item, stationName = '', other = {}) {
        if (Platform.OS === "web") {
            console.log("神策上报事件-->>businessSDKOnSuccess：", location, item, stationName = '', other = {})
            return;
        }
        this.track("businessSDKOnSuccess", location, item, stationName = '', other = {});
    },

    /** 展示成功 安卓 **/
    onAdExposure:function (location, item, stationName = '', other = {}) {
        if (Platform.OS === "web") {
            console.log("神策上报事件-->>businessSDKOnAdExposure：", location, item, stationName = '', other = {})
            return;
        }
        this.track("businessSDKOnAdExposure", location, item, stationName = '', other = {});
    },

    /** 失败 **/
    onFailed:function (location, item, stationName = '', other = {})  {
        if (Platform.OS === "web") {
            console.log("神策上报事件-->>businessSDKOnFailed：", location, item, stationName = '', other = {})
            return;
        }
        this.track("businessSDKOnFailed", location, item, stationName = '', other = {});
    },

    /** RN准备加载 **/
    onRNLoadReady: function(location, item, stationName = '', other = {})  {
        if (Platform.OS === "web") {
            console.log("神策上报事件-->>businessSDKOnRNLoadReady：", location, item, stationName = '', other = {})
            return;
        }
        console.log("神策上报事件-->>businessSDKOnRNLoadReady：", location, item, stationName = '', other = {})
        this.track("businessSDKOnRNLoadReady", location, item, stationName = '', other = {});
    },


    /** 加载完成 **/
    onLoadFinish: function(location, item, stationName = '', other = {})  {
        if (Platform.OS === "web") {
            console.log("神策上报事件-->>businessSDKOnLoadFinish：", location, item, stationName = '', other = {})
            return;
        }
        this.track("businessSDKOnLoadFinish", location, item, stationName = '', other = {});
    },

    /** 点击关闭 **/
    onClosed: function(location, item, stationName = '', other = {}){
        if (Platform.OS === "web") {
            console.log("神策上报事件-->>businessSDKOnClosed：", location, item, stationName = '', other = {})
            return;
        }
        this.track("businessSDKOnClosed", location, item, stationName = '', other = {});
    },


    track:function (trackName, location, item, stationName = '', other = {}) {
        RNSensorsAnalyticsModule.track(trackName, {
            page_location: location,
            putName: item.name,
            contentTitle: Boolean(item.title) ? item.title : item.name,
            stationName: Boolean(stationName) ? stationName : null,
            ...other
        });
    }

}


/** 封装CPM上报曝光 **/
/**
 *  CPM 曝光广告数据
 *  @param params {Array}
 *  @param params.id {Number} 投放ID
 *  @param params.projectId {Number} 项目ID
 * */
export const packageRequestReportAdvert = (data) => {
    requestReportAdvert(data).then(res => {
        console.log('上报CPM成功')
    }).catch(e => {
        console.log('上报CPM错误', e)
    })
}

