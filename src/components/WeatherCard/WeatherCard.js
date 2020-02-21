import React from "react";
import "./WeatherCard.scss";

export default function WeatherCard({
  weather,
  date,
  onClick,
  selectedDay,
  index
}) {
  const dayFromNumber = n => {
    const dayArray = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    return dayArray[n];
  };

  if (weather) {
    return (
      <div
        onClick={onClick}
        className={
          index === selectedDay ? "weather-card selected" : "weather-card"
        }
      >
        <div>
          <h3 className="weather-card__header">
            {dayFromNumber(date.getDay())}
          </h3>
          <h4 className="weather-card__subheader">{`${date.getMonth() +
            1}-${date.getUTCDate()}`}</h4>
        </div>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          className="weather-card__image"
          alt="cloudy"
        />
        <div className="weather-card__body">
          <div className="weather-card__high">
            {Math.round(weather.temp.max)}&deg;
          </div>
          <div className="weather-card__low">
            {Math.round(weather.temp.min)}&deg;
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
