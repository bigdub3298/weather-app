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
    const dayArray = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
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
          src={require(`icons/${weather.weather[0].icon}.png`)}
          alt={weather.weather[0].main}
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
