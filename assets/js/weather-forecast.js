// Getting value of current hour from the Local Storage
const hour = localStorage.getItem('current hour');
console.log(hour);

// Values from the Local Storage
let city = localStorage.getItem('city');
let latitude = localStorage.getItem('latitude');
let longitude = localStorage.getItem('longitude');

$('#search-form').on('submit', e => {
	e.preventDefault();

	let city = $('#search-input').val().trim();

	if (city === '' || city === undefined) {
		alert('Please, input a city name');
		return;
	}

	// Declare API key
	const APIKey = '1a374aa07ec0bd02e61afc3e13dab4e3';

	// Declare query URL
	const queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=en&units=metric&appid=${APIKey}`;

	$.ajax({
		type: 'GET',
		url: queryURL,
	}).then(response => {
		// Variable holding the response
		const forecast = response.list;
		// Array of the Five Days
		let fiveDaysForecast = [];

		// for...loop iterating over the list of the response object
		for (let i = 0; i < forecast.length; i += 8) {
			// Unix timestamp of the i forecast
			let timestamp = forecast[i].dt;
			// Future forecasts
			let futureForecast = [];

			// Conditional to retrieve data from the forecast array
			if (i === 0) {
				// Object of the current day
				let currentForecast = {
					city: city,
					date: moment.unix(timestamp).format('DD/MM/YY'),
					icon: `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`,
					temperature: Math.round(response.list[i].main.temp),
					humidity: response.list[i].main.humidity,
					'wind speed': (response.list[i].wind.speed * 3.6).toFixed(
						2
					),
				};

				fiveDaysForecast.push(currentForecast);
			} else if (i > 0) {
				futureForecast[i] = {
					date: moment.unix(timestamp).format('DD/MM/YY'),
					icon: `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`,
					temperature: Math.round(response.list[i].main.temp),
					humidity: response.list[i].main.humidity,
					'wind speed': (response.list[i].wind.speed * 3.6).toFixed(
						2
					),
				};

				fiveDaysForecast.push(futureForecast[i]);
			}
		}

		localStorage.setItem('forecastArray', JSON.stringify(fiveDaysForecast));

		displayCurrentForecast();
		displayFutureForecast();
	});
});

function displayCurrentForecast() {
	$('#today').empty();

	const forecastArray = JSON.parse(localStorage.getItem('forecastArray'));
	const currentDayForecast = forecastArray[0];
	const titleEl = $('<h2>').text(
		`${currentDayForecast.city} ${currentDayForecast.date} `
	);
	const iconEl = $('<img>').attr('src', currentDayForecast.icon);
	const temperatureEl = $('<p>').text(`${currentDayForecast.temperature} °C`);
	const humidityEl = $('<p>').text(
		`Humidity: ${currentDayForecast.humidity} %`
	);
	const windEl = $('<p>').text(
		`Wind: ${currentDayForecast['wind speed']} Km/h`
	);

	$('#today').append(titleEl, iconEl, temperatureEl, humidityEl, windEl);
}
function displayFutureForecast() {
	$('#forecast').empty();

	const forecastArray = JSON.parse(localStorage.getItem('forecastArray'));

	for (let i = 0; i < forecastArray.length; i++) {
		const day = forecastArray[i];

		if (i > 0) {
			let dayCard = $('<div>');
			dayCard.attr('class', 'card col px-1 py-2 m-2');

			let dateEl = $('<h4>').text(`${forecastArray[i].date} `);
			let iconEl = $('<img>').attr('src', forecastArray[i].icon);
			let temperatureEl = $('<p>').text(
				`${forecastArray[i].temperature} °C`
			);
			let humidityEl = $('<p>').text(
				`Humidity: ${forecastArray[i].humidity} %`
			);
			let windEl = $('<p>').text(
				`Wind: ${forecastArray[i]['wind speed']} Km/h`
			);

			$(dayCard).append(
				dateEl,
				iconEl,
				temperatureEl,
				humidityEl,
				windEl
			);

			$('#forecast').append(dayCard);
		}
	}
}
