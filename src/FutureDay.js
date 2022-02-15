import React from 'react';
import WeatherIcon from './WeatherIcon'
import './FutureDay.css'
import styled, { keyframes } from 'styled-components';
import { rollIn } from 'react-animations';

const rollAnimation = keyframes`${rollIn}`;

const RollDiv = styled.div`
  animation: 1s ${rollAnimation};
`;


export default function FutureDay({ weather, units }) {
  const fahMinTemp = weather.tempMin;
  const fahMaxTemp = weather.tempMax;
  let celsMinTemp = Math.round((fahMinTemp - 32) * 5/9);
  let celsMaxTemp = Math.round((fahMaxTemp - 32) * 5/9);
  let tempMin = (units === 'F' ? fahMinTemp : celsMinTemp)
  let tempMax = (units === 'F' ? fahMaxTemp : celsMaxTemp)

  return (
    <>
    <div className="row">
      <h3><u>{weather.day}</u></h3>
      <RollDiv>
      <WeatherIcon
        weatherCode={weather.weatherCode} weatherID={weather.weatherID}
        weatherMain={weather.weatherMain}
      />
      </RollDiv>
    </div>
    <div className="row">
      <span id="description">{weather.desc}</span>
      <div className="temps">
        <span id="low">{tempMin}<span id="unit">°{units}</span></span> | <span id="high"> {tempMax}<span id="unit">°{units}</span></span>
      </div>
    </div>
    </>
  )
}