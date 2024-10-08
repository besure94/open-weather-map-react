import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function HourlyForecast(props) {
  const { weatherApiObject, locationLocalTime, onRoundingTimeToHour, onConvertingTimeFormats, onDisplayingUpdated24HrForecast } = props;
  const [twentyFourHourForecast, setTwentyFourHourForecast] = useState([]);

  useEffect(() => {
    const merged3DayForecastArray = weatherApiObject.forecast.forecastday.flatMap(day => day.hour);

    const roundedLocalTime = onRoundingTimeToHour(locationLocalTime);

    const formattedForecastTimes = onConvertingTimeFormats(merged3DayForecastArray);

    const newTwentyFourHourForecast = onDisplayingUpdated24HrForecast(formattedForecastTimes, roundedLocalTime);
    setTwentyFourHourForecast(newTwentyFourHourForecast);

  }, [weatherApiObject, locationLocalTime]);

  return (
    <React.Fragment>
      <br/>
      <br/>
      <div className='weather-forecast'>
        <div className='location-weather-forecast'>
          <h4>Hourly Forecast</h4>
        </div>
        <br/>
        <div className="hourly-forecast">
          <React.Fragment>
            {twentyFourHourForecast.map((hour, index) =>
              <div key={index} className="hour">
                <div className="hour-details">
                  <h6>{hour.temp_f}{'\u00b0'}</h6>
                  <img src={hour.condition.icon} className="hourly-icon" alt="An icon symbolizing current hourly weather condition."/>
                  <h6>{hour.time}</h6>
                </div>
              </div>
            )}
          </React.Fragment>
        </div>
      </div>
    </React.Fragment>
  )
}

HourlyForecast.propTypes = {
  weatherApiObject: PropTypes.object,
  onRoundingTimeToHour: PropTypes.func,
  onConvertingTimeFormats: PropTypes.func,
  onDisplayingUpdated24HrForecast: PropTypes.func
}

export default HourlyForecast;