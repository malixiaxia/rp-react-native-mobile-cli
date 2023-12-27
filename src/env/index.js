
import envDebug from "./debug";
import envTest from "./test";
import envRelease from "./release";

let env = envRelease;
if (process.env['REACT_APP_ENV'] === "debug"){
    env = envDebug;
}else if (process.env['REACT_APP_ENV'] === "test"){
    env = envTest;
}else if (process.env['REACT_APP_ENV'] === "release"){
    env = envRelease;
}
console.log("当前环境：",process.env['REACT_APP_ENV'])
export default env;
