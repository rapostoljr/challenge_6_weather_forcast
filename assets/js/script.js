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

const apiUrlCity = `${baseURL}?q=${cityName}&limit=1&appid=${apiKey}`;

fetch(apiUrlCity).then((response) => {
    response.json().then((data) => {
        if (!response.ok) {
            return alert ('No response from server.');
        }
    
        if (!data.list.length) {
            return alert(`Could not find coordinates for ${cityName}`);
        }

        setCityName(cityName)
        getFiveDayWeatherForecast(data.city.coord.lat, data.city.coord.lon);
    })

    // if (response.ok) {
    //     setCityName(cityName);
    //     response.json().then(function(data){
    //         console.log(data);
    //         console.log(`this is the length ${data.list.length}`);
    //         if (!data.list.length) {
    //             return alert(`Could not find coordinates for ${cityName}`);
    //         } else if (data.list.length) {
    //             console.log(`City: ${data.city.name}, Lat: ${data.city.coord.lat}, Lon: ${data.city.coord.lon}`)
    //             getFiveDayWeatherForecast(data.city.coord.lat, data.city.coord.lon);
    //         } else {
    //             alert("Please enter a valid response.");
    //         }
    //     })
    // }

})


}

function setCityName(cityName) {
    cityTitle.innerHTML = cityName;
    $('#today_date').text(today.format('[(]MMM D, YYYY[)]'))
}
