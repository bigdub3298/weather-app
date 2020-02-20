import React, { useState, useEffect } from "react";
import openWeather from "api/openWeather";
import WeatherCard from "components/WeatherCard/WeatherCard";

require("dotenv").config();

export default function WeatherDisplay() {
  const [coords, setCoords] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [weatherData, setWeatherData] = useState(null);

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
            cnt: 6,
            units: "imperial",
            appid: process.env.REACT_APP_API_KEY
          }
        })
        .then(res => setWeatherData(res.data));
    }
  }, [coords]);

  const renderCards = () => {
    let today = new Date().getDay();

    return weatherData.list.map((weather, index) => {
      const day = (today + index) % 7;

      return <WeatherCard weather={weather} day={day} key={day} />;
    });
  };

  const renderContent = () => {
    if (errorMessage) {
      return <div>Error: {errorMessage}</div>;
    } else if (weatherData) {
      return (
        <div>
          <h1>{weatherData.city.name}</h1>
          {renderCards()}
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
