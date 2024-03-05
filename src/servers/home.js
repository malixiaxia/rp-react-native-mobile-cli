/**
 * @author <malixia@ruubypay.com>
 * @date 2023-12-27 10:45:57
 * @description  servers demo
 * @module
 * @return
 */
import {request} from "@/utils/Request.js";
import API from "./api"
export const demo = async (data) => {
    //获取
    return request({
        url: API.demoApi,
        method: "post",
        body: {
           ...data
        },
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    }).then(res => {

        //您的操作
    })
}