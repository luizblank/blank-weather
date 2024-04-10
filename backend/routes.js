const express = require('express');
const WeatherRoute = require('./routes/WeatherRoute')

module.exports = function(app) {
    app
        .use(express.json())
        .use('/weather', WeatherRoute)
}