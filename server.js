'use strict';


const express = require('express');
require('dotenv').config(); 

 
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


server.get('/getweather',(req,res)=>{
    console.log(req.query);
    let selectedcity = weatherdata.find (city =>{
        if(city.city_name == req.query.city_name && city.lat==req.query.lat && city.lon ==req.query.lon)  {
            return city
        }
    })
    res.status(200).send(selectedcity);
})
  server.get('*',(req,res)=>{
    res.status(404).send('NOT FOUND')
})
class ForeCast{
    constructor(weatherData){
      this.date=weatherData.valid_date
      this.description =weatherData.weather.description
    }
  }

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})