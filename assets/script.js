// Define global variables
var APIKey = "6f7a7a5e0ad2378886fc5be733960e6d"; 
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

// Function to display the current weather conditions
function displayCurrentWeather(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=metric";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // Get the necessary data from the API response
    var cityName = response.name;
    var currentDate = moment().format("DD/MM/YYYY");
    var iconCode = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
    var temperature = response.main.temp;
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed;

    // Display the data in the HTML
    $("#today").empty();
    var cityEl = $("<h2>").text(cityName + " (" + currentDate + ")");
    var iconEl = $("<img>").attr("src", iconURL);
    var tempEl = $("<p>").text("Temperature: " + temperature + " °C");
    var humidityEl = $("<p>").text("Humidity: " + humidity + "%");
    var windEl = $("<p>").text("Wind Speed: " + windSpeed + " MPH");
    $("#today").append(cityEl, iconEl, tempEl, humidityEl, windEl);
  });
}

// Function to display the 5-day forecast
function displayForecast(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=metric";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // Get the necessary data from the API response
    var forecastList = response.list;
    var forecastArray = [];
    for (var i = 0; i < forecastList.length; i++) {
      var forecast = forecastList[i];
      if (forecast.dt_txt.indexOf("12:00:00") !== -1) {
        var forecastDate = moment(forecast.dt_txt).format("DD/MM/YYYY");
        var iconCode = forecast.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
        var temperature = forecast.main.temp;
        var humidity = forecast.main.humidity;
        forecastArray.push({
          date: forecastDate,
          iconURL: iconURL,
          temperature: temperature,
          humidity: humidity,
        });
      }
    }
  })}

    // Display the data in the HTML
    var cardEl = $("<div>").addClass("card bg-primary text-white");
    var cardBodyEl = $("<div>").addClass("card-body p-2");
    var dateEl = $("<h5>").text(forecast.date);
    var iconEl = $("<img>").attr("src", forecast.iconURL);
    var tempEl = $("<p>").text("Temp: " + forecast.temperature + " °C");
    var humidityEl = $("<p>").text("Humidity: " + forecast.humidity + "%");
    cardBodyEl.append(dateEl, iconEl, tempEl, humidityEl);
    cardEl.append(cardBodyEl);
    $("#forecast").append(cardEl);


//-----------------------------------------
// Get references to the HTML elements
const form = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const historyContainer = document.querySelector('#history');
const currentWeather = document.querySelector('#today');
const forecastWeather = document.querySelector('#forecast');

// Define a variable to store the API key
const apiKey = '6f7a7a5e0ad2378886fc5be733960e6d';

// Define global variable to store search history
let globalSearchHistory = [];

// Define function to handle form submission
function handleFormSubmit(event) {
  // Prevent default form submission behavior
  event.preventDefault();

  // Get search query from form input
  const query = searchInput.value.trim();

  // Add search query to search history
  const searchHistory = [...globalSearchHistory, query];

  // Update global search history variable
  globalSearchHistory = searchHistory;

  // Clear form input
  searchInput.value = '';

  // Display search history
  displaySearchHistory(searchHistory);
}

// Define function to display search history
function displaySearchHistory(searchHistory) {
  // Clear search history container
  historyContainer.innerHTML = '';

  // Create and append search history list element
  const list = document.createElement('ul');
  searchHistory.forEach(query => {
    const item = document.createElement('li');
    item.innerText = query;
    list.appendChild(item);
  });
  historyContainer.appendChild(list);
}

// Add event listener for form submission
form.addEventListener('submit', handleFormSubmit);

// Define an array to store the search history
let searchHistoryArray = [];

// Define a function to handle the form submission
function handleFormSubmit(event) {
  event.preventDefault();

  // Get the user input from the search form
  const searchQuery = searchInput.value.trim();

  // Fetch the current weather data for the searched city from the API
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      // Update the current weather HTML with the fetched data
      // (city name, date, icon, temperature, humidity, wind speed)
      currentWeather.innerHTML = `
        <h2>${data.name}</h2>
        <p>${moment().format('MMMM Do YYYY')}</p>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      `;
      
      // Fetch the forecast weather data for the searched city from the API
      return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&appid=${apiKey}&units=metric`);
    })
    .then(response => response.json())
    .then(data => {
      // Update the forecast weather HTML with the fetched data
      // (date, icon, temperature, humidity)
      forecastWeather.innerHTML = '';
      for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        forecastWeather.innerHTML += `
          <div class="col-md-2">
            <h5>${moment(forecast.dt_txt).format('MMM Do')}</h5>
            <img src="https://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="${forecast.description}">
            <p>${forecast.main.temp.toFixed(0)} &#8451;</p>
            <p>${forecast.main.humidity}%</p>
          </div>
        `;
      }
    })

}    





