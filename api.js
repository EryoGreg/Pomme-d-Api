const request = require('request-promise-native');

module.exports.getCityWeather = async function(city, { apiKey }, { lang }){ // TODO tableau de city ?
    try{
        let response = await request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&APPID=${apiKey}&units=metric`);
        response = JSON.parse(response);
        return response
    }catch(err) {
        console.error('Erreur de connection à l\'api : \n'+ err)
    }
};

module.exports.getCitiesWeather = async function(cities, { apiKey }, { lang }){ // TODO tableau de city ?
    let ret = [];
    try{
        for (city of cities) {
            let response = await request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&APPID=${apiKey}&units=metric`);
            response = JSON.parse(response);
            ret.push(response);
        }
        return ret
    }catch(err) {
        console.error('Erreur de connection à l\'api : \n'+ err)
    }
};


// unused
module.exports.getWeather = async function ({apiKey}) {
    try{
        let response = await request(`http://api.openweathermap.org/data/2.5/weather?q=Bordeaux&lang=fr&APPID=${apiKey}&units=metric`);
        response = JSON.parse(response);
        return response
    }catch (err){
        console.error('Erreur de connection à l\'api : \n'+ err)
    }

};
