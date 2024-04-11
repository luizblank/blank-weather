const express = require('express');
const WeatherController = require('../controllers/WeatherController')
const route = express.Router();

module.exports = route
    .post('/', WeatherController.getWeather);