const request = require('request-promise-native');

module.exports.getWeather = async function(city, { apiKey }){
    const response = await request(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&lang=fr&APPID=${apiKey}&units=metric`);
    return response
};