import React from 'react';
import './FutureExpanded.css'
import WeatherIcon from './WeatherIcon'

export default function FutureExpanded({ weatherData, units, setShowExpandedView, setIsFirstRender, isFirstRender,  setShowDiv, setIsMounted }) {
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
    setShowExpandedView(false)
    setIsFirstRender(true)
    setShowDiv(true)
    setIsMounted(true)
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
    <article className="FutureExpanded">
      <header className="row justify-content-center">
        <h4>Detail View for {weatherData.day}</h4>
        <div className="col-4">
          <WeatherIcon
            weatherCode={weatherData.weatherCode} weatherID={weatherData.weatherID}
            weatherMain={weatherData.weatherMain}
          />
        </div>
      <span id="description" className="text-center">
        {weatherData.desc}
      </span>
        {weatherData.rain ?
          <span id="rain" className="text-center"> {convertMMtoIn(weatherData.rain)} inches of rain expected</span>
          : null}
        {weatherData.snow ?
          <span id="snow" className="text-center"> {convertMMtoIn(weatherData.snow)} inches of snow expected</span> : null}
      </header>
      <section className="Details row">
      <section className="col" id="details">
        <ul>
          <li>Low:<span id="value"> {tempMin}°{units}</span></li>
          <li>High:<span id="value"> {tempMax}°{units}</span></li>
          <li>Humidity:<span id="value"> {weatherData.humidity}%</span></li>
        </ul>
      </section>
      <section className="col">
        <ul>
          <li>Sunrise:<span id="value"> {weatherData.sunrise}</span></li>
          <li>Sunset:<span id="value"> {weatherData.sunset}</span></li>
          <li>Wind:<span id="value"> {weatherData.wind} mph</span></li>
        </ul>
      </section>
      </section>
      <section className="Moon row justify-content-center">
          <h4 id="moon">Moon Phase:</h4>
        <header className="MoonPhase col-3">
          <WeatherIcon weatherCode={weatherData.moonPhase} weatherID={weatherData.moonPhase}/>
        </header>
        <span className="text-center" id="phase">{moonPhases[moon]}</span>
      <input type="submit" value="Close" className="btn btn-warning w-50" onClick={handleClose}/>
      </section>
    </article>
    </>
  )
}