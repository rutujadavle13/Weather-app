const apiKey = "67d213c78ca82611c20c9aa79557a6d4"; // Replace with your real API key
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkweather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + "km/h";

    const condition = data.weather[0].main;

    // Map weather condition to image file
    const icons = {
      Clear: "clear.png",
      Clouds: "clouds.png",
      Rain: "rain.png",
      Drizzle: "drizzle.png",
      Mist: "mist.png",
      Fog: "fog.png",
      Haze: "haze.png",
      Snow: "snow.png",
      Thunderstorm: "thunderstorm.png",
      Smoke: "mist.png",
      Dust: "mist.png",
      Sand: "mist.png",
      Ash: "mist.png",
      Tornado: "thunderstorm.png",
    };

    //Use clear.png if condition not found
    const iconFile = icons[condition] || "clear.png";
    const iconPath = `images/${iconFile}`;
    weatherIcon.src = iconPath + `?v=${Date.now()}`;

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) checkweather(city);
});

checkweather("Aurangabad");
