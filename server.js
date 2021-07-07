'use strict';


const express = require('express');
require('dotenv').config(); 

 const axios = require('axios')
const cors = require('cors'); 

const weatherdata = require('./data/weather.json')


const server = express();
const PORT = process.env.PORT;
server.use(cors()); 



server.get('/',(req,res)=>{
    res.status(200).send('home route')
})


server.get('/test',(request,response)=>{
    response.status(200).send('my server is working')
})
server.get('/getweather',oldWeather)
server.get('/weather_forecast',getweather)
server.get('/movies', getMovies)
function getweather(req,res)
{
    
    let city_query = req.query.city_name
    let weather_url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city_query}&key=${process.env.WEATHER_API_KEY}&days=5`
    axios
    .get(weather_url)
    .then(weather_forecast=>{
        // console.log(weather_forecast.data.data)
        const forecast_arr = weather_forecast.data.data.map((forecast)=> new ForeCast(forecast))
        // console.log(forecast_arr)
        res.status(200).send(forecast_arr) 
    })
    .catch(error=>{
        res.status(500).send(error)
    })
    
}
function oldWeather(req,res)
{
    console.log(req.query);
    let selectedcity = weatherdata.find(city =>{
        if(city.city_name == req.query.city_name )  {
            return city
        }
    })
    const forecast_arr = selectedcity.data.map((forecast)=> new WeatherOld(forecast))
        // console.log(forecast_arr)
        res.status(200).send(forecast_arr) 
    // res.status(200).send(selectedcity);
}

function getMovies(req,res)
{
    let city_query = req.query.city_name
    let movie_url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city_query}`
    axios
    .get(movie_url)
    .then(movies=>{
        console.log(movies.data.results)
        const movies_arr = movies.data.results.map(result => new Movies(result)) 
        //  console.log(movies_arr)
        res.status(200).send(movies_arr) 
    })
    .catch(error=>{
        res.status(500).send(error)
    })
}

  server.get('*',(req,res)=>{
    res.status(404).send('NOT FOUND')
})

class ForeCast {
    constructor(forecast) {
        this.description =forecast.weather.description
        this.valid_date = forecast.valid_date

    }
} 
class WeatherOld {
    constructor(forecast) {
        this.description =forecast.weather.description
        this.valid_date = forecast.valid_date

    }
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


server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})
