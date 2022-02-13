import React from 'react';
import './FutureDetail.css'

export default function FutureDetail({ weatherData }) {
  console.log(weatherData)
  function convertMMtoIn (mm) {
    return (mm / 25.4).toFixed(2)
  }

  return (
    <>
    <div className="FutureDetail">
      <div className="row justify-content-center">
      <h4>Detail View for {weatherData.day}</h4>
      <img src={weatherData.icon}
      alt={`an icon depicting the weatherData as: ${weatherData.desc}`} />
      <span id="description" className="text-center">
        {weatherData.desc}
      </span>
      <div className="col" id="details">
        <ul>
          <li>Low: {weatherData.tempMin}°F</li>
          <li>High: {weatherData.tempMax}°F</li>
          <li>Humidity: {weatherData.humidity}%</li>
          {weatherData.rain ?
             <li>Rain: {convertMMtoIn(weatherData.rain)} inches expected</li> : null}
          {weatherData.snow ?
            <li>Snow: {convertMMtoIn(weatherData.snow)} inches expected</li> : null}
        </ul>
        </div>
        <div className="col">
          <ul>
            <li>Wind: {weatherData.wind} mph</li>
            <li>Sunrise: {weatherData.sunrise}</li>
            <li>Sunset: {weatherData.sunset}</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}