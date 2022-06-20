// Global variables
var api = '774222c77f8b3fa1592aeb44a0bae645'
var cityName = document.getElementById('cityName')
var searchBtn = document.getElementById('search')

<<<<<<< HEAD
=======
// User input for city name
>>>>>>> 2b56af4b1ba3acdd14ad4e6d654365fe8437ea0b
function userInput() {
    var city = cityName.value
    getWeather(city)
}

<<<<<<< HEAD
function getWeather(city) {
    console.log(city)
    var geo = `http://api.openweathermap.org/geo/1.0/direct?q=${city},US,US&appid=${api}`
=======
// Geo locator API for city input by user
function getWeather(city) {

    // console.log(city)
    var geo = `http://api.openweathermap.org/geo/1.0/direct?q=${city},OR,US&appid=${api}`
>>>>>>> 2b56af4b1ba3acdd14ad4e6d654365fe8437ea0b
    fetch(geo).then(function (results) {
        return results.json()
    }).then(function (data) {
        // console.log(data)

<<<<<<< HEAD
=======
        // Weather API retriever 
        //this is the weather info needs lat (latitude) and lon (longitude)
        // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
>>>>>>> 2b56af4b1ba3acdd14ad4e6d654365fe8437ea0b
        var forecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&exclude=alerts,minutely,hourly,current&units=imperial&appid=${api}`
        fetch(forecast).then(function (results) {
            return results.json()
        }).then(function (data) {
            console.log(data)
        })

<<<<<<< HEAD
        
    });



//     function initMap() {
//         getWeather.then;
//         const lat = data[0].lat
//         const lon = data[0].lon

//         const map = new google.maps.Map(document.getElementById("map"), {
//           zoom: 0,
//           center: uluru,
//         });
    
//         window.initMap = initMap;
};
searchBtn.addEventListener('click', userInput)
=======
        // Red Flag weather elements for Firecast report
        for (let i = 0; i < data.daily.length; i++) {
            let wind = data.daily[i].wind_speed;
            let temp = data.daily[i].temp.max;
            let humidity = data.daily[i].humidity;
            let uvi = data.daily[i].uvi;
            let adverseWeather = data.daily[i].weather[i].description;
            // console.log(wind)
            // console.log(uv)

            // HTML population of Red Flag weather elements
            // Wind Speed:
            windEl = document.getElementById("wind-speed");
            windEl.textContent = data.daily[i].wind_speed
            // Temp:
            temperatureEl = document.getElementById("temperature");
            temperatureEl.textContent = data.daily[i].temp.max;
            // Humidity:
            humidityEl = document.getElementById("humidity");
            humidityEl.textContent = data.daily[i].humidity;
            // UV Index:
            uvEl = document.getElementById("uv-index");
            uvEl.textContent = data.daily[i].uvi;
            // Adverse Weather:
            adverseWeatherEl = document.getElementById("adverse-weather");
            adverseWeatherEl.textContent = data.daily[i].weather[i].description; 
        }
    })


};
searchBtn.addEventListener('click', userInput)

>>>>>>> 2b56af4b1ba3acdd14ad4e6d654365fe8437ea0b
