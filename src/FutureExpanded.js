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
  console.log('weather data: ', weatherData)
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

  let moon = weatherData.moonPhase;

  if (weatherData.moonPhase > 0 && weatherData.moonPhase < 0.25) {
    moon = 0.125
  }
  if (weatherData.moonPhase > 0.25 && weatherData.moonPhase < 0.5) {
    moon = 0.375
  }
  if (weatherData.moonPhase > 0.5 && weatherData.moonPhase < 0.75) {
    moon = 0.625
  }
  if (weatherData.moonPhase > 0.75 && weatherData.moonPhase < 1) {
    moon = 0.875
  }

  let moonPhases = {
    '0' : 'new moon',
    '0.125' : 'waxing-crescent moon',
    '0.25' : 'first-quarter moon',
    '0.375': 'waxing-gibbous moon',
    '0.5' : 'full moon',
    '0.625' : 'waning-gibbous moon',
    '0.75' : 'last-quarter moon',
    '0.875' : 'waning-crescent moon',
    '1' : 'new moon',
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
        className="LargeIcon"
      />
      <span id="description" className="text-center">
        {weatherData.desc}
      </span>
      <div className="col" id="details">
        <ul>
          <li>Low:<span id="value"> {tempMin}°{units}</span></li>
          <li>High:<span id="value"> {tempMax}°{units}</span></li>
          <li>Humidity:<span id="value"> {weatherData.humidity}%</span></li>
          {weatherData.rain ?
             <li>Rain:<span id="value"> {convertMMtoIn(weatherData.rain)} inches expected</span></li> : null}
          {weatherData.snow ?
            <li>Snow:<span id="value"> {convertMMtoIn(weatherData.snow)} inches expected</span></li> : null}
        </ul>
        </div>
        <div className="col">
          <ul>
            <li>Sunrise:<span id="value"> {weatherData.sunrise}</span></li>
            <li>Sunset:<span id="value"> {weatherData.sunset}</span></li>
            <li>Wind:<span id="value"> {weatherData.wind} mph</span></li>
          </ul>
        </div>
        <div className="row">
          <div className="MoonPhase col-4 text-center">
            <h4 id="moon">Moon Phase:</h4>
          <WeatherIcon weatherCode={weatherData.moonPhase} weatherID={weatherData.moonPhase}/>
          <span id="phase">{moonPhases[moon]}</span>
          </div>
        </div>
        <input type="submit" value="Close" className="btn btn-warning w-50" onClick={handleClose}/>
      </div>
    </div>
    </BouncyDiv>
    </>
  )
}