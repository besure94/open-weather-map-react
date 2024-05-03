import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import { getWeather } from '../api-call/weather-api-call';

function WeatherForecast() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [city, setCity] = useState("");
  const [selectedForecastDetails, setSelectedForecastDetails] = useState(null);

  useEffect(() => {
    async function getWeatherApiData() {
      setError(null);
      try {
        const response = await getWeather(city);
        setWeatherForecast(response.list);
        setIsLoaded(true);
      } catch (error) {
        setError(error.message);
        setIsLoaded(false);
      }
    }

    if (city) {
      getWeatherApiData(city);
    }
    // async function getWeatherApiData() {
    //   setError(null);
    //   const result = await getWeather(city);
    //   if (result instanceof Error) {
    //     setError(result.message);
    //     setIsLoaded(false);
    //     return;
    //   }
    //   setWeatherForecast(result.list);
    //   setIsLoaded(true);
    // }

    // if (city) {
    //   getWeatherApiData(city);
    // }
  }, [city]);

  const handleFormSubmission = (formInput) => {
    const { city } = formInput;
    setCity(city);
  }

  const handleForecastClick = (selectedForecast) => {
    setSelectedForecastDetails(selectedForecast === selectedForecastDetails ? null : selectedForecast);
  };

  return (
    <div>
      <h1>Get Weather Forecasts From Anywhere!</h1>
      <br/>
      <SearchForm onFormSubmission={handleFormSubmission}/>
      {error && <h2>Error: {error}</h2>}
      {isLoaded && (
        <React.Fragment>
          <br/>
          <h2>Five Day Forecast for {city}</h2>
          <p>Each day contains the forecast in 3 hour steps.</p>
          <br/>
          <hr/>
          {weatherForecast.map((forecast, index) =>
            <div key={index}>
              <h3 onClick={() => handleForecastClick(index)}>Date: {forecast.dt_txt}</h3>
              <p>{forecast.weather[0].description.charAt(0).toUpperCase() + forecast.weather[0].description.slice(1)}</p>
              {selectedForecastDetails === index && (
                <div className='table-container'>
                <div className='row justify-content-center'>
                  <div className='col-6'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th colSpan="4">Forecast Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='forecast-details'>
                          <th>Current Temp (Celsius)</th>
                          <td>{((forecast.main.temp - 32) / 1.8).toFixed(1)}{'\u00b0'}
                          <br/>
                          Feels like {((forecast.main.feels_like - 32) / 1.8).toFixed(1)}{'\u00b0'}
                          </td>
                        </tr>
                        <tr className='forecast-details'>
                          <th>Current Temp (Fahrenheit)</th>
                          <td>{forecast.main.temp.toFixed(1)}{'\u00b0'}
                          <br/>
                          Feels like {forecast.main.feels_like.toFixed(1)}{'\u00b0'}
                          </td>
                        </tr>
                        <tr className='forecast-details'>
                          <th>High/Low (Celsius)</th>
                          <td>{((forecast.main.temp_max - 32) / 1.8).toFixed(1)}{'\u00b0'}/{((forecast.main.temp_min - 32) / 1.8).toFixed(1)}{'\u00b0'}</td>
                        </tr>
                        <tr className='forecast-details'>
                          <th>High/Low (Fahrenheit)</th>
                          <td>{forecast.main.temp_max.toFixed(1)}{'\u00b0'}/{forecast.main.temp_min.toFixed(1)}{'\u00b0'}</td>
                        </tr>
                        <tr className='forecast-details'>
                          <th>Humidity</th>
                          <td>{forecast.main.humidity}%</td>
                        </tr>
                        <tr className='forecast-details'>
                          <th>Wind speed (kmph)</th>
                          <td>{(forecast.wind.speed * 1.609).toFixed(1)}</td>
                        </tr>
                        <tr className='forecast-details'>
                          <th>Wind speed (mph)</th>
                          <td>{forecast.wind.speed.toFixed(1)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              )}
              <hr/>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  )
}

export default WeatherForecast;