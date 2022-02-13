import React from 'react';
import FutureDay from './FutureDay';

export default function FutureWeather ({ futureWeather}) {
  return (
    <div className="FutureWeather row">
    {futureWeather ?
      futureWeather.map(day => {
      return <FutureDay weather={day} key={day.day}/>
    })
    :
      `Loading Weather...`
    }
    </div>
  )
}