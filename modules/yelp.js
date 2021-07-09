const axios = require("axios")

let API_KEY = process.env.YELP_API_KEY
module.exports = yelpHandler;
let inMemory = {}
// REST
function yelpHandler (req , res ){
    // let key =process.env.YELP_API_KEY;
    let city = req.query.city_name;
    let url = `https://api.yelp.com/v3/businesses/search?location=${city}&limit=20`;
    if (inMemory != undefined)
    {
        res.send(inMemory[city]);
    }
    else{
    axios.get(url).set('Authorization', `Bearer ${API_KEY}`)
    .then((results) => {
        let yresults=JSON.parse(results.text);
        let review =yresults.businesses.map((item) => new YelpData(item));
        res.status(200).send(review);
    })
    .catch(() => {
        errorHandler(req, res);

    });
}
}

class YelpData{
    constructor(yelp)
    {
        this.title = yelp.title
        this.overview = yelp.overview
        this.averageVotes = yelp.averageVotes
        this.totalVotes =yelp.totalVotes
        this.imageUrl = yelp.imageUrl
        this.popularity = yelp.popularity
        this.releasedOn = yelp.releasedOn
    }
}

