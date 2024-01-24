const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const package = require('../package.json');

const args = process.argv.slice(2)
console.log(args[0])


const baseFileurl = [
    // "../target/debug",
    "../target/test",
    "../target/release",
]
const bundleUrl = [
    // "https://static-cs.ruubypay.com",
    "https://static-ft.ruubypay.com",
    "https://static.ruubypay.com",
]
/**
 *  /pages下没添加一个目录名，需要您手动添加fileNames
 *
 * **/
const fileNames = [
    "home",
]
for (const i in baseFileurl) {
    let fileData = []
    for (const fIndex in fileNames) {
        const fName = fileNames[fIndex]
        const buffer = fs.readFileSync(path.join(__dirname, `${baseFileurl[i]}/${package.name}/pages/${fName}.${args[0]}.js`));
        const hash = crypto.createHash('md5');
        hash.update(buffer, 'utf8');
        const md5 = hash.digest('hex');
        const bundleVersion = package.buildVersion || package.version + '.0';
        fileData.push({
            "bundleId": fName,
            "bundleVersion": bundleVersion,
            "bundleUrl": `${bundleUrl[i]}/reactNative/${package.name}-${args[0]}/${package.version}/${bundleVersion}/${fName}.${args[0]}.js?dev=false`,
            "md5": md5,
            "scheme": `yitongxing://page/${fName}`
        })
    }


    fs.writeFile(path.join(__dirname, `${baseFileurl[i]}/${package.name}/deployment.json`), JSON.stringify(fileData, '', ' '), "utf8", (err, data) => {

    })

}

