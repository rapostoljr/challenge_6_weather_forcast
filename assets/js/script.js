var searchButtonClicked = document.getElementById('search_button')

searchButtonClicked.addEventListener("click", function(event) {
    event.preventDefault();
    var cityNameInputEl = document.getElementById('city');
    var cityName = cityNameInputEl.value

    const apiKey = '32fc4ef284ffcafc2edc15beea698a19';
    const apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&limit=5&appid=' + apiKey;


    fetch(apiUrl).then(function (response) {
        console.log(response)
        if (response.ok) {
            response.json().then(function(data){
                console.log(data);
            })
        }
            console.log(response.status);
    })
})

