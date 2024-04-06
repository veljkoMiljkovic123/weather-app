//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

//3264cdb05e3dec3d517831bd8a216366

//now   https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

let apiKey = "3264cdb05e3dec3d517831bd8a216366&units=metric";
let inputCity = document.querySelector("[name='city']")
let searchBtn = document.querySelector("[name='search']")
let current = document.querySelector(".current")

let cityInput = [];

searchBtn.addEventListener('click',getCoordinates)

function getCoordinates(){
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${inputCity.value},&appid=${apiKey}`;

    let xml = new XMLHttpRequest();
    xml.open('get',url);
    xml.onreadystatechange = function(){
        if(xml.readyState === 4 && xml.status===200){
            /* console.log(JSON.parse(xml.responseText)); */

          getWeatherData(JSON.parse(xml.responseText));

            }
        
    };
    xml.send();
}

function getWeatherData(cityData){
    
    cityInfo  = {
        country:cityData[0].country,
        lat:cityData[0].lat,
        lon:cityData[0].lon,
        name:cityData[0].name
    }
    console.log(cityInfo);

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${cityInfo.lat}&lon=${cityInfo.lon}&appid=${apiKey}`;

    let xml = new XMLHttpRequest();
    xml.open("get",url);
    xml.onreadystatechange= function(){
        if(xml.readyState === 4 && xml.status===200){
           /*  console.log(JSON.parse(xml.responseText)); */

            displayWeatherData(JSON.parse(xml.responseText));
        }
    }
    xml.send();
}

function displayWeatherData(weatherData){
   console.log(weatherData);
    let temp = Math.floor(weatherData.main.temp);
    let time = weatherData.dt;
    let name = weatherData.name;
    let weatherIcon = weatherData.weather[0].icon;

    let html = ``;
    html = `
    <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"> <br>
    <h1>City name: ${name},${cityInfo.name}</h1> <br>
    <h2>Day name: ${dayName(time)}</h2> <br>
    <h3>Temperatura: ${temp}</h3> <br>
    <p>Osecaj: ${Math.floor(weatherData.main.feels_like)}</p>
    `
    current.innerHTML+=html.trim();
}

function dayName(unixTimeStamp){
    let date = new Date(unixTimeStamp*1000)
    let dayNames = ["Ned","Pon","Uto","Sre","Cet","Pet","Sub"];
    return dayNames[date.getDay()];
}