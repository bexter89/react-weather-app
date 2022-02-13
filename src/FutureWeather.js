import React, { useState } from 'react';
import FutureDay from './FutureDay';
import FutureDetail from './FutureDetail'
import './FutureWeather.css'

export default function FutureWeather ({ futureWeather }) {
  const [showDetailView, setShowDetailView] = useState(false);
  const [futureDayDetails, setFutureDayDetails] = useState({});

  function handleClick(index) {
    setShowDetailView(!showDetailView)
    setFutureDayDetails(futureWeather[index])
  }

  return (
    <div className="FutureWeather">
      <div className="row text-center">
        <h2>Five-Day Future Forecast:</h2>
      </div>
      { showDetailView ?
      <div className="FutureDetails row">
        <FutureDetail weatherData={futureDayDetails} />
      </div>
      :
       null
      }
      <div className="row align-items-center justify-content-center">
        {futureWeather ?
          futureWeather.map((day, index )=> {
          return (
            <div className="FutureDay col text-center" key={day.day} onClick={()=>{handleClick(index)}}>
            <FutureDay
              weather={day}
              setShowDetailView={setShowDetailView}
              showDetailView={showDetailView}
              setFutureDayDetails={setFutureDayDetails}
            />
            </div>
          )})
        :
          `Loading Weather...`
        }
      </div>
    </div>
  )
}