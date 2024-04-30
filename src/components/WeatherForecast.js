import React, { useState, useEffect } from 'react';

function WeatherForecast() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [weatherForecast, setWeatherForecast] = useState([]);

  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?&units=imperial&id=524901&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          return response.json();
        }
      })
      .then((jsonifiedResponse) => {
        setWeatherForecast(jsonifiedResponse.list)
        console.log(jsonifiedResponse);
        setIsLoaded(true)
      })
      .catch((error) => {
        setError(error.message)
        setIsLoaded(true)
      });
  }, [])

  console.log(weatherForecast);
  if (error) {
    return <h1>Error: {error}</h1>;
  } else if (!isLoaded) {
    return <h1>...Loading Weather...</h1>;
  } else {
    return (
      <React.Fragment>
        <h1>Weather Forecast</h1>
        <ul>
          {weatherForecast.map((forecast, index) =>
            <li key={index}>
              <h3>Date: {forecast.dt_txt}</h3>
              <p>Temperature: {forecast.main.temp}</p>
              <p>Description: {forecast.weather[0].description}</p>
            </li>
          )}
        </ul>
      </React.Fragment>
    )
  }
}

export default WeatherForecast;