import React from 'react';

let tz;

function updateDate(timeZoneOffset, weatherCode, timeStamp ) {
  let currentDate = new Date()
  let inputCityTS = new Date(timeStamp * 1000)
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let monthNum = currentDate.getMonth()
  let monthName = months[monthNum]
  let date = currentDate.getDate();
  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();

  //if before 10am, add leading 0
  if (hour < 10) {
    hour = `0${hour}`;
  }
  // add leading 0 if minutes are below 10
  let min = currentDate.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  // configure AM/PM
  let time = `${hour}:${min}`;
  if (hour >= 12) {
    time = time + 'PM'
  } else {
    time = time + 'AM'
  }

  let inputCityTimeZoneOffsetHours = (timeZoneOffset / 3600);
  let utcTime = inputCityTS.getUTCHours();
  let inputCityHour = (utcTime + inputCityTimeZoneOffsetHours)

  if (inputCityHour < 1) {
    inputCityHour = 12;
  }
  if (inputCityHour >= 24) {
    inputCityHour = inputCityHour - 24
    day = days[currentDate.getDay() + 1];
    date = currentDate.getDate() + 1;
  }

  let timeOfDay = inputCityHour >= 12 ? ` PM` : ` AM`;
  if (inputCityHour >= 13) {
    inputCityHour = (inputCityHour - 12);
  }
  let formattedDate = `${day}, ${monthName} ${date}`
  let inputCityTime = `${inputCityHour}:${min}${timeOfDay}`;

  return [formattedDate, inputCityTime, time]
}

function formatTime(timestamp, sunTimes) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let timeOfDay = hours >= 12 ? ` PM` : ` AM`;
  if (hours >= 13) {
    hours = (hours - 12);
  }
  let formattedTime = hours + ":" + minutes.substr(-2) + timeOfDay;
  return formattedTime;
}

function formatDayOfWeek(timestamp) {
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return week[day];
}

function parseTodaysWeatherData(cityName, data) {

  //updateDate(timeZoneOffset, weatherCode, timeStamp )
  let timeZoneOff = data.timezone;
  tz = timeZoneOff;
  let weatherCode = data.weather[0].icon;
  let formattedTimeData =  updateDate(timeZoneOff, weatherCode, data.dt)
  let sunriseTime = updateDate(timeZoneOff, weatherCode, data.sys.sunrise);
  let sunsetTime = updateDate(timeZoneOff, weatherCode, data.sys.sunset);

  let cityData = {
    name: cityName,
    day: formatDayOfWeek(data.dt),
    desc: data.weather[0].description,
    weatherCode: weatherCode,
    weatherID: data.weather[0].id,
    weatherMain: data.weather[0].main,
    date: formattedTimeData[0],
    inputTime: formattedTimeData[1],
    time: formatTime(data.dt),
    humidity : Math.round(data.main.humidity),
    temp : Math.round(data.main.temp),
    tempFeels : Math.round(data.main.feels_like),
    tempMin : Math.round(data.main.temp_min),
    tempMax : Math.round(data.main.temp_max),
    wind : Math.round(data.wind.speed),
    sunrise : sunriseTime[1],
    sunset : sunsetTime[1],
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
  let formattedTimeData =  updateDate(tz, weatherCode, data.dt)
  let sunriseTime = updateDate(tz, weatherCode, data.sunrise);
  let sunsetTime = updateDate(tz, weatherCode, data.sunset);

  let futureDayData = {
    name: cityName,
    day: formatDayOfWeek(data.dt),
    desc: data.weather[0].description,
    weatherCode: weatherCode,
    weatherID: data.weather[0].id,
    weatherMain: data.weather[0].main,
    date: formattedTimeData[0],
    inputTime: formattedTimeData[1],
    time : formatTime(data.dt),
    timezone : tz,
    humidity : Math.round(data.humidity),
    temp : Math.round(data.temp.day),
    tempFeels : Math.round(data.feels_like.day),
    tempMin : Math.round(data.temp.min),
    tempMax : Math.round(data.temp.max),
    wind : Math.round(data.wind_speed),
    sunrise : sunriseTime[1],
    sunset : sunsetTime[1],
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