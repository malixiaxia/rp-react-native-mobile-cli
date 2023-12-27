/**
 * @author <malixia@ruubypay.com>
 * @date 2023-12-19 18:12:57
 * @description rn 启动本地调试脚本
 * @module
 * @return
 */
const  RNBundleUrlsTOQrCodeView =require("RNBundleUrlsTOQrCodeView")
const path = require("path")
const htmlFilePath = path.join(__dirname, '/src/pages');
//项目运行的版本号，默认为8081
const project_port ='8081'
const send_object={
    send_port :project_port,
    send_path:htmlFilePath
}
const rnBundleUrlsTOQrCodeViewInstance = new RNBundleUrlsTOQrCodeView(JSON.stringify(send_object));