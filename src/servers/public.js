/**
 * @author <liuyi@ruubypay.com>
 * @date 2023/7/17
 * @description 公共请求
 * @param
 * @return
 */
import {request,fetchRequest} from "../utils/Request.js";
import API from "./api"

//上报CPM
export const requestReportAdvert = async (data) => {
  return fetchRequest({
    url: API.ReportCPM,
    method: "post",
    body: {
      reqData: {
        adverts:data
      }
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then(res => {
    console.log('上报CPM成功~~~~~~~~~', res)
  }).catch(err=>{
    console.log('上报CPM错误~~~~~~~~~',err)
    return Promise.reject(err)
  })
}

