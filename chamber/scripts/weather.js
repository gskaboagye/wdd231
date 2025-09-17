const apiKey = "f061f1ffd565db11d1db9b1ac62a5889"; 
const city = "Accra";
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${Accra}&units=metric&appid=${f061f1ffd565db11d1db9b1ac62a5889}`;

async function getWeather() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Current Weather
    document.getElementById("current-temp").textContent = `🌡️ ${data.list[0].main.temp}°C`;
    document.getElementById("current-desc").textContent = data.list[0].weather[0].description;

    // 3-Day Forecast
    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";
    for (let i = 8; i <= 24; i += 8) { // approx 24-hour intervals
      const day = new Date(data.list[i].dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
      const temp = data.list[i].main.temp;
      forecastDiv.innerHTML += `<p>${day}: ${temp}°C</p>`;
    }
  } catch (error) {
    document.getElementById("current-temp").textContent = "Weather unavailable";
  }
}

getWeather();
