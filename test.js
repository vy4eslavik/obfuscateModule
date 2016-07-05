var obfuscator = require('obfuscator');
var request = require("request");

var url = "https://raw.githubusercontent.com/FrontendSimf20016/obfuscator/master/data.json";
request({
    url: url,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        var resultData = obfuscator(body);
        console.log(body[0]+': '+resultData[body[0]]);
    }
});
