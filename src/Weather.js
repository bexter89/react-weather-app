import React, { useState } from 'react';
import './Weather.css'
import Search from './Search'
import TodaysWeather from './TodaysWeather'
import FutureWeather from './FutureWeather'
import umbrellaImage from './assets/umbrella.svg'

export default function Weather () {
  const [weatherData, setWeatherData] = useState(null);
  const [fiveDayData, setFiveDayData] = useState(null);
  const [isValid, setIsValid]= useState(false)
  const [units, setUnits] = useState('F')

  function updateWeather(data) {
    setWeatherData(data);
  }

  function setFutureData(data) {
    setFiveDayData(data)
  }

  return (
    <section className="Weather">
      <header className="mb-4 text-center">
        <h1>Weather App</h1>
        <div className="row">
          <div className="col-3"></div>
        <img src={umbrellaImage} className="HeaderImage" alt="clipart of a male figure using an umbrella standing next to a graphic of a weather alert"/>
        </div>
      </header>
    <Search updateWeather={updateWeather} setFutureData={setFutureData} setShowWeather={setIsValid} />
    {isValid ?
      <>
        <TodaysWeather todaysWeather={weatherData} units={units} setUnits={setUnits}/>
        <FutureWeather futureWeather={fiveDayData} units={units}/>
      </>
    :
      <span id="helper">Weather data for your city will appear here</span>
    }
    </section>
  )
}