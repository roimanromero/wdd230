const apiKey = '5752a4053b45dfc8b4e1fe09df8c1ec5';
const city = 'Barranquilla';
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

async function getWeather() {
    try {
        const response = await fetch(weatherURL);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const tempElement = document.getElementById('temp');
    const descElement = document.getElementById('desc');
    const iconElement = document.getElementById('weather-icon');

    if (data && data.weather && data.weather.length > 0) {
        tempElement.textContent = data.main.temp.toFixed(1); // Display temperature
        descElement.textContent = data.weather[0].description; // Display weather description
        iconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`; // Display weather icon
    } else {
        tempElement.textContent = 'N/A';
        descElement.textContent = 'N/A';
        iconElement.src = ''; // Clear icon if no data
    }
}

getWeather();
