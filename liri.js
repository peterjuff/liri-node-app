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
    
    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;    
}

function myTweets() {
    var params = {screen_name: 'Peter J'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (error) {
        console.log("Error" + JSON.stringify());
        console.log(response);
      }
    });
}
//console.log(tweets);
//Errorundefined
//regenerated access tokens

function spotifyThisSong() {
    var song = process.argv.slice(3);
    spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }

        else {
            //console.log(data.tracks.items);
            console.log("Artist: " + data.tracks.album);


        }

        if (process.argv.slice(3) === null || undefined) {
            console.log(song = "The Sign");
        }
     
    });
}

function movieThis() {
    var movie = process.argv.slice(3);
    var queryUrl = `http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`;
    request(queryUrl, function(error, response, body) {
        
          
          if (!error && response.statusCode === 200) {
            var movieData = JSON.parse(body);
            console.log("Release Year: " + movieData.Year);
            console.log("Movie Title: " + movieData.Title);
            console.log("Year: " + movieData.Year);
            console.log("IMDB Rating: " + movieData.imbdRating);
            console.log("Country: " + movieData.Country);
            console.log("Language: " + movieData.Language);
            console.log("Plot: " + movieData.Plot);
            console.log("Actors: " + movieData.Actors);
          }
          if (movie === null || undefined) {
              console.log(movie = "Mr. Nobody");
          }
        });
    

}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data)
    if (error) {
        return console.log(error);
      }

    //fs.writeFile to add command to the command line.

}



