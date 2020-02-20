import React, { useState, useEffect } from "react";
import openWeather from "api/openWeather";
import WeatherCard from "components/WeatherCard/WeatherCard";
import "./WeatherDisplay.scss";

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
            units: "imperial",
            appid: process.env.REACT_APP_API_KEY
          }
        })
        .then(res => setWeatherData(res.data));
    }
  }, [coords]);

  const renderCards = () => {
    let today = new Date();

    return weatherData.list.map((weather, index) => {
      const date = index === 0 ? today : today.setDate(today.getDate() + 1);

      return <WeatherCard weather={weather} date={new Date(date)} key={date} />;
    });
  };

  const renderContent = () => {
    if (errorMessage) {
      console.log(`Error:`, errorMessage);
      return (
        <div className="loader">
          <div className="loader__content">
            <h1>Please allow location</h1>
          </div>
        </div>
      );
    } else if (weatherData) {
      return (
        <div className="container">
          <div className="weather-display">
            <h1 className="weather-display__title">{weatherData.city.name}</h1>
            <div className="weather-cards">{renderCards()}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="loader">
          <div className="loader__content">
            <h1>Loading...</h1>
            <br />
            <h3>Waiting to get user's location</h3>
          </div>
        </div>
      );
    }
  };
  return <div>{renderContent()}</div>;
}
