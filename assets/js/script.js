// Global variables
var api = '774222c77f8b3fa1592aeb44a0bae645'
var cityName = document.getElementById('cityName')
var searchBtn = document.getElementById('search')
var state = document.getElementById("state")
var dropDownDate = document.getElementById("date-select")
var resultsContainer = document.getElementById('results-div')
var displayCity = document.getElementById('display-city')
var googleMap = document.getElementById('map')
var toast = document.getElementById('toast');
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
        var forecast = `http://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&exclude=alerts,minutely,hourly,current&units=imperial&appid=${api}`

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
            let temp = data.daily[i].temp.max
            let humidity = data.daily[i].humidity + ' %';
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
            //truncated temp
            temperatureEl.textContent = Math.trunc(parseInt(temp)) + ' °F';
            // Humidity:.max;
            var humidityEl = document.getElementById("humidity");
            humidityEl.textContent = humidity;
            // UV Index:
            var uvEl = document.getElementById("uv-index");
            uvEl.textContent = uvi;
            // Adverse Weather:
            var adverseWeatherEl = document.getElementById("adverse");
            adverseWeatherEl.textContent = adverseWeather;

            // Google Map
            googleMap.setAttribute('src', `https://www.google.com/maps/embed/v1/place?key=AIzaSyDiGnQ61aAehxeFqd9DfJ6JZ8OOBVuruQU
            &q=${formattedCity}+${state}`)

            // FireCast report response colors
            var warningEl = document.getElementById('warning');
            var textToAddBad = "Based on the location and date you have selected, it is NOT safe for you to build a campfire."
            var textToAddGood = "Based on the location and date you have selected, it IS SAFE for you to build a campfire."
            console.log("windspeed and humidity: ", wind.textContent, humidity.textContent);
            if (parseInt(wind) >= 20 && parseInt(humidity) <= 10 ||
                parseInt(wind) >= 20 && parseInt(temp) >= 100 ||
                parseInt(humidity) <= 10 && parseInt(temp) >= 100 ||
                parseInt(wind) >= 20 && parseInt(humidity) <= 10 && parseInt(temp) >= 100) {
                warningEl.classList.add("redText");
                warningEl.innerHTML = textToAddBad;
            } else {
                warningEl.innerHTML = textToAddGood;
                warningEl.classList.add("greenText");
            };

            // wind speed warning text color change
            var windEl = document.getElementById("wind-speed");

            if (parseInt(wind) < 20 && parseInt(wind) >= 10) {
                windEl.classList.add("orangeText");
            }

            if (parseInt(wind) >= 20) {
                windEl.classList.add("redText");
            }

            // humidity warning text color change
            var humidityEl = document.getElementById("humidity");

            if (parseInt(humidity) > 10 && parseInt(humidity) <= 20) {
                humidityEl.classList.add("orangeText");
            }

            if (parseInt(humidity) <= 10) {
                humidityEl.classList.add("redText");
            }

            // temperature warning text color change
            var temperatureEl = document.getElementById("temperature");

            if (parseInt(temp) >= 85 && parseInt(temp) < 100) {
                temperatureEl.classList.add("orangeText");
            }

            if (parseInt(temp) >= 100) {
                temperatureEl.classList.add("redText");
            }
        })
    }).catch(function (error){

       toast.textContent = 'Please check your city and state';

       toast.setAttribute('class', 'feedback')
        setTimeout(function(){
           toast.setAttribute('class', 'feedback hide')
        }, 2500);

    })




    // if (wind > 25 && humidity <10)
    // alert (you gonna die of fire!)

};

searchBtn.addEventListener('click', userInput)

// As you can see below, due to the current weather reports and red flag alerts, we would not suggest having a fire in that location. Please search for a new camp site location.