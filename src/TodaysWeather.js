import React, { useState } from 'react';
import WeatherIcon from './WeatherIcon'
import './TodaysWeather.css'

export default function TodaysWeather ({todaysWeather, setUnits}) {
  console.log('todays weather: ', todaysWeather)
  const fahTemp = todaysWeather.temp;
  const celsTemp = Math.round((fahTemp - 32) * 5/9);
  const [temp, setTemp] = useState(fahTemp)

  function convertMMtoIn (mm) {
    return (mm / 25.4).toFixed(2)
  }

  function handleFClick(event) {
    event.preventDefault();
    setUnits('F')
    setTemp(fahTemp)
  };

  function handleCClick(event) {
    event.preventDefault();
    setUnits('C')
    setTemp(celsTemp)

  };

  if (todaysWeather) {
  return (
    <section className="TodaysWeather">
      <h1>{todaysWeather.name}</h1>
      <ul>
        <li id="day">Last updated: {todaysWeather.day}, {todaysWeather.time}</li>
        <li id="desc">{todaysWeather.desc}</li>
      </ul>
      <section className="row mt-3 align-items-start">
        <div className="col-6">
          <div className="clearfix">
          <WeatherIcon
            weatherCode={todaysWeather.weatherCode} weatherID={todaysWeather.weatherID}
            weatherMain={todaysWeather.weatherMain}
            className="MainWeatherIcon"
          />
            <div className="float-left">
              <span className="temperature">{temp}</span>
              <span className="unit"><a href="/" onClick={handleFClick}>°F</a> | <a href="/" onClick={handleCClick}>°C</a></span>
            </div>
          </div>
        </div>
        <section className="col-6 ">
          <ul>
            {todaysWeather.rain ?
             <li>Rain: {convertMMtoIn(todaysWeather.rain[`1h`])} inches in the last hour </li> : null}
            {todaysWeather.snow ?
            <li>Snow: {convertMMtoIn(todaysWeather.snow[`1h`])} inches in the last hour </li> : null}
            <li>Humidity: {todaysWeather.humidity}%</li>
            <li>Wind: {todaysWeather.wind} m/hr</li>
          </ul>
        </section>
      </section>
    </section>
  )
  } else {
   return (
    <section className="spinner-border text-info" role="status">
      <span className="visually-hidden">loading weather...</span>
    </section>
   )
  }
}