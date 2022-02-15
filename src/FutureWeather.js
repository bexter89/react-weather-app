import React, { useState } from 'react';
import FutureDay from './FutureDay';
import FutureExpanded from './FutureExpanded'
import './FutureWeather.css'
import weatherImage from './assets/weather.svg'
import Fade from './StyledElements/Fade'

export default function FutureWeather ({ futureWeather, units }) {
  const [futureDayDetails, setFutureDayDetails] = useState({});
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [showExpandedView, setShowExpandedView] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showDiv, setShowDiv] = useState(true);

  //on animation end
  function handleShowDiv() {
    if (isFirstRender) {
      setShowDiv(true)
    } else {
      setShowDiv(false)
    }
  }

  //on day click
  function handleClick(index) {
    setShowExpandedView(true);
    setFutureDayDetails(futureWeather[index]);
    if (isFirstRender) {
      setShowDiv(true)
      setIsFirstRender(false)
    } else {
      setShowDiv(false)
    }
  }


  return (
    <section className="FutureWeather">
      <header className="row text-center">
        <h2>Five-Day Future Forecast</h2>
      </header>
      {showDiv ?
        <div className="ImageContainer row justify-content-center">
        <Fade
          out={showExpandedView}
          className="text-center"
          onAnimationEnd={handleShowDiv}
        >
          <img src={weatherImage} style={{maxWidth: '200px'}} className="img-fluid mt-2" alt="clipart of a female figure standing next to a modal of a five day forecast"/>
        </Fade>
        </div>
        :
        null
      }
      <div className="FiveDay row align-items-start">
        {futureWeather ?
          futureWeather.map((day, index )=> {
          return (
            <div className="FutureDay col text-center" key={day.day} onClick={()=>{handleClick(index)}}>
            <FutureDay
              weather={day}
              units={units}
            />
            </div>
          )})
        :
          `Loading Weather...`
        }
      </div>
      { showExpandedView ?
      <div className="Expanded row">
        <FutureExpanded
          weatherData={futureDayDetails}
          units={units}
          setShowExpandedView={setShowExpandedView}
          setIsFirstRender={setIsFirstRender}
          isFirstRender={isFirstRender}
          setShowDiv={setShowDiv}
          setIsMounted={setIsMounted}
        />
      </div>
      :
      <div className="Helper row align-items-center justify-content-center">
       (click on any day to show an expanded weather view)
      </div>
      }
    </section>
  )
}