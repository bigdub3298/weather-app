import React, { useState, useEffect } from "react";
import openWeather from "api/openWeather";

export default function WeatherDisplay() {
  const [coords, setCoords] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const getCoords = () => {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude: lat, longitude: lon } = position.coords;
        setCoords({ lat, lon });
      },
      err => {
        setErrorMessage(err.message);
      }
    );
  };

  useEffect(() => {
    getCoords();
  }, []);

  useEffect(() => {
    if (coords) {
      openWeather
        .get("/daily", {
          params: {
            lat: coords.lat,
            lon: coords.lon,
            units: "imperial",
            appid: "970beadc4b90b64b0f5c6c58e0d79cc4"
          }
        })
        .then(res => console.log(res.data));
    }
  }, [coords]);

  const renderContent = () => {
    if (errorMessage) {
      return <div>Error: {errorMessage}</div>;
    } else if (coords) {
      return (
        <div>
          <h1>Lat: {coords.lat}</h1>
          <h1>Lat: {coords.lon}</h1>
        </div>
      );
    } else {
      return (
        <div className="loader">
          <div className="loader__content">Loading...</div>
        </div>
      );
    }
  };

  return <div className="weather-display">{renderContent()}</div>;
}
