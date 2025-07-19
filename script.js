const apiKey = "d7934e2182d13c3bede0b3ccbc23e45a";

function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
  fetchWeatherData(https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey});
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeatherData(https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey});
    }, () => {
      alert("Unable to retrieve your location.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function fetchWeatherData(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => {
      document.getElementById("weatherResult").innerHTML = "Error fetching weather data.";
      console.error(error);
    });
}

function displayWeather(data) {
  if (data.cod !== 200) {
    document.getElementById("weatherResult").innerHTML = "City not found.";
    return;
  }
  const weatherHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
  document.getElementById("weatherResult").innerHTML = weatherHTML;
}