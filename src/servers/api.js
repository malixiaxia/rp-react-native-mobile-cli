import env from "../env/index.js";

const {REACT_APP_BUSINESS_API, REACT_APP_APP_CONFIG_API,REACT_APP_STATIC_API, REACT_APP_WEB_API,REACT_APP_BASE_API} = env;
export default {

    /** demo **/
    demoApi :`${REACT_APP_BUSINESS_API}/demo`,
}
