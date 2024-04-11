const CryptoJS = require('crypto-js');
const axios = require('axios');
require('dotenv').config();

module.exports = class WeatherController
{
    static async getWeather(req, res)
    {
        const secret = process.env.SECRET;

        const decrypted = CryptoJS.AES.decrypt(req.body.position, secret).toString(CryptoJS.enc.Utf8);
        const position = JSON.parse(decrypted)
        
        const weather = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${position.latitude},${position.longitude}?key=${process.env.KEY}`);

        const weather_string = JSON.stringify(weather.data);
        const encrypted = CryptoJS.AES.encrypt(weather_string, secret).toString();

        return res.status(200).send({ message: 'API request was a success', weather: encrypted});
    }
}