import React, { useState } from 'react';
import WeatherIcon from './WeatherIcon'
import './TodaysWeather.css'

export default function TodaysWeather ({todaysWeather, units, setUnits}) {
  const [fahTemp, setFahTemp] = useState(todaysWeather.temp);
  const [celsTemp, setCelsTemp] = useState(convertTemp(fahTemp));
  const [temp, setTemp] = useState(fahTemp)


  const fahMinTemp = todaysWeather.tempMin;
  const fahMaxTemp = todaysWeather.tempMax;
  let celsMinTemp = Math.round((fahMinTemp - 32) * 5/9);
  let celsMaxTemp = Math.round((fahMaxTemp - 32) * 5/9);
  let tempMin = (units === 'F' ? fahMinTemp : celsMinTemp)
  let tempMax = (units === 'F' ? fahMaxTemp : celsMaxTemp)

  function convertTemp (Ftemp) {
    return Math.round((Ftemp - 32) * 5/9);
  }

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
    <article className="TodaysWeather">
      <h1>Curruntly, in {todaysWeather.name}, its... </h1>
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
            <li>Daily Low: <span id="low">{tempMin}<span id="unit">°{units}</span></span></li>
            <li>Daily High: <span id="high">{tempMax}<span id="unit">°{units}</span></span></li>
            {todaysWeather.rain ?
             <li>Rain: {convertMMtoIn(todaysWeather.rain[`1h`])} inches in the last hour </li> : null}
            {todaysWeather.snow ?
            <li>Snow: {convertMMtoIn(todaysWeather.snow[`1h`])} inches in the last hour </li> : null}
            <li>Humidity:  {todaysWeather.humidity}%</li>
            <li>Wind: {todaysWeather.wind} mph</li>
          </ul>
        </section>
      <section className="row align-items-center justify-content-center">
        <WeatherIcon iconName="sunrise" size="40px"/>
        Sunrise: {todaysWeather.sunrise}
        <WeatherIcon iconName="sunset" size="40px"/>
        Sunset: {todaysWeather.sunset}
        </section>
      </section>
    </article>
  )
  } else {
   return (
    <section className="spinner-border text-info" role="status">
      <span className="visually-hidden">loading weather...</span>
    </section>
   )
  }
}