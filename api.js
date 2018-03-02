const request = require('request-promise-native');


module.exports.getCityWeather = async function (city, {apiKey}, {lang}) { // TODO tableau de city ?
    try {
        let response = await request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&APPID=${apiKey}&units=metric`);
        response = JSON.parse(response);
        return response
    } catch (err) {
        console.error('Erreur de connection à l\'api : \n' + err)
    }
};

module.exports.getCitiesWeather = async function (cities, {apiKey}, {lang}) { // TODO tableau de city ?
    let ret = [];
    try {
        for (city of cities) {
            let response = await request(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&APPID=${apiKey}&units=metric`);
            response = JSON.parse(response);
            ret.push(response);
        }
        return ret
    } catch (err) {
        console.error('Erreur de connection à l\'api : \n' + err)
    }
};

module.exports.showOnMap = async function (city, settings, currentLang) {

    const blessed = require('blessed')
        , contrib = require('blessed-contrib')
        , screen = blessed.screen();
    const grid = new contrib.grid({rows: 12, cols: 12, screen: screen});
    const map = grid.set(0, 0, 12, 9, contrib.map, {label: 'Carte'});

    const table = grid.set(0, 9, 12, 3, contrib.table,
        {
            keys: true
            , fg: 'green'
            , label: 'Résumé'
            , columnSpacing: 1
            , columnWidth: [24, 10, 10]
        });

    try {
        var data = await this.getCityWeather(city, settings, currentLang); // var et non pour le sortir de ce scope (on purpose)
        //
        // plus propre que de le déclarer plus haut sans l'instancier
    }catch (err) {
        console.log("Une erreur est survenue lors de la récuperation des informations de la Ville de "+city+" : "+err);
    }


    screen.append(map);

    screen.key(['escape', 'q', 'C-c'], function (ch, key) {
        return process.exit(0);
    });

    map.addMarker({"lon": data.coord.lon, "lat": data.coord.lat, color: "red", char: "x"});
    table.focus();
    table.setData(
        {
            headers: ['Titre', 'Données']
            , data:
                [['Ville', city]
                    , ['Climat', data.weather[0].description]
                    , ['Temperature', data.main.temp + " °C"]
                    , ['Temperature Min', data.main.temp_min + " °C"]
                    , ['Temperature Max', data.main.temp_max + " °C"]
                ]
        });

    screen.render();

};

// unused
module.exports.getWeather = async function ({apiKey}) {
    try {
        let response = await request(`http://api.openweathermap.org/data/2.5/weather?q=Bordeaux&lang=fr&APPID=${apiKey}&units=metric`);
        response = JSON.parse(response);
        return response
    } catch (err) {
        console.error('Erreur de connection à l\'api : \n' + err)
    }

};
