// Global variables
var api = '774222c77f8b3fa1592aeb44a0bae645'
var cityName = document.getElementById('cityName')
var searchBtn = document.getElementById('search')
var state = document.getElementById("state")
var dropDownDate = document.getElementById("date-select")
var resultsContainer = document.getElementById('results-div')
var displayCity = document.getElementById('display-city')
var googleMap = document.getElementById('map')

// User input for city name
function userInput() {
    var city = cityName.value
    var stateCode = state.value
    var dateEl = dropDownDate.value

    getWeather(city, stateCode, dateEl)
}

// Geo locator API for city input by user
function getWeather(city, state, date) {

    var geo = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&appid=${api}`

    fetch(geo).then(function (results) {
        return results.json()
    }).then(function (data) {
        // console.log(data)
        var formattedCity = data[0].name;
        // Weather API retriever 
        //this is the weather info needs lat (latitude) and lon (longitude)

        var forecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&exclude=alerts,minutely,hourly,current&units=imperial&appid=${api}`

        fetch(forecast).then(function (results) {
            return results.json()
        }).then(function (data) {
            // console.log(data)
            displayCity.textContent = formattedCity + ', ' + state;
            resultsContainer.removeAttribute('class')
            var i = date
            // Red Flag weather elements for Firecast report
            // for (let i = 0; i < data.daily.length ; i++) {
            // console.log(data.daily[i].wind_speed)
            let wind = data.daily[i].wind_speed + ' MPH';
            let temp = data.daily[i].temp.max;
            let humidity = data.daily[i].humidity;
            let uvi = data.daily[i].uvi;
            let adverseWeather = data.daily[i].weather[0].description;
            // console.log(wind)
            // console.log(uv)

            // HTML population of Red Flag weather elements
            // Wind Speed:
            var windEl = document.getElementById("wind-speed");
            windEl.textContent = wind;
            // Temp:
            var temperatureEl = document.getElementById("temperature");
            temperatureEl.textContent = temp;
            // Humidity:.max;
            var humidityEl = document.getElementById("humidity");
            humidityEl.textContent = humidity;
            // UV Index:
            var uvEl = document.getElementById("uv-index");
            uvEl.textContent = uvi;
            // Adverse Weather:
            var adverseWeatherEl = document.getElementById("adverse");
            adverseWeatherEl.textContent = adverseWeather;

            googleMap.setAttribute('src', `https://www.google.com/maps/embed/v1/place?key=AIzaSyDiGnQ61aAehxeFqd9DfJ6JZ8OOBVuruQU
            &q=${formattedCity}+${state}`)

            // }
        })
    })


    // if (wind > 25 && humidity <10)
    // alert (you gonna die of fire!)

};
searchBtn.addEventListener('click', userInput)


// curl https://ridb.recreation.gov/api/v1/campsites 
// -H 'accept: application/json' 
// -H 'apikey: 8b8419a6-9f8b-493a-9397-cf7c589a89d5'
// //     
// ?limit=50&offset=0
//     // var campCite = 'https://ridb.recreation.gov/api/v1/campsites?limit=50&offset=0'

//     fetch(campCite).then(function(results){
//         return results.json()
//     }).then(function(data){
//     console.log(data)
// })