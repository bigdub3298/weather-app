import React, { useState, useEffect, useRef } from "react";
import openWeather from "api/openWeather";
import WeatherCard from "components/WeatherCard/WeatherCard";
import WeatherDetail from "components/WeatherDetail/WeatherDetail";
import Autocomplete from "react-google-autocomplete";
import "./WeatherDisplay.scss";

require("dotenv").config();

const searchBarStyles = {
  width: "70%",
  marginBottom: "0.5rem",
  borderRadius: "2px",
  padding: "5px",
  border: "1px solid #eee"
};

export default function WeatherDisplay() {
  const [coords, setCoords] = useState(null);
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const dateRef = useRef(new Date());

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

  const getWeatherData = coords => {
    openWeather
      .get("/daily", {
        params: {
          lat: coords.lat,
          lon: coords.lon,
          units: "imperial",
          appid: process.env.REACT_APP_API_KEY
        }
      })
      .then(res => {
        setWeatherData(res.data);
        setCity(res.data.city.name);
      });
  };

  useEffect(() => {
    getCoords();
  }, []);

  useEffect(() => {
    if (coords) {
      getWeatherData(coords);
    }
  }, [coords]);

  const renderCards = () => {
    let today = new Date();

    return weatherData.list.map((weather, index) => {
      const date = index === 0 ? today : today.setDate(today.getDate() + 1);

      return (
        <WeatherCard
          selectedDay={selectedDay}
          onClick={() => {
            dateRef.current = new Date(date);
            setSelectedDay(index);
          }}
          weather={weather}
          date={new Date(date)}
          key={index}
          index={index}
        />
      );
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
            <div className="weather-display__search-bar">
              <Autocomplete
                style={searchBarStyles}
                onPlaceSelected={place => {
                  console.log(place);
                  const lat = place.geometry.location.lat();
                  const lon = place.geometry.location.lng();
                  setCoords({ lat, lon });
                  setCity(place.address_components[0].long_name);
                }}
              />
            </div>
            <h1 className="weather-display__title">{city}</h1>
            <div className="weather-cards">{renderCards()}</div>
            <WeatherDetail
              weather={weatherData.list[selectedDay]}
              date={dateRef.current}
            />
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
  return <>{renderContent()}</>;
}
