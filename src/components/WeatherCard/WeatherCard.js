import React from "react";

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
          <div className="weather-card_high">{weather.temp.max.toFixed(2)}</div>
          <div className="weather-card_low">{weather.temp.min.toFixed(2)}</div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
