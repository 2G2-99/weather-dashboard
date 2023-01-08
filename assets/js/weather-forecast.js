// # LOCAL STORAGE DATA
// // Getting value of current hour from the Local Storage
// const hour = localStorage.getItem('current hour');
// console.log(hour);

// // Values from the Local Storage
// let cityName = localStorage.getItem('city');
// let latitude = localStorage.getItem('latitude');
// let longitude = localStorage.getItem('longitude');

// # VARIABLES
// Empty array to store the searched cities
let searched = [];

// * Code block to retrieve searched cities from the Local Storage
$(document).ready(() => {
	var storedCities = JSON.parse(localStorage.getItem('cities'));
	if (storedCities !== null) {
		searched = storedCities;
	}
	// renderButtons(searched);
});

// * Event listener on all element with the class 'city'
$(document).on('click', '.city', function () {
	var city = $(this).attr('data-city');
	initForecast(city);
});

// # FUNCTIONS
// function to stores cities to Local Storage
function saveOnLocalStorage(searched) {
	localStorage.setItem('searched', JSON.stringify(searched));
}
// Function to render forecast of the current day
function renderCurrentForecast(fiveDaysForecast) {
	$('#today').empty();

	const currentDayForecast = fiveDaysForecast[0];
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
// Function to render forecast of the days ahead
function renderFutureForecast(fiveDaysForecast) {
	$('#forecast').empty();

	for (let i = 0; i < fiveDaysForecast.length; i++) {
		const day = fiveDaysForecast[i];

		if (i > 0) {
			let dayCard = $('<div>');
			dayCard.attr('class', 'card col px-1 py-2 m-2');

			let dateEl = $('<h4>').text(`${fiveDaysForecast[i].date} `);
			let iconEl = $('<img>').attr('src', fiveDaysForecast[i].icon);
			let temperatureEl = $('<p>').text(
				`${fiveDaysForecast[i].temperature} °C`
			);
			let humidityEl = $('<p>').text(
				`Humidity: ${fiveDaysForecast[i].humidity} %`
			);
			let windEl = $('<p>').text(
				`Wind: ${fiveDaysForecast[i]['wind speed']} Km/h`
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
// function that adds city to the searched array
function addCityToCities(city, fiveDaysForecast) {
	const cityName = fiveDaysForecast[0].city;
	let exist = false;

	searched.map(city => {
		if (city.city === cityName) {
			console.log(`city already exists`);
			exist = true;
			return;
		}
	});

	if (!exist) {
		console.log('Needs to be added');
		searched.push({
			city: cityName,
			forecast: fiveDaysForecast,
		});
	}

	console.log(searched);
}

// * function that initiates the Forecast API
function initForecast(cityName, latitude, longitude) {
	console.log(cityName);
	console.log(latitude, longitude);

	// Declare API key
	const APIKey = '1a374aa07ec0bd02e61afc3e13dab4e3';
	// Declare query URL
	const queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=en&units=metric&appid=${APIKey}`;

	$.ajax({
		type: 'GET',
		url: queryURL,
	}).then(response => {
		// Variable storing the response
		const forecast = response.list;
		// Array of the Five Days
		let fiveDaysForecast = [];

		// Iteration over the forecast array
		for (let i = 0; i < forecast.length; i += 8) {
			// Name of the city
			let name = response.city.name;
			// Unix timestamp of the i forecast
			let timestamp = forecast[i].dt;
			// Future forecasts
			let futureForecast = [];

			// Conditional to retrieve data from the forecast array
			if (i === 0) {
				// Object of the current day
				let currentForecast = {
					city: cityName,
					date: moment.unix(timestamp).format('DD/MM/YY'),
					icon: `http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png`,
					temperature: Math.round(response.list[i].main.temp),
					humidity: response.list[i].main.humidity,
					'wind speed': (response.list[i].wind.speed * 3.6).toFixed(
						2
					),
				};

				// Push the object of the current day as the first item of the array
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

				// Push every forecast ahead into the array
				fiveDaysForecast.push(futureForecast[i]);
			}
		}
		// console.log(fiveDaysForecast);

		renderCurrentForecast(fiveDaysForecast);
		renderFutureForecast(fiveDaysForecast);
		addCityToCities(cityName, fiveDaysForecast);
		saveOnLocalStorage(searched);
	});
}
