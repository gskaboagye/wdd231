const apiKey = "f061f1ffd565db11d1db9b1ac62a5889";  
const city = "Accra";
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

async function getWeather() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Current Weather
    document.getElementById("current-temp").textContent = `🌡️ ${data.list[0].main.temp}°C`;
    document.getElementById("current-desc").textContent = data.list[0].weather[0].description;

    // 3-Day Forecast
    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";

    // Grab 3 forecast points, 24 hrs apart (8 * 3-hour intervals)
    for (let i = 8; i <= 24; i += 8) {
      const day = new Date(data.list[i].dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
      const temp = data.list[i].main.temp;
      forecastDiv.innerHTML += `<p>${day}: ${temp}°C</p>`;
    }
  } catch (error) {
    console.error("Weather fetch failed:", error);
    document.getElementById("current-temp").textContent = "Weather unavailable";
    document.getElementById("current-desc").textContent = "";
  }
}

getWeather();
