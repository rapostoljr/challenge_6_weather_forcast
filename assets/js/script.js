const searchButtonClicked = document.getElementById('search_button')
var cityTitle = document.getElementById('name_of_city')

var today = dayjs();

searchButtonClicked.addEventListener("click", function(event) {
    event.preventDefault();
    var cityNameInputEl = document.getElementById('city');
    var cityName = cityNameInputEl.value

    const apiKey = '32fc4ef284ffcafc2edc15beea698a19';
    const apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&limit=5&appid=' + apiKey;


    fetch(apiUrl).then(function (response) {
        console.log(response)
        if (response.ok) {
            cityTitle.innerHTML = cityName;
            $('#today_date').text(today.format('[(]MMM D, YYYY[)]'))
            response.json().then(function(data){
                console.log(data);
            })
        } else {
            alert("Please enter a valid response.")
        }
            console.log(response.status);
    })
})

