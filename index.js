#!/usr/bin/env node

//https://openweathermap.org/current#current_JSON

const api = require('./api');
const lang = require('./lang');
const settings = require('./settings.json');

const Commander = require('commander'); // https://www.npmjs.com/package/commander
const inquirer = require('inquirer');

let answer;
let currentLang = lang.en;


const program = require('commander');
// Configuration des paramètres attendus
program
    .version('1.0.0')
    .option('-d, --default', 'Show default navigation menu')
    .option('-c, --city [value]', 'get weather of a city')
    .option('-p, --pommes', 'Vous allez aimer les pommes !')
    .option('-m, --map [value]', 'Affiche la ville indiquée sur la carte')
    .option('-l, --language [value]', 'set language to [fr] or [en]');
program.parse(process.argv);

if (program.language) {
    if (program.language === "fr") {
        currentLang = lang.fr;
    } else if (program.language === "en") {
        currentLang = lang.en;
    } else {
        console.log(currentLang.lang_err);
    }
}
if (program.default) { // -d, --default
    welcomeFunction().then(rep => {
        answer = rep;
        api.getCitiesWeather(answer.cities, settings, currentLang).then((data) => {
            for (dat of data) {
                verbose(dat)
            }
        }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));

}
else if (program.city) {      // else pour eviter les deux en meme temps
    if (program.city === true) {        // l'utilisateur n'a pas rentré une ville
        console.log("entrez une ville en paramètre \n ex: -c Chicago");
    } else {
        api.getCityWeather(program.city, settings, currentLang).then((data) => {
            verbose(data)
        }).catch((err) => console.log(err));
    }

}
else if (program.map) {      // else pour eviter les deux en meme temps

    if (program.map !== true) {
        api.showOnMap(program.map, settings, currentLang)
    } else {
        api.showOnMap("Bordeaux", settings, currentLang)
    }

}
if (!program.language && !program.pommes && !program.city && !program.default && !program.map) {
    program.help()
}


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
            // message: 'Do you like apples ?',
            message: currentLang.aime,
            name: 'Pommes',
            choices: [
                currentLang.adore,
                currentLang.non_adore
            ]
        }, {
            type: 'checkbox',
            message: currentLang.ville,
            name: 'cities',
            choices: [
                new inquirer.Separator(currentLang.ville_separator),
                'Bordeaux',
                'Paris',
                'London',
                'Berlin',
                'Madrid',
                new inquirer.Separator(currentLang.autre_ville),
                currentLang.choisir_autre_ville,
            ]
        }
    ]);

    if (answer.cities.includes(currentLang.choisir_autre_ville)) { //answer.cities contains Select a new one
        const customCityObj = await
            inquirer.prompt([
                {
                    type: 'input',
                    message: currentLang.rentrer_nom,
                    name: 'cities',
                    validate: function (value) { // que des lettres
                        var pass = value.match(
                            /^[a-zA-Z]{2,}/
                        );
                        if (pass) {
                            return true;
                        }
                        return currentLang.deux_lettres;
                    }
                }
            ]);
        answer = await remplaceAutreVille(answer, customCityObj);


    }

    return answer;
}

function remplaceAutreVille(answer, customCityObj) {
    for (let key in answer.cities) { // pour chaque ville selectionnée
        if (answer.cities[key] == currentLang.choisir_autre_ville) { // l'objet contient "choisir une autre ville
            answer.cities[key] = customCityObj.cities
        }

    }
    return answer;
}

function verbose(data) {
    if (data) {
        if (program.pommes || answer && answer.Pommes === currentLang.adore) {  // aimez vous les pommes ?
            console.log(currentLang.returnPomme1 + data.name + " " + currentLang.returnPomme2 + data.weather[0].description); // Les pommes de --- subissent un climat de type ---
        } else {
            console.log(data.name + " : " + data.weather[0].description);
        }

    }
}