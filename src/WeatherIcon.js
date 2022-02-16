import React from 'react';
import './WeatherIcon.css'

export default function WeatherIcon({weatherCode, weatherID, weatherMain, iconName, size }){

  let key;
  let category = 'moon';
  let keyCode;

  // keycode = weathercode: 10d
  // key = weatherID: 500
  // category = weatherMain: Rain

  if (weatherMain) {
    // direct category to weather object
    category = weatherMain.toLowerCase();
    console.log('category: ', category)
  }
  if (weatherID) {
    key = weatherID;
  }

  if(weatherCode) {
    keyCode = weatherCode;
  }

  const codeMapping= {
    '01d' : 'clear-day',
    '01n' : 'clear-night',
    '02d' : 'partly-cloudy-day',
    '02n' : 'partly-cloudy-night',
    '03d' : 'cloudy',
    '03n' : 'cloudy',
    '04d' : 'overcast-day',
    '04n' : 'overcast-night',
    '09d' : 'partly-cloudy-day-drizzle',
    '09n' : 'partly-cloudy-night-drizzle',
    '10d' : 'partly-cloudy-day-rain',
    '10n' : 'partly-cloudy-night-rain',
    '11d' : 'thunderstorms-day',
    '11n' : 'thunderstorms-night',
    '13d' : 'partly-cloudy-day-snow',
    '13n' : 'partly-cloudy-night-snow',
    '14d' : 'partly-cloudy-day-sleet',
    '14n' : 'partly-cloudy-night-sleet',
    '50d' : 'mist',
    '50n' : 'mist',
    '0' : 'moon-new',
    '0.125' : 'moon-waxing-crescent',
    '0.25' : 'moon-first-quarter',
    '0.375': 'moon-waxing-gibbous',
    '0.5' : 'moon-full',
    '0.625' : 'moon-waning-gibbous',
    '0.75' : 'moon-last-quarter',
    '0.875' : 'moon-waning-crescent',
    '1' : 'moon-new',
  }

  if (weatherCode && weatherID) {
    if (weatherCode > 0 && weatherCode < 0.25) {
      category = 'moon';
      weatherCode = 0.125
      keyCode = weatherCode.toString();
    }
    if (weatherCode > 0.25 && weatherCode < 0.5) {
      category = 'moon';
      weatherCode = 0.375
      keyCode = weatherCode.toString();
    }
    if (weatherCode > 0.5 && weatherCode < 0.75) {
      category = 'moon';
      weatherCode = 0.625
      keyCode = weatherCode.toString();
    }
    if (weatherCode > 0.75 && weatherCode < 1) {
      category = 'moon';
      weatherCode = 0.875;
      keyCode = weatherCode.toString();
    }
  }

  if (category === 'snow') {
    if (weatherID >= 611 && weatherID <= 616){
      if (weatherCode[weatherCode.length] === 'd') {
        keyCode = '14d'
      } else {
        keyCode ='14n'
      }
    }
  }

  let snow = {
    '600' : 'light snow',
    '601' : 'Snow',
    '602' : 'Heavy snow',
    '611' : 'Sleet',
    '612' : 'Light shower and sleet',
    '613' : 'Shower and sleet',
    '615' : 'Light rain and snow',
    '616' : 'Rain and snow',
    '620' : 'Light showers and snow',
    '621' : 'Showers snow',
    '622' :' Heavy showers and snow',
  }

  let atmosphere = {
    '701': 'mist',
    '711': 'Smoke',
    '721': 'Haze',
    '731': 'sand/dust whirls',
    '741': 'fog',
    '751': 'sand',
    '761': 'dust',
    '762': 'volcanic ash',
    '771': 'squalls',
    '781': 'tornado',
  }
  let clear = {
    '800': 'clear skies',
  }

  let clouds = {
    '801': `few clouds: 11-25%`,
    '802': `scattered clouds: 25-50%`,
    '803': `broken clouds: 51-84%`,
    '804': `overcast clouds: 85-100%`,
  }

  let rain = {
    '500' : 'light rain',
    '501' : 'moderate rain',
    '502' : 'heavy rain',
    '503' : 'very heavy rain',
    '504' : 'extreme rain',
    '511' : 'freezing rain',
    '520' : 'light shower rain',
    '521' : 'shower rain',
    '522' : 'heavy shower rain',
    '531' : 'ragged shower rain',
  }

  let drizzle = {
    '300'	: 'light drizzle',
    '301'	: 'drizzle',
    '302'	: 'heavy drizzle',
    '310'	: 'light drizzle and rain',
    '311'	: 'drizzle and rain',
    '312'	: 'heavy drizzle and rain',
    '313'	: 'shower rain and drizzle',
    '314'	: 'heavy showers, rain and drizzle',
    '321'	: 'shower drizzle',
  }

  let thunderstorm = {
    '200' : 'thunderstorm with light rain',
    '201' : 'thunderstorm with rain',
    '202' : 'thunderstorm with heavy rain',
    '210' : 'light thunderstorm',
    '211' : 'thunderstorm',
    '212' : 'heavy thunderstorm',
    '221' : 'ragged thunderstorm',
    '230' : 'thunderstorm with light drizzle',
    '231' : 'thunderstorm with drizzle',
    '232' : 'thunderstorm with heavy drizzle',
  }


  const moon = {
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

  if(iconName) {
    return (
      <img
      id="WeatherDetailIcon"
      style={{width: `${size} !important`}}
      src={`https://basmilius.github.io/weather-icons/production/fill/all/${iconName}.svg`}
      alt={`an animation representing ${iconName}`}
      />
    )
  } else {
    return (
      <img
        id="WeatherIcon"
        src={`https://basmilius.github.io/weather-icons/production/fill/all/${codeMapping[keyCode]}.svg`}
        alt={`an animation of ${codeMapping[keyCode]}`}
      />
    )
  }
}