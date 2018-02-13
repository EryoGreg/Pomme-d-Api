const api = require('./api');

const settings = {
    apiKey: 'dc927e66139d7944ad3fd9ffbcb8c2f0'
};

api.getWeather('bordeaux', settings).then((data)=> {
    let objResponse = JSON.parse(data);
    console.log(objResponse.weather[0].description)
}).catch((err)=> console.log(err));
