//https://openweathermap.org/current#current_JSON


const api = require('./api');
const settings = require('./settings.json');

const inquirer = require('inquirer');

let city = "Bordeaux";

welcomeFunction();

function welcomeFunction() {
    return new Promise(async function (resolve, reject) {
        console.log(
            ' ____  _____  __  __  __  __  ____    ____/   __    ____  ____ \n' +
            '(  _ \\(  _  )(  \\/  )(  \\/  )( ___)  (  _ \\  /__\\  (  _ \\(_  _)\n' +
            ' )___/ )(_)(  )    (  )    (  )__)    )(_) )/(__)\\  )___/ _)(_ \n' +
            '(__)  (_____)(_/\\/\\_)(_/\\/\\_)(____)  (____/(__)(__)(__)  (____)\n' +
            '\n');

        let answer = await inquirer.prompt([
            {
                type: 'list',
                message: 'Aimez vous les pommes ?',
                name: 'Pommes',
                choices: [
                    'j\'adore !!',
                    'pas du tout'
                ]
            }, {
                type: 'checkbox',
                message: 'De quelles pommes parlez vous ?',
                name: 'city',
                choices: [
                    new inquirer.Separator('Les villes :'),
                    'Bordeaux',
                    'Paris',
                    'London',
                    'Berlin',
                    'Madrid',
                    new inquirer.Separator('ajouter une ville'),
                    'Autre ville',
                ]
            }
        ]);
        console.log(answer);
        if (answer.city.includes('Autre ville')) { //answer contains AutreVille
            const customCityObj = await inquirer.prompt([
                {
                    type: 'input',
                    message: 'Entrez le nom de la ville',
                    name: 'city',
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

            answer = await jsonConcat(answer, customCityObj);

            console.log(answer);
        }
    }).catch(err => console.log(err));
}

function jsonConcat(answers, customCityObj) {
    for (let key in answers.city) { // pour chaque ville selectionnée
        if (answers.city[key] == "Autre ville") {
            answers.city[key] = customCityObj.city
        }

    }
    return answers;
}

/*

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
*/
















// ce que je veux faire :
/*

var x = fonction {
return toto
}

if x = toto
     x= tata











































*/
