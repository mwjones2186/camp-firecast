
//this is the weather info needs lat and  lon
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}


//this is our geo locator. 


var api = '774222c77f8b3fa1592aeb44a0bae645'
var cityName = document.getElementById('cityName')
var searchBtn = document.getElementById('search')

function userInput() {
    var city = cityName.value
    getWeather(city)
}

function getWeather(city) {
    console.log(city)
    var geo = `http://api.openweathermap.org/geo/1.0/direct?q=${city},US,US&appid=${api}`
    fetch(geo).then(function (results) {
        return results.json()
    }).then(function (data) {
        // console.log(data)

        var forecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&exclude=alerts,minutely,hourly,current&units=imperial&appid=${api}`
        fetch(forecast).then(function (results) {
            return results.json()
        }).then(function (data) {
            console.log(data)
        })

        
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