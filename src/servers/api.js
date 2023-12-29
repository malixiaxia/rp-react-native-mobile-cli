import env from "../env/index.js";

const {REACT_APP_BUSINESS_API, REACT_APP_APP_CONFIG_API,REACT_APP_STATIC_API, REACT_APP_WEB_API,REACT_APP_BASE_API} = env;
export default {

    /** demo **/
    demoApi :`${REACT_APP_BUSINESS_API}/demo`,

    //常用API
    /** CPM上报曝光 **/
    ReportCPM: `${REACT_APP_BASE_API}/Advert/reportAdvert`,
    /** 投放接口 **/
    gain: `${REACT_APP_BASE_API}/Advert/gain`,
    /** IOS审核版本 **/
    IOSauditJSON: `${REACT_APP_STATIC_API}/show/version-info.json`,



}
