function getInfo() {
    const newCity = document.getElementById("csearch").value;
    const cityName = document.getElementById("cityName");
    cityName.textContent = newCity;

    localStorage.setItem("lastSearchedCity", newCity);

fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + newCity + "&appid=824ed3ede75e63e1cdf6cd3e887f098e")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        const mainTemp = document.getElementById("main-temp");
        const mainWind = document.getElementById("main-wind");
        const mainHumi = document.getElementById("main-humi");

        const tempKelvin = data.list[0].main.temp;
        const tempFahrenheit = ((tempKelvin - 273.15) * 9/5) + 32;

        mainTemp.textContent = "Temp: " + tempFahrenheit.toFixed(2) + "°F"; 
        mainWind.textContent = "Wind: " + data.list[0].wind.speed + " m/s"; 
        mainHumi.textContent = "Humidity: " + data.list[0].main.humidity + "%";

        const forecastData = data.list.slice(0, 5);

            for (let i = 0; i < forecastData.length; i++) {
                const forecastDate = document.getElementById("forecast-date" + (i + 1));
                const date = new Date();
                date.setDate(date.getDate() + i);
                forecastDate.textContent = "Date: " + date.toDateString();

                const forecastTemp = document.getElementById("forecast-temp" + (i + 1));
                const tempInKelvin = forecastData[i].main.temp;
                const tempInFahrenheit = ((tempInKelvin - 273.15) * 9 / 5) + 32;
                forecastTemp.textContent = "Temp: " + tempInFahrenheit.toFixed(2) + "°F";

                const forecastHumi = document.getElementById("forecast-humi" + (i + 1));
                forecastHumi.textContent = "Humidity: " + forecastData[i].main.humidity + "%";

                const forecastIcon = document.getElementById("forecast-icon" + (i + 1));
                const iconCode = forecastData[i].weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
                forecastIcon.src = iconUrl;
                forecastIcon.alt = forecastData[i].weather[0].description;
            }
        })
        .catch(function (error) {
            console.error("Error fetching data:", error);
        });

}

const cityButtons = document.querySelectorAll(".citybtn");

cityButtons.forEach(function (cityButton) {
    cityButton.addEventListener("click", function () {
        const cityName = cityButton.id;
        document.getElementById("csearch").value = cityName;
        getInfo();
    });
});
