import React from 'react';
import './TodaysWeather.css'

export default function TodaysWeather ({todaysWeather}) {
  console.log('today weather:', todaysWeather);

  function convertMMtoIn (mm) {
    return (mm / 25.4).toFixed(2)
  }

  return (
    <div className="TodaysWeather">
      <h1>{todaysWeather.name}</h1>
      <ul>
        <li id="day">Last updated: {todaysWeather.day}, {todaysWeather.time}</li>
        <li id="desc">{todaysWeather.desc}</li>
      </ul>
      <div className="row mt-3">
        <div className="col-6">
          <div className="clearfix">
          <img src={todaysWeather.icon} alt={`an icon depicting the weather as: ${todaysWeather.desc}`} />
            <div className="float-left">
              <span className="temperature">{todaysWeather.temp}</span>
              <span className="unit">°F</span>
            </div>
          </div>
        </div>
        <div className="col-6">
          <ul>
            {todaysWeather.rain ?
             <li>Rain: {convertMMtoIn(todaysWeather.snow[`1h`])} inches in the last hour </li> : null}
            {todaysWeather.snow ?
            <li>Snow: {convertMMtoIn(todaysWeather.snow[`1h`])} inches in the last hour </li> : null}
            <li>Humidity: {todaysWeather.humidity}%</li>
            <li>Wind: {todaysWeather.wind} m/hr</li>
          </ul>
        </div>
      </div>
    </div>
  )
}