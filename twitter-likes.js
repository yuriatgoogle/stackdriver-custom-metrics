//Twitter credentials in separate config file
var twitterCreds = require('./twitterCreds.json');

//twitter setup
var Twit = require('twit');
var T = new Twit(twitterCreds);

//twitter parameters
var params = {
    screen_name: 'yurigrinshteyn'
}

var stream = T.stream('statuses/filter', params)

//start streaming tweets in
stream.on('favorite', function (event) {
    console.log("got tweet! " + event)
})