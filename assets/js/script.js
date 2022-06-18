
//this is the weather info needs lat and  lon
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}


//this is our geo locator. 


var api = '774222c77f8b3fa1592aeb44a0bae645'
var cityName = document.getElementById('cityName')
var searchBtn =  document.getElementById('search')

function userInput(){
    var city = cityName.value
    getWeather(city)
}

function getWeather(city){
    console.log(city)
    var geo = `http://api.openweathermap.org/geo/1.0/direct?q=${city},US,US&appid=${api}`
 fetch(geo).then(function (results){
    return results.json()
 }).then(function(data){
    // console.log(data)

var forecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&exclude=alerts,minutely,hourly,current&units=imperial&appid=${api}`
    fetch(forecast).then(function (results){
        return results.json()
     }).then(function(data){
        console.log(data)
     })
 }
 )
}
https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1081910.6226718014!2d-123.13672913878243!3d42.04389353885103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sus!4v1655525107853!5m2!1sen!2sus" width="300" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
function initMap() {
    var 
    var myLatLng = {lat: -25.363, lng: 131.044};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });

    google.maps.event.addListener(marker, 'click', function() {
        alert('Marker clicked')
    });

    google.maps.event.addDomListener(map, "click", function() {
        alert('Map clicked')
    });
}


searchBtn.addEventListener('click', userInput)