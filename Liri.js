/*
TODO:
* Get default routes
*/

//Read and set environment variables
require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");



debugger;
//Global Variables
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var input = process.argv[2];
var argument = "";
var condition = "";
var argumentArray = [];

debugger;

function main(condition, argument) {
    debugger;

    condition = input;
    argument = thirdArgument();

    debugger;

    switch (condition) {
        case "my-tweets":
            tweets();
            break;

        case "spotify-this-song":

            var song = argument;
            debugger

            if (song === "") {
                defaultTrack();
                debugger

            } else {
                spot();
                debugger

            }
            debugger
            break;

        case "movie-this":

            if (argument === "") {
                movieDefault()
            } else {
                movie();
                debugger
            }
            break;

        case "do-what-it-says":
            what();
            debugger;
            break;


        default:
            check();
            break;
    }
}

function tweets() {

    console.log('\n'+"Loading..."+'\n');

    client.get('status/user_timeline', function (error, tweets, response) {
        if (error) throw error;


        for (let index = 0; index < tweets.length; index++) {
            console.log(tweets[index].text);

        }
        // The favorites.
        //console.log(response);  // Raw response object.
    });
}

function spot() {

    console.log('\n'+"Loading..."+'\n');

    spotify.search({ type: 'track', query: argument }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);

        }

        var myArr = data.tracks.items;
        for (let i = 0; i < myArr.length; i++) {
            console.log('\nArtist: ' + myArr[i].artists[0].name + '\n');
            console.log('Track Name: ' + myArr[i].name + '\n');
            console.log('Track Preview: ' + myArr[i].preview_url + '\n');
            console.log('Album: ' + myArr[i].album.name + '\n');
            console.log('----------------------------------------------------------------\n')
            debugger
        }
    });
    debugger

}

function defaultTrack() {

    console.log('\n'+"Loading..."+'\n');

    spotify.search({ type: 'track', query: "The Sign ace of base" }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);

        }

        var defaultTrackArray = data.tracks.items;
        for (let i = 0; i < defaultTrackArray.length; i++) {
            console.log('\nArtist: ' + defaultTrackArray[i].artists[0].name + '\n');
            console.log('Track Name: ' + defaultTrackArray[i].name + '\n');
            console.log('Track Preview: ' + defaultTrackArray[i].preview_url + '\n');
            console.log('Album: ' + defaultTrackArray[i].album.name + '\n');
            console.log('__________________________________________________' + '\n')
            debugger
        }
    });
}

function movie() {

    console.log('\n'+"Loading..."+'\n');

    //Omdi or movies request
    // We then run the request module on a URL with a JSON
    // movies = thirdArgument();

    request("http://www.omdbapi.com/?t=" + argument + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        var rating = JSON.parse(body).Ratings[1];
        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {

            // Then we print out the imdbRating
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(Object.values(rating).join(": "));
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
            debugger
        }
    });
}

function movieDefault() {

    console.log('\n'+"Loading..."+'\n');

    //Omdi or movies request
    // We then run the request module on a URL with a JSON
    // movies = thirdArgument();

    request("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {

        var rating = JSON.parse(body).Ratings[1];
        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {

            // Then we print out the imdbRating
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(Object.values(rating).join(": "));
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
            debugger
        }
    });
}

function what() {



    fs.readFile('random.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {

            var readArray = data.split(",");

            condition = readArray[0];

            argument = readArray[1];

            spot();
        }

    });
}



function thirdArgument() {

    // Stores all possible arguments in array.
    argumentArray = process.argv;

    // Loops through words in node argument.
    for (var i = 3; i < argumentArray.length; i++) {
        argument += argumentArray[i];
    }
    return argument;
}



function check() {

    console.log("Please check the title again!");
}

main();