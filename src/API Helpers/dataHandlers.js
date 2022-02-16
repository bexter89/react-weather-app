import {formatDayOfWeek, updateDateTime, updateSunTimes} from './formatTime'
let tz;

function parseTodaysWeatherData(cityName, data) {
  //updateDateTime(UNIXtimeStamp, timeZoneOffset)
  let timeZoneOff = data.timezone;
  tz = timeZoneOff;
  let weatherCode = data.weather[0].icon;
  let formattedTimeData =  updateDateTime(data.dt, timeZoneOff)
  let sunriseTime = updateSunTimes(data.sys.sunrise, timeZoneOff);
  let sunsetTime = updateSunTimes(data.sys.sunset, timeZoneOff);

  let cityData = {
    name: cityName,
    day: formattedTimeData[2],
    desc: data.weather[0].description,
    weatherCode: weatherCode,
    weatherID: data.weather[0].id,
    weatherMain: data.weather[0].main,
    date: formattedTimeData[0],
    inputTime: formattedTimeData[1],
    time: formattedTimeData[5],
    humidity : Math.round(data.main.humidity),
    temp : Math.round(data.main.temp),
    tempFeels : Math.round(data.main.feels_like),
    tempMin : Math.round(data.main.temp_min),
    tempMax : Math.round(data.main.temp_max),
    wind : data.wind.speed,
    sunrise : sunriseTime,
    sunset : sunsetTime,
  }

  if (data.rain) {
    cityData.rain = data.rain;
  }
  if (data.snow) {
    cityData.snow = data.snow;
  }
  return cityData;
}

function parseFutureData(cityName, data) {
  let weatherCode = data.weather[0].icon;
  let formattedTimeData =  updateDateTime(data.dt, tz)
  let sunriseTime = updateSunTimes(data.sunrise, tz);
  let sunsetTime = updateSunTimes(data.sunset, tz);

  let futureDayData = {
    name: cityName,
    day: formatDayOfWeek(data.dt),
    desc: data.weather[0].description,
    weatherCode: weatherCode,
    weatherID: data.weather[0].id,
    weatherMain: data.weather[0].main,
    date: formattedTimeData[0],
    inputTime: formattedTimeData[1],
    time : formattedTimeData[5],
    timezone : tz,
    humidity : Math.round(data.humidity),
    temp : Math.round(data.temp.day),
    tempFeels : Math.round(data.feels_like.day),
    tempMin : Math.round(data.temp.min),
    tempMax : Math.round(data.temp.max),
    wind : data.wind_speed,
    sunrise : sunriseTime,
    sunset : sunsetTime,
    moonPhase : data.moon_phase
  }

  if (data.rain) {
    futureDayData.rain = data.rain;
  }
  if (data.snow) {
    futureDayData.snow = data.snow;
  }
  return futureDayData;
}

export { parseTodaysWeatherData, parseFutureData }