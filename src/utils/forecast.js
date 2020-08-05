const axios = require("axios")

const forecast = (cityName, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b5db01e02850014c9f735289ca583276`
    axios.get(url)
        .then(({ data }) => {
            const forecastData = `${data.weather[0].main}, with the temperature of ${data.main.temp} and the pressure of ${data.main.pressure} with humidity of ${data.main.humidity}`
            callback(undefined, forecastData)
        })
        .catch(error => {
            callback("Forecast - Unable to get the service from the Open weather" ,undefined)
        })
}

module.exports = forecast