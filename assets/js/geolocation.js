// # PSEUDOCODE

// * Create a submit event
$('#search-form').on('submit', function (e) {
	// use the prevent default method to stop the submit deleting the input
	e.preventDefault();

	// Register the value of the input
	let searchInput = $('#search-input').val();

	// Declare the API key
	const APIKey = '1a374aa07ec0bd02e61afc3e13dab4e3';

	// Declare query URL
	const queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&appid=${APIKey}`;

	// * Use the AJAX call
	$.ajax({
		type: 'GET',
		url: queryURL,
		success: function (response) {
			// Console Log of response Object
			console.log('--------------');
			console.log(response);
			console.log('--------------');

			// Name of city
			let cityName = response[0].name;
			// Latitude
			let latitude = response[0].lat;
			// Longitude
			let longitude = response[0].lon;

			// Save into the local storage
			localStorage.setItem('city', cityName);
			localStorage.setItem('latitude', latitude);
			localStorage.setItem('longitude', longitude);

			// * Keep the name in the input
			let cityInput = $('#search-input').val(
				localStorage.getItem('city')
			);
		},
	});
});
