import React from 'react';
import './Weather.css'
import Search from './Search'
import FutureWeather from './FutureWeather'

export default function Weather () {
  return (
    <div className="Weather">
    <Search />
    <h1>New York</h1>
    <ul>
      <li>Wednesday</li>
      <li>Mostly Cloudy</li>
    </ul>
    <div className="row mt-3">
      <div className="col-6">
        <div className="clearfix">
          <img
            src="https://ssl.gstatic.com/onebox/weather/64/sunny.png" alt="sunny"
          />
          <div className="float-left">
            <span className="temperature">6</span>
            <span className="unit">°C</span>
          </div>
        </div>
      </div>
      <div className="col-6">
        <ul>
          <li>Precipitation: 15%</li>
          <li>Humidity: 72%</li>
          <li>Wind: 13 km/hr</li>
        </ul>
      </div>
    </div>
    <FutureWeather />
    </div>
  )
}