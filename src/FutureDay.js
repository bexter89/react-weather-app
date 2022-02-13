import React from 'react';
import './FutureDay.css'

export default function FutureDay({ weather}) {

  return (
    <>
    <div className="row">
      <h3><u>{weather.day}</u></h3>
      <img src={weather.icon} alt={`an icon depicting the weather as: ${weather.desc}`}
      className="align-self-center" />
    </div>
    <div className="row justify-content-center">
      <span id="description">{weather.desc}</span>
      <span id="temps">{weather.tempMin}° | {weather.tempMax}°</span>
    </div>
    </>
  )
}