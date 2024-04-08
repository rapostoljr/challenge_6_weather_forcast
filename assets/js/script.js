const baseURL = 'https://api.openweathermap.org/data/2.5/forecast'
const apiKey = '32fc4ef284ffcafc2edc15beea698a19';

const searchButtonClicked = document.getElementById('search_button')
var cityTitle = document.getElementById('name_of_city')

var today = dayjs();

searchButtonClicked.addEventListener("click", (event) => {
    getAndRenderCity(event)
})

function getFiveDayWeatherForecast(lat, lon) {
    const apiUrlCoord = `${baseURL}/?lat=${lat}&lon=${lon}&cnt=5&appid=${apiKey}`;

    fetch(apiUrlCoord).then(function (response) {
        if (response.ok) {
            response.json().then(function(data){
                console.log(data);
            })
        } else  {
            alert("Could not fetch weather forecast.");
        }
    })
}

function getAndRenderCity(event){
    event.preventDefault();
    var cityNameInputEl = document.getElementById('city');
    var cityName = cityNameInputEl.value.trim()
    if (!cityName) {
        return;
    }

const apiUrlCity = `${baseURL}?q=${cityName}&appid=${apiKey}`;

fetch(apiUrlCity).then((response) => {
    response.json().then((data) => {
        console.log(data)
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
        console.log(fiveDayForecast)
        
        setCityName(cityName)
        getFiveDayWeatherForecast(data.city.coord.lat, data.city.coord.lon);
        console.log(data.list[0].dt)
        setCurrentForecast(data.list[0].dt, )
    })
})

}

function setCityName(cityName) {
    cityTitle.innerHTML = cityName;
    $('#today_date').text(today.format('[(]MMM D, YYYY[)]'))
}

function setCurrentForecast(date, temp, wind, humidity, icon) {
    var weatherDay0Date = document.querySelector('.weather_day_1 h3');
    weatherDay0Date.innerHTML = dayjs.unix(date).format('MMM D, YYYY');
}
