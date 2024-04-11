import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { SECRET } from './env';
import axios from 'axios';
import './App.css';

function App() {
  const [position, setPosition] = useState(null);
  const [weather, setWeather] = useState(null);

  function setLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
      });
      return;
    }
    console.log("Geolocation is not available in your browser.");
  }

  async function getWeather() {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(position), SECRET).toString();
    const response = await axios.post('http://localhost:8080/weather/', {
      position: encrypted
    });

    const decrypted = CryptoJS.AES.decrypt(response.data.weather, SECRET).toString(CryptoJS.enc.Utf8);
    const new_weather = JSON.parse(decrypted);
    setWeather(new_weather);
  }

  useEffect(() => {
    setLocation();
  }, []);

  useEffect(() => {
    if (position != null) {
      async function fetchData() {
        await getWeather()
      };
      fetchData();
    }
  }, [position])

  return (
    <div>
      {weather == null ? 'not loaded' : weather.currentConditions.cloudcover}
    </div>
  );
}

export default App;
