require("dotenv").config();

//connect twitter and spotify keys
var keys = require("./keys.js");

var request = require("request");

var fs = require("fs");

var userRequest = process.argv[2];

var Twitter = require("Twitter");
var Spotify = require('node-spotify-api');


var spotify = new Spotify(keys.spotify);

var client = new Twitter

switch (userRequest) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;
}

function myTweets() {
    var params = {screen_name: 'Peter J'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
      }
    });
}

function spotifyThisSong() {
    spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
     
    });
}

