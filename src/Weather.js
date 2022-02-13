import React, { useState } from 'react';
import './Weather.css'
import Search from './Search'
import TodaysWeather from './TodaysWeather'
import FutureWeather from './FutureWeather'

export default function Weather () {
  const [weatherData, setWeatherData] = useState(null);
  const [fiveDayData, setFiveDayData] = useState(null);
  const [isValid, setIsValid]= useState(false)

  function updateWeather(data) {
    setWeatherData(data);
  }

  function setFutureData(data) {
    setFiveDayData(data)
  }

  return (
    <div className="Weather">
    <Search updateWeather={updateWeather} setFutureData={setFutureData} setValid={setIsValid} />
    {isValid ?
      <>
        <TodaysWeather todaysWeather={weatherData}/>
        <FutureWeather futureWeather={fiveDayData}/>
      </>
    :
      <span>Weather data for your city will appear here</span>
    }
    </div>
  )
}