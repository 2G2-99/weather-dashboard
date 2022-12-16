// Values from the Local Storage
let city = localStorage.getItem('city');
let latitude = localStorage.getItem('latitude');
let longitude = localStorage.getItem('longitude');

$('#search-form').on('submit', function (e) {
	e.preventDefault();

	// Declare API key
	const APIKey = 'API-key';

	// Declare query URL
	const queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=en&units=metric&appid=${APIKey}`;

	$.ajax({
		type: 'GET',
		url: queryURL,
		success: function (response) {
			console.log(response);

			// Variable holding the response
			const forecast = response.list;

			// for...loop iterating over the response object
			for (let i = 0; i < forecast.length; i++) {
				// Element of the list array
				const lapse = forecast[i];
				console.log(lapse);

				// Extraction of time from the string
				let timeLapse = Number(lapse.dt_txt.substr(11, 2));

				// Switch statement to check if current time is equal to a timeLapse
				switch (timeLapse) {
					case (timeLapse = 00):
						break;
					case (timeLapse = 03):
						break;
					case (timeLapse = 06):
						break;
					case (timeLapse = 09):
						break;
					case (timeLapse = 12):
						break;
					case (timeLapse = 15):
						break;
					case (timeLapse = 18):
						break;
					case (timeLapse = 21):
						break;

					default:
						console.log('Not time lapse');
						break;
				}
			}
		},
	});
});
