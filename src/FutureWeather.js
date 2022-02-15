import React, { useState } from 'react';
import FutureDay from './FutureDay';
import ExpandedContainer from './ExpandedContainer'
import './FutureWeather.css'
import weatherImage from './assets/weather.svg'

export default function FutureWeather ({ futureWeather, units }) {
  const [showDetailView, setShowDetailView] = useState(false);
  const [futureDayDetails, setFutureDayDetails] = useState({});

  function handleClick(index) {
    setShowDetailView(true)
    setFutureDayDetails(futureWeather[index])
  }

  return (
    <section className="FutureWeather">
      <header className="row text-center">
        <h2>Five-Day Future Forecast</h2>
      </header>
      <div className="ImageContainer row justify-content-center">
        <img src={weatherImage} className="img-fluid mt-2" alt="clipart of a female figure standing next to a modal of a five day forecast"/>
      </div>
      <div className="FiveDay row align-items-center justify-content-center">
        {futureWeather ?
          futureWeather.map((day, index )=> {
          return (
            <div className="FutureDay col text-center" key={day.day} onClick={()=>{handleClick(index)}}>
            <FutureDay
              weather={day}
              setShowDetailView={setShowDetailView}
              showDetailView={showDetailView}
              setFutureDayDetails={setFutureDayDetails}
              units={units}
            />
            </div>
          )})
        :
          `Loading Weather...`
        }
      </div>
      { showDetailView ?
      <div className="Expanded row">
        <ExpandedContainer weatherData={futureDayDetails} units={units} showDetail={setShowDetailView}/>
      </div>
      :
      <div className="Helper row align-items-center justify-content-center">
       (click on any day to show an expanded weather view)
      </div>
      }
    </section>
  )
}