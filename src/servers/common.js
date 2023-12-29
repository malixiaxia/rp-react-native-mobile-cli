/**
 * @author <dutianhe@ruubypay.com>
 * @date 2023-03-17 17:56:01
 * @description 通用 server 服务
 * @module
 * @return
 */



import {request} from "../utils/Request.js";

import {_storeData} from "../utils/AsyncStorage.js";
import API from "./api"
import {getCityCode, getPackADParam, getUserId,getCurrentVersion} from "../utils/utils"
import {Platform} from 'react-native';
/**
 * 广告获取内容
 */
export const getADContentAPI = async (page,{placeIds,stationName,deviceLocation}) => {
    const adParams = await getPackADParam();
    const userId = await getUserId();
    const cityCode = await getCityCode();
   return request({
        // url:`${API_URL}/Advert/gain`,
        url:API.gain,
        method: "post",
        body: {
            "placeIds": Object.keys(placeIds).toString(),
            "network": "4G",
            "businessType": "01",
            "platformCode": "YTX",
            stationName,
            deviceLocation,
            ...adParams,
            deviceCode:Platform.OS.toUpperCase(),
            userId,
            cityCode

        },
       tokenType:1
    }).then(res=>{
        if (res.resCode === "0000"){
            let {resData} = res;
            /**
             * 置换key
             */
            let newData = {};
            let cacheData = {};
            for (let key in resData){
                //设置新请求数据
                newData[placeIds[key]] = resData[key].reduce((pre,item)=>{
                    pre.push({
                        ...item,
                        cache:0
                    })
                    return pre;
                },[])
                // //设置缓存数据
                cacheData[placeIds[key]] = resData[key].reduce((pre,item)=>{
                    pre.push({
                        ...item,
                        cache:1
                    })
                    return pre;
                },[])
            }
            // page 为空字符串 不缓存数据
          page !== '' &&  _storeData(page,cacheData);
            console.log("newData",newData);
            console.log("cacheData",cacheData);
            return newData;
        }else{
            console.log('~~~~~~~~~~~~~~~~~~',res)
           return null;
        }
   })
}

/** 请求IOS审核版本 json文件 **/
let IOSiSaudit = null;
export const getIOSauditJSON = async () => {
    try {
        if (IOSiSaudit != null){
            return IOSiSaudit;
        }
        let versionJSON = await request({
            url:API.IOSauditJSON,
            method: "get",
        },true);
        versionJSON = typeof versionJSON === 'string' ? JSON.parse(versionJSON) : versionJSON;
        const appVersion = await getCurrentVersion();
        IOSiSaudit = versionJSON.version == appVersion;
        return IOSiSaudit;
    }catch (e) {
        return false;
    }

}
