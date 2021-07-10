'use strict';

const axios = require('axios'); 
module.exports = getMovies; 
let recent=0;
let inMemory = {} 
function getMovies(req,res)
{
    let city_query = req.query.city_name
    let movie_url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city_query}`
    if (inMemory[city_query] !== undefined && recent < 10)
    {
        res.send(inMemory[city_query]);
        recent++
    }
    else{
        inMemory[city_query]={}
    axios
    .get(movie_url)
    .then(movies=>{
        // console.log(movies.data.results)
        
        const movies_arr = movies.data.results.map(result => new Movies(result)) 
        //  console.log(movies_arr)
        inMemory[city_query] = movies_arr
        res.status(200).send(movies_arr) 
    })
    .catch(error=>{
        res.status(500).send(error)
    })
    recent++
}
console.log(recent)
}

  

class Movies
{
    constructor(movie)
    {
        this.title = movie.title;
        this.overview = movie.overview;
        this.averageVotes = movie.vote_average;
        this.totalVotes = movie.vote_count;
        this.imageUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
        this.popularity = movie.popularity;
        this.releasedOn = movie.release_date;

    }
}    