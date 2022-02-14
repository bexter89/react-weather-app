import React from 'react';
import './WeatherIcon.css'

export default function WeatherIcon({weatherCode, weatherID, weatherMain }){
  let key = weatherID.toString();

  const codeMapping= {
    '01d' : 'clear-day',
    '01n' : 'clear-night',
    '02d' : 'partly-cloudy-day',
    '02n' : 'partly-cloudy-night',
    '03d' : 'cloudy',
    '03n' : 'cloudy',
    '04d' : 'overcast-day',
    '04n' : 'overcast-night',
    '09d' : 'shower rain',
    '09n' : 'shower rain',
    '10d' : 'partly-cloudy-day-rain',
    '10n' : 'partly-cloudy-night-rain',
    '11d' : 'thunderstorms-day',
    '11n' : 'thunderstorms-night',
    '13d' : 'partly-cloudy-day-snow',
    '13n' : 'partly-cloudy-night-snow',
    '50d' : 'mist',
    '50n' : 'mist',
  }

  const weatherTypes = {
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
    '300'	: 'light intensity drizzle',
    '301'	: 'drizzle',
    '302'	: 'heavy intensity drizzle',
    '310'	: 'light intensity drizzle rain',
    '311'	: 'drizzle rain',
    '312'	: 'heavy intensity drizzle rain',
    '313'	: 'shower rain and drizzle',
    '314'	: 'heavy shower rain and drizzle',
    '321'	: 'shower drizzle',
    '500' : 'light rain',
    '501' : 'moderate rain',
    '502' : 'heavy intensity rain',
    '503' : 'very heavy rain',
    '504' : 'extreme rain',
    '511' : 'freezing rain',
    '520' : 'light intensity shower rain',
    '521' : 'shower rain',
    '522' : 'heavy intensity shower rain',
    '531' : 'ragged shower rain',
    '600' : 'light snow',
    '601' : 'Snow',
    '602' : 'Heavy snow',
    '611' : 'Sleet',
    '612' : 'Light shower sleet',
    '613' : 'Shower sleet',
    '615' : 'Light rain and snow',
    '616' : 'Rain and snow',
    '620' : 'Light shower snow',
    '621' : 'Shower snow',
    '622' :' Heavy shower snow',
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
    '800': 'clear',
    '801': `few clouds: 11-25%`,
    '802': `scattered clouds: 25-50%`,
    '803': `broken clouds: 51-84%`,
    '804': `overcast clouds: 85-100%`,
  }

  return (<img
    className="WeatherIcon"
    src={`https://basmilius.github.io/weather-icons/production/fill/all/${codeMapping[weatherCode]}.svg`}
    alt={`an animation of ${weatherTypes[key]} weather`}
    />)
}