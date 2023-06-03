const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const day = document.getElementById('day');
const today_date = document.getElementById('today_date');
const weather_main = document.getElementById('weather_main');

const getday = () => {
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  const d = new Date();
  let da = weekday[d.getDay()];
  day.innerText = da;

  let tarikh = d.getDate();
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let name = month[d.getMonth()];

  today_date.innerText = `${tarikh} ${name}`;
}

const getWeatherIconClass = (weatherMain) => {
      if (weatherMain === "Thunderstorm") {
        return "fa-bolt";
      } else if (weatherMain === "Drizzle") {
        return "fa-cloud-drizzle";
      } else if (weatherMain === "Rain") {
        return "fa-cloud-rain";
      } else if (weatherMain === "Snow") {
        return "fa-snowflake";
      } else if (weatherMain === "Mist" || weatherMain === "Smoke" || weatherMain === "Haze" || weatherMain === "Dust" || weatherMain === "Fog" || weatherMain === "Sand" || weatherMain === "Ash") {
        return "fa-smog";
      } else if (weatherMain === "Squall" || weatherMain === "Tornado") {
        return "fa-wind";
      } else if (weatherMain === "Clear") {
        return "fa-sun";
      } else if (weatherMain === "Clouds") {
        return "fa-cloud";
      } else {
        return "fa-question"; // Default icon if the weather condition is not recognized
      }
    }
    
    const applyColorScheme = (weatherMain) => {
      let colorScheme;
    
      if (weatherMain === "Thunderstorm" || weatherMain === "Drizzle" || weatherMain === "Rain") {
        colorScheme = "#2061cf"; // Blue color for rain-related conditions
      } else if (weatherMain === "Snow") {
        colorScheme = "#ffffff"; // White color for snow conditions
      } else if (weatherMain === "Mist" || weatherMain === "Smoke" || weatherMain === "Haze" || weatherMain === "Dust" || weatherMain === "Fog" || weatherMain === "Sand" || weatherMain === "Ash") {
        colorScheme = "#888888"; // Gray color for mist-related conditions
      } else if (weatherMain === "Squall" || weatherMain === "Tornado") {
        colorScheme = "#e6e600"; // Yellow color for wind-related conditions
      } else if (weatherMain === "Clear") {
        colorScheme = "#ffbf00"; // Orange color for clear conditions
      } else if (weatherMain === "Clouds") {
        colorScheme = "#a8a8a8"; // Light gray color for cloudy conditions
      } else {
        colorScheme = "#000000"; // Black color for unknown conditions
      }
    
      return colorScheme;
    }
    
    const updateWeatherData = (data) => {
      city_name.innerText = data.name;
      temp.innerText = data.main.temp;
      const weatherMain = data.weather[0].main;
      const iconClass = getWeatherIconClass(weatherMain);
      const colorScheme = applyColorScheme(weatherMain);
      temp_status.innerHTML = `<i class="fa-solid ${iconClass}" style="color: ${colorScheme};"></i>`;
      weather_main.innerText = weatherMain;
    }

const getInfo = async (e) => {
  e.preventDefault();
  const cityVal = cityName.value.trim();

  if (cityVal === "") {
    city_name.textContent = "Please enter a city name";
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=a23ed96b2e3169a12c54f93f1ff93465`;
      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];
      updateWeatherData(arrData[0]);
    } catch {
      city_name.innerText = `Please enter the city name properly`;
    }
  }
};

getday();
submitBtn.addEventListener("click", getInfo);
