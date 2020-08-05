const axios = require("axios")

const geocode = (cityName, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b5db01e02850014c9f735289ca583276`
    axios.get(url)
        .then(({ data }) => {
            const geocodeData = `${cityName}, location coordination for lon is ${data.coord.lon} and lat is ${data.coord.lat}`
            callback(undefined, geocodeData)
        })
        .catch(error => {
            callback("Geocode - Unable to get the service from the Open weather", undefined)
        })
}

module.exports = geocode