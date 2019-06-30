//require("dotenv").config();
var dotenv = require("dotenv");
var key = require("./key.js");
var moment = require("moment");
var axios = require("axios");
//var SpotifyWebApi = require('spotify-web-api-node');
var spotify = new Spotify(keys.spotify);

var search = process.argv[2];
var artist = process.argv.slice(3).join(" ");

function liri()
{
    switch(search)
    {
        case "concert-this":
            function concert()
            {
            var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
            
            axios.get(URL).then(function(response)
            {
                var jsonData = response.data[0];
                var info = [
                    "Name of Venue: "+jsonData.venue.name,
                    "Venue Location: "+jsonData.venue.city+", "+jsonData.venue.country,
                    "Date of Event: "+moment(jsonData.datetime).format("MMM Do YYYY")
                ].join("\n\n");
                console.log(info);
            });
            }
            concert();
            break;
        case "spotify-this-song":
                spotify
                .search({ type: 'track', query: 'All the Small Things' })
                .then(function(response) {
                  console.log(response);
                })
                .catch(function(err) {
                  console.log(err);
                });
            break;
        case "movie-this":
            function movie()
            {
                var URL = "http://www.omdbapi.com/?t=" + artist +"&y=&plot=short&apikey=trilogy";
            axios.get(URL).then(function(response)
            {
                var jsonData = response.data;
                var info = [
                    "Title: "+jsonData.Title,
                    "Year: "+jsonData.Year,
                    "IMDB Rating: "+jsonData.imdbRating,
                    "Rotten Tomatoes Rating: "+jsonData.Ratings[1].Source+" Rating: "+jsonData.Ratings[1].Value,
                    "Country: "+jsonData.Country,
                    "Language: "+jsonData.Language,
                    "Plot: "+jsonData.Plot,
                    "Actors: "+jsonData.Actors
                ].join("\n\n")
                console.log(info);
            })
            }
            movie();
            break;
        case "do-what-it-says":
            break;
        default:
            console.log("Invalid! Good-bye");
    }
}

liri();
