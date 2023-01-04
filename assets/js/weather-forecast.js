// Getting value of current hour from the Local Storage
const hour = localStorage.getItem('current hour');
console.log(hour);

// Values from the Local Storage
let city = localStorage.getItem('city');
let latitude = localStorage.getItem('latitude');
let longitude = localStorage.getItem('longitude');

$('#search-form').on('submit', function (e) {
	e.preventDefault();

	let city = $('#search-input').val().trim();

	if (city === '' || city === undefined) {
		alert('Please, input a city name');
		return;
	}

	capitalizeCityName(city);

	// Declare API key
	const APIKey = '1a374aa07ec0bd02e61afc3e13dab4e3';

	// Declare query URL
	const queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=en&units=metric&appid=${APIKey}`;

	$.ajax({
		type: 'GET',
		url: queryURL,
		success: function (response) {
			// Variable holding the response
			const forecast = response.list;
			console.log('--------------');
			console.log(forecast);
			console.log('--------------');
			// Array of the Five Days
			let fiveDaysForecast = [];
			// Array of the timestamps
			let timestampsForecast = [];

			// for...loop iterating over the list of the response object
			for (let i = 0; i < forecast.length; i++) {
				// Unix timestamp of the i forecast
				let timestamp = forecast[i].dt;

				// Conditional to retrieve data from the forecast array
				if (i === 0) {
					timestampsForecast.push(timestamp);
					// ----------------------
					console.log(timestamp);
					// ----------------------

					// Object of the current day
					let currentForecast = {
						city: city,
						date: moment.unix(timestamp).format('DD/MM/YY'),
						icon: response.list[i].weather[i].id,
						temperature: response.list[i].main.temp,
						humidity: response.list[i].main.humidity,
						'wind speed': response.list[i].wind.speed,
					};

					console.log('--------------');
					console.log(currentForecast);
					// console.log(response.list[i]);
					console.log('--------------');
				}
			}
		},
	});
});

// Arrow function to capitalize first letter of the city name
const capitalizeCityName = city => city.charAt(0).toUpperCase() + city.slice(1);
