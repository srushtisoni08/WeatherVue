async function getWeather() {
    const cityInput = document.getElementById("city-input").value.trim();
    const weatherImage = document.getElementById("weather-image");
    const temperature = document.getElementById("temperature");
    const humidityValue = document.getElementById("humidity-value");
    const windSpeed = document.getElementById("wind-speed");

    // Check if city input is empty
    if (!cityInput) {
        alert("Please enter a city name.");
        return;
    }

    const apiKey = "098c4282c3f40113ece14982f80fb4d6"; // Replace with your valid OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found or invalid request.");
        }
        const data = await response.json();

        // Update DOM elements with weather data
        temperature.innerHTML = `${Math.round(data.main.temp)} &deg; C`;
        document.querySelector(".city").innerText = data.name;
        humidityValue.innerText = `${data.main.humidity}%`;
        windSpeed.innerText = `${data.wind.speed} km/h`;

        // Update weather image based on condition
        const weatherCondition = data.weather[0].main.toLowerCase();
        weatherImage.src = getWeatherImage(weatherCondition);

    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        alert("Failed to fetch weather data. Please check the city name and try again.");
    }
}

// Helper function for weather images
function getWeatherImage(condition) {
    const images = {
        clear: "default.png",
        clouds: "default.png",
        rain: "thunderstorm.png",
        snow: "rain .png",
        mist: "wind.png",
        fog: "wind.png",
        haze: "thunderstorm.png"
    };
    return images[condition] || "default.png";
}
