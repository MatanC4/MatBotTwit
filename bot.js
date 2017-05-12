
var twit = require("twit");
var config = require("./config.js");
var Twitter = new twit(config);
var giphy = require('giphy-api')('dc6zaTOxFJmzC');

console.log("server is up" );


var giphyQueryArr = ['amazing', 'goal', 'yay', 'unbelievable', 'party', 'OMG', 'dancing', 'mother of god'];

var followFilter = {
    follow: ['762099717283119105']  //@goals_ninja twitter handle
};

var followStream = Twitter.stream('statuses/filter', followFilter); //public stream

followStream.on('tweet', function (tweet) {
    if ((tweet.text.includes("scores") || /[gG][oO]+[aA]+[lL]+/.test(tweet.text)) && !tweet.text.includes("RT")) {
        giphy.search(giphyQueryArr[getRandomInt(0, searchPhrases.length - 1)], function (err, res) {
            tweetNow(tweet.text + "\n" + res.data[getRandomInt(0, 9)].bitly_gif_url); //Returns a total of 25 gifs, returning a random one out of the first 10
        });
    }
});

function tweetNow(tweetTxt) {
    var tweet = {
        status: tweetTxt
    };


    Twitter.post('statuses/update', tweet, function (err, data, response) {
        if (err) {
            console.log("Error in tweeting: " + err.text);
        } else {
            console.log("Tweeted successfully: " + tweetTxt);
        }
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

followStream.on('limit', function (limitMessage) {
    console.log(limitMessage);
});

followStream.on('disconnect', function (disconnectMessage) {
    console.log(disconnectMessage);
});

followStream.on('reconnect', function (request, response, connectInterval) {
    console.log('Reconnecting in ' + connectInterval + 'ms...');
});

followStream.on('error', function (error) {
    console.log(error);
});
