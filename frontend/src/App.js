import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  function setLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        );
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }

  async function getWeather() {
    const response = await axios.get('http://localhost:8080/weather/', {
      
    });
    return response;
  }

  useEffect(() => {
    setLocation();
  }, []);

  return (
    <div>
      {position.latitude}
      <button onClick={() => getWeather()}></button>
    </div>
  );
}

export default App;
