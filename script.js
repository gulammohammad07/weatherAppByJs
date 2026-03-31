// Your provided API key (do not share this publicly)
const apiKey = "183eed4f1de0f7ae57fef236920404fd";

const searchBtn = document.getElementById("srch-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weatherInfo");

// Show loading message
function showLoading() {
}

// Show error message
function showError(msg) {
  weatherInfo.innerHTML = `<p>❌ ${msg}</p>`;
}

// 🌤 Fetch weather data by city name
async function getWeatherByCity(city) {
  const q = encodeURIComponent(city); // handle spaces in city names
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${apiKey}&units=metric`;

  try {
    showLoading();

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        showError("City not found! Please check the spelling.");
      } else if (response.status === 401) {
        showError("Invalid API Key. Please check your key.");
      } else {
        showError("Something went wrong. Try again later.");
      }
      return;
    }

    const data = await response.json();

    const weatherHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
      <h2>${Math.round(data.main.temp)}°C</h2>
      <p>${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;

    weatherInfo.innerHTML = weatherHTML;

  } catch (error) {
    console.error(error);
    showError("Unable to fetch data. Check your internet connection.");
  }
}

// 🔍 Search button click
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name 😊");
    return;
  }
  getWeatherByCity(city);
  cityInput.value="";
});


// 🔎 Press Enter to search
cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
