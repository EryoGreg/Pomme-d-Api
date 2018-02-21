const request = require('request-promise-native');

module.exports.getCityWeather = async function(city, { apiKey }){ // TODO tableau de city ?
    try{
        let response = await request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&APPID=${apiKey}&units=metric`);
        response = JSON.parse(response);
        return response
    }catch(err) {
        console.error('Erreur de connection à l\'api : \n'+ err)
    }


};

module.exports.getWeather = async function ({apiKey}) {
    try{
        let response = await request(`http://api.openweathermap.org/data/2.5/weather?q=Bordeaux&lang=fr&APPID=${apiKey}&units=metric`);
        response = JSON.parse(response);
        return response
    }catch (err){
        console.error('Erreur de connection à l\'api : \n'+ err)
    }

};
