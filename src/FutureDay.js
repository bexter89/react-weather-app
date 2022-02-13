import React from 'react';
import './FutureDay.css'

export default function FutureDay({ weather }) {
  console.log('day in futureDay', weather)
  return (
    <div className="Day col">
      <div className="container">
        <h3>{weather.day}</h3>
        <img src={weather.icon} alt={`an icon depicting the weather as: ${weather.desc}`} />
        <span id="description">{weather.desc}</span>
        <span id="temps">{weather.tempMin}° | {weather.tempMax}°</span>
      </div>
    </div>
  )
}