require("dotenv").config();

//connect twitter and spotify keys
var keys = require("./keys.js");

var request = require("request");

var fs = require("fs");

var userRequest = process.argv[2];
var nodeArgs = process.argv;

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
        
    default:
        console.log("I'm sorry, I'm not smart enough.")    
}

function myTweets() {
    var params = {
        screen_name: 'Peter J',
        count: 20
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
          for (var i = 0; i < tweets.length; i++) {
              console.log("Tweet: " + tweets[i].text + " Date posted: " + tweets[i].create_at);
          }
     
      }

      else {
          console.log(error);
      }

    });

}


function spotifyThisSong() {
    var song = process.argv.slice(3);
    if (userRequest === undefined) {
        song = 'the sign';
    };

    spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
        if (err) {
            console.log('Error occured: ' + err);
        }
        else {
            var info = data.tracks.items[0];
            console.log("Song: " + info.name+ "\r\n"
            + " Artist: " + info.artists[0].name+ "\r\n"
            + " Album: " + info.album.name+ "\r\n"
            + " Preview URL: " + info.preview_url);
        };

    });

};    



function movieThis() {
    var movie = process.argv.slice(3);
    if (process.argv[3] === undefined) {
        movie = "Mr. Nobody";
    }
    var queryUrl = `http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`;
    request(queryUrl, function(error, response, body) {
        
          if (!error && response.statusCode === 200) {
            var movieData = JSON.parse(body);
            console.log("Movie Information: " + "\r\n",
            "Title: " + movieData.Title + "\r\n"
            + " Year: " + movieData.Year + "\r\n"
            + " IMDB Rating: " + movieData.imdbRating + "\r\n"
            + " Country: " + movieData.Country + "\r\n"
            + " Language: " + movieData.Language + "\r\n"
            + " Plot: " + movieData.Plot + "\r\n"
            + " Actors: " + movieData.Actors);
          }

          else {
              console.log(error);
          };

        });
    

}

//function doWhatItSays() {
  //  fs.readFile("random.txt", "utf8", function(error, data);
    //if (error) {
      //  return console.log(error);
     // }

    //fs.writeFile to add command to the command line.

//}



