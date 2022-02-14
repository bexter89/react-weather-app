import React, { useState } from 'react';
import FutureDay from './FutureDay';
import FutureExpanded from './FutureExpanded'
import './FutureWeather.css'

export default function FutureWeather ({ futureWeather, units }) {
  const [showDetailView, setShowDetailView] = useState(false);
  const [futureDayDetails, setFutureDayDetails] = useState({});

  function handleClick(index) {
    setShowDetailView(true)
    setFutureDayDetails(futureWeather[index])
  }

  return (
    <div className="FutureWeather">
      <div className="row text-center">
        <h2>Five-Day Future Forecast</h2>
      </div>
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
              units={units}
            />
            </div>
          )})
        :
          `Loading Weather...`
        }
      </div>
      { showDetailView ?
      <div className="row">
        <FutureExpanded weatherData={futureDayDetails} units={units} showDetail={setShowDetailView}/>
      </div>
      :
      <div className="Helper row align-items-center justify-content-center">
       (click on any day to show an expanded weather view)
      </div>
      }
    </div>
  )
}