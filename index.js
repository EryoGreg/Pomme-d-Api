
let xhr = require("xmlhttprequest").XMLHttpRequest;
let request = new xhr();
let city = "London,uk";
// let url = `api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&APPID=dc927e66139d7944ad3fd9ffbcb8c2f0&units=metric`;
let url = `api.openweathermap.org/data/2.5/weather?q=London,uk&lang=fr&APPID=dc927e66139d7944ad3fd9ffbcb8c2f0&units=metric`;

request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        console.log("done");
        let response = JSON.parse(this.responseText);
        getElements(response);
    }
};

request.open("GET", url, true);
request.send();

getElements = function(response) {
    console.log(`The humidity in ${city} is ${response.main.humidity}%`);
    // $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
    console.log(`The temperature in Kelvins is ${response.main.temp} degrees.`);
    // $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
};