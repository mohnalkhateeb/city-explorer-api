'use strict';

const axios = require('axios'); 
module.exports = getweather; 

function getweather(req,res)
{
    
    let city_query = req.query.city_name
    let weather_url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city_query}&key=${process.env.WEATHER_API_KEY}&days=5`
    axios
    .get(weather_url)
    .then(weather_forecast=>{
        // console.log('wwwwwwwwwww', weather_forecast)
        const forecast_arr = weather_forecast.data.data.map((forecast)=> new ForeCast(forecast))
        
        res.status(200).send(forecast_arr) 
    })
    .catch(error=>{
        res.status(500).send(error)
    })
    
}

class ForeCast {
    constructor(forecast) {
        this.description =forecast.weather.description
        this.valid_date = forecast.valid_date

    }
} 