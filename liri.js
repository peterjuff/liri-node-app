require("dotenv").config();

var keys = require("./keys.js");

var request = require("request");

var fs = require("fs");

var userRequest = process.argv[2];

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
