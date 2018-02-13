//https://openweathermap.org/current#current_JSON


const api = require('./api');
const settings = require('./settings.json');

let city = "Bordeaux";
api.getCityWeather(city, settings).then((data)=> {
    console.log("les pommes de "+city+" subissent un climat de type "+data.weather[0].description); // pluie fine /
}).catch((err)=> console.log(err));

api.getWeather(settings).then((data)=> {
    console.log("les pommes ont trop de "+data.weather[0].description); // pluie fine /
}).catch((err)=> console.log(err));


