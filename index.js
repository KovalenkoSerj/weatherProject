var temperature, windSpeed, pressure, humidity, city, object, summary, visibility;



function weatherInform(id){
    return document.querySelector(id);
}


window.onload  = function(){
    temperature = weatherInform('.degrees');
    humidity = weatherInform('.windHumidity');
    pressure = weatherInform('.mmMercury');
    windSpeed = weatherInform('.windspeed');
    city = weatherInform('.city');
    summary = weatherInform('.summary');
    visibility = weatherInform('.visibility')
    
};




function getWeatherLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            var lat = position.coords.latitude,
                long = position.coords.longitude;
            getWeatherInfo(lat, long);
            
        })
    }else{
        return alert('Could not get location')
    }
}
function getWeatherInfo(lat, long){
    var url = `https://api.darksky.net/forecast/f672ff13193bfcc40427a678ebfdbc71/${lat},${long}` + `?format=jsonp&callback=showInfo`,
     script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
    showInfo(object);

}

function showInfo(object) {
    humidity.innerHTML = persentToGrams(object.currently.humidity);
    pressure.innerHTML = object.currently.pressure;
    windSpeed.innerHTML = knotsToKm(object.currently.windSpeed);
    temperature.innerHTML = farenheit(object.currently.temperature);
    city.innerHTML = object.timezone.split('/')[1];
    summary.innerHTML = object.currently.summary;
    visibility.innerHTML = mlToKm(object.currently.visibility);

}


function farenheit(temperature){
    return Math.floor((temperature - 32)/1.8)
}

function knotsToKm(windSpeed){
    return Math.floor((windSpeed / 1.852).toFixed(2))
}

function persentToGrams(humidity){
    return ((humidity /100).toFixed(4))
}

function mlToKm(visibility){
    return (visibility/0.62137).toFixed(1)
}
