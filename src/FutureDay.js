import React from 'react';
import WeatherIcon from './WeatherIcon'
import './FutureDay.css'

export default function FutureDay({ weather }) {

  return (
    <>
    <div className="row">
      <h3><u>{weather.day}</u></h3>
      <WeatherIcon
        weatherCode={weather.weatherCode} weatherID={weather.weatherID}
        weatherMain={weather.weatherMain}
      />
    </div>
    <div className="row justify-content-center">
      <span id="description">{weather.desc}</span>
      <span id="temps">{weather.tempMin}° | {weather.tempMax}°</span>
    </div>
    </>
  )
}