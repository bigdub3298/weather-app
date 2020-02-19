import React, { useState, useEffect } from "react";

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
