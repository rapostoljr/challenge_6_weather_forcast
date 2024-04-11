const baseURL = 'https://api.openweathermap.org/data/2.5/forecast'
const apiKey = '32fc4ef284ffcafc2edc15beea698a19';

const searchButtonClicked = document.getElementById('search_button');
const cityTitle = document.getElementById('name_of_city');
const cityTemp = document.getElementById('current_temp');
const cityWind = document.getElementById('current_wind');
const cityHumidity = document.getElementById('current_humidity');

const currentWeather = document.querySelector('.current_city_searched');
const weatherFiveDays = document.querySelector('.weather_five_days');

const cityNameInputEl = document.getElementById('city');
const previouslySearchedHTML = document.querySelector('.previously_searched')

const today = dayjs();

searchButtonClicked.addEventListener("click", async (event) => {
    let cityName = cityNameInputEl.value
    const response = await getAndRenderCity(event, cityName);
    if (!response) return;
    createCityButton(cityName);
})

function createCityButton(cityName) {
    let button = document.createElement('button');
    button.setAttribute('class', 'previously_searched_btn');   
    button.textContent = cityName
    previouslySearchedHTML.appendChild(button);
    button.addEventListener("click", (event) => {
        getAndRenderCity(event, cityName);
    })
}

function setFiveDayWeatherForecast(cityName, weatherInfo, index) {
    let currentDate = dayjs().format('[(]MMM D, YYYY[)]')
    if (index === 0) {
        return `
        <h2><span id="name_of_city">${cityName}</span> / <span id="today_date">${currentDate}</span></h2>
        <img src="https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@4x.png"></img>
        <p id="current_temp">Temp: ${((weatherInfo.main.temp - 273.15) * 1.8 + 32).toFixed(2)}°F</p>
        <p id="current_wind">Wind: ${weatherInfo.wind.speed}M/S</p>
        <p id="current_humidity">Humidity: ${weatherInfo.main.humidity}%</p>
        `;
    } else {
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
}

// Get the city name and puts it into Current City Searched
async function getAndRenderCity(event, cityName) {
    event.preventDefault();
    const apiUrlCity = `${baseURL}?q=${cityName}&appid=${apiKey}`;

    return fetch(apiUrlCity).then((response) => {
        if (!response.ok) {
            throw new Error('No response from server.');
        }    
        return response.json()
    }).then((data) => {        
        if (!data.list.length) {
            return alert(`Could not find coordinates for ${cityName}`);
        }

        // Filters the forecast to one per day
        const individualForecastDays = [];
        const fiveDayForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!individualForecastDays.includes(forecastDate)) {
                return individualForecastDays.push(forecastDate);
            }
        })

        // Clears previous data
        currentWeather.innerHTML = "";
        weatherFiveDays.innerHTML = "";

        // Displays 5 day forecast
        fiveDayForecast.forEach((weatherInfo, index) => {
            if (index === 0) {
                currentWeather.insertAdjacentHTML("beforeend", setFiveDayWeatherForecast(cityName, weatherInfo, index));
            } else {
                weatherFiveDays.insertAdjacentHTML("beforeend", setFiveDayWeatherForecast(cityName, weatherInfo, index));
            }
        })
        return true;
    }).catch(() => false)
}