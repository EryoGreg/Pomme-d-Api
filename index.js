//https://openweathermap.org/current#current_JSON


const api = require('./api');
const settings = require('./settings.json');

let city = "Bordeaux";

welcomeFunction();

function welcomeFunction() {
    console.log(
        ' ____  _____  __  __  __  __  ____    ____/   __    ____  ____ \n' +
        '(  _ \\(  _  )(  \\/  )(  \\/  )( ___)  (  _ \\  /__\\  (  _ \\(_  _)\n' +
        ' )___/ )(_)(  )    (  )    (  )__)    )(_) )/(__)\\  )___/ _)(_ \n' +
        '(__)  (_____)(_/\\/\\_)(_/\\/\\_)(____)  (____/(__)(__)(__)  (____)\n' +
        '\n');
}

api.getCityWeather(city, settings).then((data)=> {
    // si on reçoit de la data :
    if (data){
        console.log("les pommes de "+city+" subissent un climat de type "+data.weather[0].description); // pluie fine /
    }
}).catch((err)=> console.log(err));

api.getWeather(settings).then((data)=> {
    // si on reçoit de la data :
    if (data){
        console.log("les pommes ont trop de "+data.weather[0].description); // pluie fine /
    }
}).catch((err)=> console.log(err));


