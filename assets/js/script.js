const baseURL = 'https://api.openweathermap.org/data/2.5/forecast'
const apiKey = '32fc4ef284ffcafc2edc15beea698a19';

const searchButtonClicked = document.getElementById('search_button');
var cityTitle = document.getElementById('name_of_city');
var cityTemp = document.getElementById('current_temp');
var cityWind = document.getElementById('current_wind');
var cityHumidity = document.getElementById('current_humidity');


var weatherFiveDays = document.querySelector('.weather_five_days');

var today = dayjs();

searchButtonClicked.addEventListener("click", (event) => {
    getAndRenderCity(event);
})

function setFiveDayWeatherForecast(weatherInfo) {
    return `
    <li class="weather_day"> 
        <h3>${dayjs.unix(weatherInfo.dt).format('MMM D, YYYY')}</h3>
        <img src="https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png"></img>
        <p>Temp: ${((weatherInfo.main.temp - 273.15) * 1.8 + 32).toFixed(2)}°F</p>
        <p>Wind: ${weatherInfo.wind.speed}M/S</p>
        <p>Humidity: ${weatherInfo.main.humidity}%</p>
    </li>
    `;
}

// Get the city name and puts it into Current City Searched
function getAndRenderCity(event){
    event.preventDefault();
    var cityNameInputEl = document.getElementById('city');
    var cityName = cityNameInputEl.value.trim()
    if (!cityName) {
        return;
    }

const apiUrlCity = `${baseURL}?q=${cityName}&appid=${apiKey}`;

// Fetches WeatherAPI based on city name
fetch(apiUrlCity).then((response) => {
    response.json().then((data) => {
        if (!response.ok) {
            return alert ('No response from server.');
        }    
        if (!data.list.length) {
            return alert(`Could not find coordinates for ${cityName}`);
        }

        // Filters the forecast to one per day
        const uniqueForecastDays = [];
        const fiveDayForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        })

        // Clears previous data
        weatherFiveDays.innerHTML = "";

        // Sets city name
        setCurrentCityWeatherInfo(cityName);

        // Displays 5 day forecast
        fiveDayForecast.slice(1, 6).forEach(weatherInfo => {
            weatherFiveDays.insertAdjacentHTML("beforeend", setFiveDayWeatherForecast(weatherInfo));
        });
    })
})
}

function setCurrentCityWeatherInfo(cityName) {
    cityTitle.innerHTML = cityName;
    $('#today_date').text(today.format('[(]MMM D, YYYY[)]'))
}


