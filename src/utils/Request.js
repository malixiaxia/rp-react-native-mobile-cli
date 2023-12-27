/**
 * @author <dutianhe@ruubypay.com>
 * @date 2023-03-17 17:35:10
 * @description  网络请求模块
 * @module
 * @return
 */
import RPJSBridge from "./RPJSBridge"
import {NativeModules} from "react-native";
export async function fetchRequest({url,method,body,headers}){
    try {
        // 注意这里的await语句，其所在的函数必须有async关键字声明
        const  response = await fetch(
            url,
            {
                "body":JSON.stringify(body),
                "method":method,
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
                    ...headers
                }
            }
        );
        return  await response.json();
    } catch (error) {
        console.error(error);
    }
}


export async function request({url,method,body,headers,tokenType},useFetch) {
    try {


        if (!NativeModules.rp || useFetch){
            return  await fetchRequest({url,method,body,headers});
        }else{
            console.log("RPJSBridge.request",RPJSBridge.request)
            return await RPJSBridge.request({
                url,
                method, //支持 GET POST
                tokenType : tokenType || 2, // 0不添加公共参数, 1默认密钥计算mac, 2用户密钥计算mac
                arguments : body,
            })
        }

    } catch (error) {
        console.error(error);
    }
}

