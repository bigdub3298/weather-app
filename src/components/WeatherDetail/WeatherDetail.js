import React from "react";
import "./WeatherDetail.scss";

const dateFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};

export default function WeatherDetail({ weather, date }) {
  const formatHour = hour => {
    const timeAbbreviation = hour > 11 ? "PM" : "AM";

    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${formattedHour}:00 ${timeAbbreviation}`;
  };

  if (weather) {
    return (
      <div className="weather-detail">
        <div>
          <h2 className="weather-detail__header">{`${date.toLocaleDateString(
            undefined,
            dateFormatOptions
          )}`}</h2>
          <h3 className="weather-detail__subheader">{`${formatHour(
            date.getHours()
          )}`}</h3>
        </div>
        <img
          src={require(`icons/${weather.weather[0].icon}-large.png`)}
          alt={weather.weather[0].main}
        />
        <div className="weather-detail__body">
          <p className="weather-detail__currTemp">
            {Math.round(weather.temp.day)}&deg;
          </p>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
