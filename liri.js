require('dotenv').config();
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const request = require('request');
const spotify = new Spotify(keys.spotify)
const fs = require("fs");
    
//process.argv command line arguments passed when the Node.js process was launches node liri.js
const input = process.argv;

// input [2] is the UserChoice/command the user enters in the terminal.
// spotify-this-song // movie-this // concert-this

const userChoice =input[2];
// input[3] is the 3rd argument the user enters in the terminal/name of song/name of movie/name of the artist/band
const songName = input[3];

for(let i = 0; i < process.argv;i++){
  console.log("The value at position " + i + " in the process.argv array is " + process.argv[i]);
  }
//If the command is spotify-this-song, show song info. for the specific song chosen.
if (userChoice === "spotify-this-song") {
    getSongInfo(songName);
}
else if(userChoice === 'movie-this'){
  movie(songName);
}
else if(userChoice === "concert-this"){
    getConcert(songName);
}
else if(userChoice === "do-what-i-say"){
    readingRandom();
}
//this function runs to grab information for a specific song
function getSongInfo(songName) {

    if (songName === undefined) {
        getSongInfo = "The Sign";
      } else {
        getSongInfo = songName;
      }
// To search for a song/track. Setting search results limiting to 5 tracks.
spotify.search({type:'track',query:songName,limit: 5}, function(err,data){
  if(err){
    return console.log('error occurred:'+err);
  };
// Looping through the JSON data to display the top songs.
for(let i=0; i <data.tracks.items.length; i++){
    // display a song # for each song returned.
  console.log("Song #" + (i+1))
    //log the artitsts name
    console.log("Artist:" + data.tracks.items[i].artists[0].name);
    //log the song's name.
    console.log("Song title:" + data.tracks.items[i].name)
    //log the link of the song from Spotify.
    console.log("Preview song:" + data.tracks.items[i].preview_url);
    //display the album that the song is from.
  console.log("Album:" + data.tracks.items[i].album.name);
}
})
}

//
function movie (movieName){
console.log("movie")
	// const movieName = "";

	const  URL = "http://www.omdbapi.com/?t="+movieName+"&y=&plot=full&tomatoes=true&apikey=trilogy"

	request(URL, function (error, response, body) {
		if(error){
		  console.log('error:', error); // this will log of an error occurs
		}else{
      // console.log('statusCode:',
      // response && response.statusCode); 
      // Print the response status code if a response was received
			// console.log(body) displays all the movie info ; 
			const requestObject = JSON.parse(body);
			console.log('Movie Title:', requestObject.Title );
			console.log('Movie imdbRating:', requestObject.imdbRating);
			console.log('Movie Year:', requestObject.Year);
			console.log('Movie Country:', requestObject.Country);
			console.log('Movie Language:', requestObject.Language);
			console.log('Movie Plot:', requestObject.Plot);
			console.log('Movie Actors:', requestObject.Actors);
			console.log('Movie RottenTotmatesRating:', requestObject.Ratings[1].Source, requestObject.Ratings[1].Value);
			
		}
	});

};

function getConcert(concertInquiry){
   request(`https://rest.bandsintown.com/artists/${concertInquiry}/events?app_id=codingbootcamp`, function(error, response, body){

       if(error){
           console.log(error)
           return (error);
        
       }
       
          let data = JSON.parse(body);//parses data to make it accessible

          for(let i = 0; i < data.length; i++){
          console.log('Venue name: ' + data[i].venue.name);
          console.log('City:       ' + data[i].venue.city);
          console.log('Country:    ' + data[i].venue.country + '\n');
          }

   });
}

//file system reads he text inside of random.txt and then use it to call one of LIRI's commands.
function readingRandom(){
    fs.readFile("random.txt","utf8",function(error,data){
        if(error){
            console.log(error);
        }
 
 
        var array = data.split(",");
        var trackName = array[1];
        console.log("**********************\n" + trackName + "\n***********************")
        getSongInfo(trackName);
    })
 }