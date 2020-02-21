import React from "react";

export default function WeatherDetail({ weather }) {
  if (weather) {
    return (
      <div className="weather-detail">
        <img
          src={require(`icons/${weather.weather[0].icon}-large.png`)}
          alt=""
        />
      </div>
    );
  } else {
    return <div></div>;
  }
}
