import React from 'react';
import './FutureExpanded.css'
import WeatherIcon from './WeatherIcon'
import styled, { keyframes } from 'styled-components';
import { bounceInDown } from 'react-animations';

const bounceAnimation = keyframes`${bounceInDown}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;

export default function FutureExpanded({ weatherData, units, showDetail }) {
  const fahMinTemp = weatherData.tempMin;
  const fahMaxTemp = weatherData.tempMax;
  const celsMinTemp = Math.round((fahMinTemp - 32) * 5/9);
  const celsMaxTemp = Math.round((fahMaxTemp - 32) * 5/9);
  let tempMin = (units === 'F' ? fahMinTemp : celsMinTemp)
  let tempMax = (units === 'F' ? fahMaxTemp : celsMaxTemp)

  function convertMMtoIn (mm) {
    return (mm / 25.4).toFixed(2)
  }

  function handleClose(e) {
    e.preventDefault()
    showDetail(false)
  }

  return (
    <>
    <BouncyDiv>
    <div className="FutureExpanded">
      <div className="row justify-content-center">
      <h4>Detail View for {weatherData.day}</h4>
      <WeatherIcon
        weatherCode={weatherData.weatherCode} weatherID={weatherData.weatherID}
        weatherMain={weatherData.weatherMain}
      />
      <span id="description" className="text-center">
        {weatherData.desc}
      </span>
      <div className="col" id="details">
        <ul>
          <li>Low: {tempMin}°{units}</li>
          <li>High: {tempMax}°{units}</li>
          <li>Humidity: {weatherData.humidity}%</li>
          {weatherData.rain ?
             <li>Rain: {convertMMtoIn(weatherData.rain)} inches expected</li> : null}
          {weatherData.snow ?
            <li>Snow: {convertMMtoIn(weatherData.snow)} inches expected</li> : null}
        </ul>
        </div>
        <div className="col">
          <ul>
            <li>Sunrise: {weatherData.sunrise}</li>
            <li>Sunset: {weatherData.sunset}</li>
            <li>Wind: {weatherData.wind} mph</li>
          </ul>
        </div>
        <input type="submit" value="Close" className="btn btn-warning w-50" onClick={handleClose}/>
      </div>
    </div>
    </BouncyDiv>
    </>
  )
}