import {formatDayOfWeek, updateDateTime, updateSunTimes} from './formatTime'
let tz;

function parseTodaysWeatherData(cityName, data) {

  //Timezone from  API - Shift in seconds from UTC
  //convert to Hours
  let utcHoursShift = (data.timezone/3600);
  tz = utcHoursShift;
  let weatherCode = data.weather[0].icon;
  //Time of data calculation, unix, UTC
  let formattedTimeData =  updateDateTime( utcHoursShift)
  let sunriseTime = updateSunTimes(data.sys.sunrise, utcHoursShift);
  let sunsetTime = updateSunTimes(data.sys.sunset, utcHoursShift);

  let cityData = {
    name: cityName,
    desc: data.weather[0].description,
    weatherCode: weatherCode,
    weatherID: data.weather[0].id,
    weatherMain: data.weather[0].main,
    day: formattedTimeData[2][0],
    inputDay: formattedTimeData[2][1],
    date: formattedTimeData[0][0],
    inputDate: formattedTimeData[0][1],
    time: formattedTimeData[1][0],
    inputTime: formattedTimeData[1][1],
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
  let formattedTimeData =  updateDateTime(tz)
  let sunriseTime = updateSunTimes(data.sunrise, tz);
  let sunsetTime = updateSunTimes(data.sunset, tz);

  let futureDayData = {
    name: cityName,
    day: formatDayOfWeek(data.dt),
    desc: data.weather[0].description,
    weatherCode: weatherCode,
    weatherID: data.weather[0].id,
    weatherMain: data.weather[0].main,
    date: formattedTimeData[0][0],
    inputTime: formattedTimeData[1][1],
    time : formattedTimeData[1][0],
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
