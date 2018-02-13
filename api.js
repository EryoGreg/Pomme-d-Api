const request = require('request-promise-native');

module.exports.getCityWeather = async function(city, { apiKey }){
    let response = await request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&APPID=${apiKey}&units=metric`);
    response = JSON.parse(response);
    return response
};

module.exports.getWeather = async function ({apiKey}) {
    let response = await request(`http://api.openweathermap.org/data/2.5/weather?q=Bordeaux&lang=fr&APPID=${apiKey}&units=metric`);
    response = JSON.parse(response);
    return response
};
