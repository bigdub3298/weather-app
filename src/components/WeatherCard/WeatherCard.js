import React from "react";
import "./WeatherCard.scss";

export default function WeatherCard({ weather, day }) {
  const dayFromNumber = n => {
    const dayArray = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    return dayArray[n];
  };

  if (weather) {
    return (
      <div className="weather-card">
        <div className="weather-card_header">
          <h3 className="weather-card__day">{dayFromNumber(day)}</h3>
        </div>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          className="weather-card__image"
          alt="cloudy"
        />
        <div className="weather-card__body">
          <div className="weather-card_high">
            {Math.round(weather.temp.max)}&deg;
          </div>
          <div className="weather-card_low">
            {Math.round(weather.temp.min)}&deg;
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
