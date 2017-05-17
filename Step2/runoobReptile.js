const request = require("request");
const fs = require("fs");
const URLDIR = "./runoob/";

var mainUrl = require("./config/url.js");
// var mainUrl = {}
var doingUrl = mainUrl;
// console.log(mainUrl);
var reqOption = {
    url: "www.maxmon.top",
    gzip: true
}

// 第一步 抓取主页
// request.get(reqOption, function(err, res, body){
//     console.log(err)
//     console.log(res)//.request.uri.href);
//     fs.writeFileSync("res.txt",JSON.stringify(res));
//     // fs.writeFileSync(__dirname + "/runoob/test.html", res + body);
// })

// 第二步 获取主页中的网页
// var c = "module.exports = {\r\n"
// fs.readFile("./runoob/test.html", function (err, file) {
//     file = file.toString();
//     var b = file.match(/(?:(href\=\"){1})(.*?\.html)\"/g);
//     b.forEach(function (url) {
//         url = url.replace(/((\"http)|(href)|[:="]|(\/\/))+/g, "").replace(/^[^w]/g, "www.runoob.com/").replace(/^www/g,"http://www");
//         console.log(url);
//         mainUrl[url] = "ready";
//     }, this);
//     for (var key in mainUrl) {
//         if (mainUrl.hasOwnProperty(key)) {
//             var element = mainUrl[key];
//             c += "\"" + key + "\": \"ready\",\r\n";
//         }
//     }
//     c += '}';
//     fs.writeFileSync("./config/url.js", c);
// })
var supCount = 0;
// while (supCount < 100){//doingUrl != undefined){// && supCount < 10) {
//     supCount++
// for (var key in doingUrl) {
//     // delete doingUrl[key];
//     if (doingUrl.hasOwnProperty(key)) {
//         var element = doingUrl[key];
//         var reqOption = {
//             url: key,
//             gzip: true
//         }
//         console.log(1)
//         request.get(reqOption, function (err, res, body) {
//             console.log(2)
//             // console.log(body);
//             if (err) {
//                 console.error(err)
//             } else {
//                 var currentUrl = res.request.uri.href;
//                 // fs.writeFileSync(__dirname + "/runoob/" + currentUrl.replace(/[\\\/]/g, "a"), res + body);
//                 writeFile(currentUrl, body)
//                 var newUrlDic = {};
//                 body = body.toString();
//                 var b = body.match(/(?:(href\=\"){1})(.*?\.html)\"/g);
//                 b.forEach(function (url) {
//                     url = url.replace(/((\"http)|(href)|[:="]|(\/\/))+/g, "").replace(/^[^w]/g, "www.runoob.com/").replace(/^www/g, "http://www");
//                     // console.log(url);
//                     newUrlDic[url] = "ready";
//                 }, this);
//                 for (var key in newUrlDic) {
//                     if (newUrlDic.hasOwnProperty(key)) {
//                         if (!mainUrl[key]) {
//                             mainUrl[key] = "ready";
//                             doingUrl[key] = "ready";
//                         }
//                     }
//                 }
//             }
//         })
//     }
// }

// }

process.stdin.read()

function writeFile(url, file) {
    var downUrl = url || "http://www.runoob.com/ags/html-reference.html";
    var addressList = downUrl.replace("http://www.runoob.com/", "").split("\/");
    var addressStr = URLDIR;
    addressStr = addressStr + "\/" + addressList[0];
    for (var i = 1; i < addressList.length; i++) {
        if (!fs.existsSync(addressStr)) {
            fs.mkdirSync(addressStr);
        }
        addressStr = addressStr + "\/" + addressList[i];
    }
    fs.writeFileSync(addressStr, file)
}

function readDir(address) {
    var path = address || URLDIR;
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                readDir(curPath);
            } else { // read file
                
            }
        });
    }
}

// 删除所有文件和文件夹 //global.deleteFolder 全局可调用
var deleteFolder = module.exports.deleteFolder= function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};



readDir();