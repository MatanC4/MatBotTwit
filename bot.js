
var twit = require("twit");
var config = require("./config.js");
var Twitter = new twit(config);


var retweet = function() {
    var params = {
        q: '#nodejs, #Nodejs',
        result_type: 'recent',
        lang: 'en'
    }
}

