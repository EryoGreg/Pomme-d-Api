#!/usr/bin/env node

//https://openweathermap.org/current#current_JSON

const api = require('./api');
const settings = require('./settings.json');

const Commander = require('commander'); // https://www.npmjs.com/package/commander
const inquirer = require('inquirer');

let city = "Bordeaux";
let answer;



const program = require('commander');
// Configuration des paramètres attendus
program
    .version('1.0.0')
    .option('-d, --default', 'Show hello world')
    .option('-c [value], --city [value]', 'get weather of a city')
    .option('-s, --someone [name]', 'Say hi to someone');
// On parse (convertit en format utilisable) les options
// fonction synchrone
program.parse(process.argv);

if (program.default) { // -d, --default
    welcomeFunction().then(rep => {
        answer = rep;
        api.getCitiesWeather(answer.cities, settings).then((data) => {
            for(dat of data) {
                verbose(dat)
            }
        }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));

} else if (program.all) {
    console.log('Hello all!')

} else if (program.someone) {
    console.log(`Hello ${program.someone}!`)
} else {
    program.help()
}






/*main();
async function main() {*/
// answer = await welcomeFunction();

async function welcomeFunction() {
    console.log(
        ' ____  _____  __  __  __  __  ____    ____/   __    ____  ____ \n' +
        '(  _ \\(  _  )(  \\/  )(  \\/  )( ___)  (  _ \\  /__\\  (  _ \\(_  _)\n' +
        ' )___/ )(_)(  )    (  )    (  )__)    )(_) )/(__)\\  )___/ _)(_ \n' +
        '(__)  (_____)(_/\\/\\_)(_/\\/\\_)(____)  (____/(__)(__)(__)  (____)\n' +
        '\n');

    let answer = await inquirer.prompt([
        {
            type: 'list',
            message: 'Do you like apples ?',
            name: 'Pommes',
            choices: [
                "I love it !!",
                'Not at all.'
            ]
        }, {
            type: 'checkbox',
            message: 'Of which cities are you interested in ?',
            name: 'cities',
            choices: [
                new inquirer.Separator('Les villes :'),
                'Bordeaux',
                'Paris',
                'London',
                'Berlin',
                'Madrid',
                new inquirer.Separator('An Other City ?'),
                'Select a new one',
            ]
        }
    ]);

    if (answer.cities.includes('Select a new one')) { //answer contains Select a new one
        const customCityObj = await
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'Type the city name :',
                    name: 'cities',
                    validate: function (value) { // que des lettres
                        var pass = value.match(
                            /^[a-zA-Z]{2,}/
                        );
                        if (pass) {
                            return true;
                        }
                        return 'entrez une ville d\'au moins 2 lettres : ';
                    }
                }
            ]);
        answer = await remplaceAutreVille(answer, customCityObj);


    }

    return answer;
}

function remplaceAutreVille(answer, customCityObj) {
    for (let key in answer.cities) { // pour chaque ville selectionnée
        if (answer.cities[key] == "Select a new one") {
            answer.cities[key] = customCityObj.cities
        }

    }
    return answer;
}

function verbose (data) {
    console.log(answer);
    if (data) {
        if (answer.Pommes === "I love it !!") {
            console.log("les pommes de " + data.name + " subissent un climat de type " + data.weather[0].description); // pluie fine
        } else {
            console.log(city + " : "+data.weather[0].description);
        }

    }
}

// }
// api.getWeather(settings).then((data)=> {
//     // si on reçoit de la data :
//     if (data){
//         console.log("les pommes ont trop de "+data.weather[0].description); // pluie fine
//     }
// }).catch((err)=> console.log(err));

