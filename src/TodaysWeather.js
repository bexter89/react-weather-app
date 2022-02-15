import React, { useState } from 'react';
import WeatherIcon from './WeatherIcon'
import './TodaysWeather.css'

export default function TodaysWeather ({todaysWeather, units, setUnits}) {
  const [fahTemp, setFahTemp] = useState(todaysWeather.temp);
  const [celsTemp, setCelsTemp] = useState(convertTemp(fahTemp));
  const [temp, setTemp] = useState(fahTemp)


  const fahMinTemp = todaysWeather.tempMin;
  const fahMaxTemp = todaysWeather.tempMax;
  const fahTempFeels = todaysWeather.tempFeels;
  let celsMinTemp = Math.round((fahMinTemp - 32) * 5/9);
  let celsMaxTemp = Math.round((fahMaxTemp - 32) * 5/9);
  let celsTempFeels = Math.round((fahTempFeels - 32) * 5/9);
  let tempMin = (units === 'F' ? fahMinTemp : celsMinTemp)
  let tempMax = (units === 'F' ? fahMaxTemp : celsMaxTemp)
  let feelsTemp = (units === 'F' ? fahTempFeels : celsTempFeels)

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
      <h1>In <span id="cityName">{todaysWeather.name}</span>, its... </h1>
      <ul>
        <li id="inputCityDateTime">{todaysWeather.inputTime} on {todaysWeather.date}</li>
        <li id="updatedOn">Last updated: {todaysWeather.day} at {todaysWeather.time} local time</li>
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
        <section className="WeatherDetails col-6 ">
          <ul>
            <li><span id="detailKey">Feels Like:</span> {feelsTemp}<span id="unit">°{units}</span></li>
            <li><span id="detailKey">Daily Low:</span> <span id="low">{tempMin}<span id="unit">°{units}</span></span></li>
            <li><span id="detailKey">Daily High:</span> <span id="high">{tempMax}<span id="unit">°{units}</span></span></li>
            {todaysWeather.rain ?
             <li><span id="detailKey">Rain:</span> {convertMMtoIn(todaysWeather.rain[`1h`])} inches in the last hour </li> : null}
            {todaysWeather.snow ?
            <li><span id="detailKey">Snow:</span> {convertMMtoIn(todaysWeather.snow[`1h`])} inches in the last hour </li> : null}
            <li><span id="detailKey">Humidity:</span> {todaysWeather.humidity}%</li>
            <li><span id="detailKey">Wind:</span> {todaysWeather.wind} mph</li>
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