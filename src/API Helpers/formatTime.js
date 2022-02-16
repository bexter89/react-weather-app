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

function updateSunTimes(unixTimestamp, timeZone) {

  let sunTimeStamp = new Date(unixTimestamp * 1000)
  let offsetHours = (timeZone / 3600)
  let hour = sunTimeStamp.getHours();
  let minutes = "0" + sunTimeStamp.getMinutes();
  let timeOfDay;

  hour = (hour + offsetHours + 6)

  // configure AM/PM
  if (hour >= 12) {
    timeOfDay = ' PM'
  } else {
    timeOfDay = ' AM'
  }

  if (hour >= 12) {
    hour = (hour - 12)
    if (hour >= 12) {
      timeOfDay = ' PM'
    }
  }
  if (hour < 1) {
    hour = 12;
  }

  let time = hour + ':' + minutes.substr(-2) + timeOfDay;
  return time;
}

 function updateDateTime(UNIXtimeStamp, timeZoneOffset = 0 ) {
  let offsetHours = (timeZoneOffset / 3600)
  let currentDate = new Date()
  let inputCityTS = new Date(UNIXtimeStamp * 1000)
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

  let monthNum = currentDate.getMonth()
  let monthName = months[monthNum]
  let date = currentDate.getDate();
  let day = formatDayOfWeek(currentDate);
  let hour = currentDate.getHours();
  let min = currentDate.getMinutes();
  let localTimeOfDay;
  //if before 10am, add leading 0
  if (hour < 10) {
    hour = `0${hour}`;
  }
  // add leading 0 if minutes are below 10
  if (min < 10) {
    min = `0${min}`;
  }
  // configure AM/PM
  if (hour >= 13) {
    hour = (hour - 12);
    localTimeOfDay = 'PM'
  } else {
    localTimeOfDay = 'AM'
  }

  let localTime = `${hour}:${min}${localTimeOfDay}`;

  let utcTime = inputCityTS.getUTCHours();
  let inputCityHour = (utcTime + offsetHours)
  let timeOfDay;

  // change to 12hr time and set AM/PM
  if (inputCityHour >= 13) {
    inputCityHour = inputCityHour - 12;
    timeOfDay = 'PM'
  } else {
    timeOfDay = 'AM'
  };
  if (inputCityHour < 1) {
    inputCityHour = 12;
  }
  // if next day, adjust date and day
  if (inputCityHour >= 24) {
    inputCityHour = inputCityHour - 24
    day = (formatDayOfWeek(currentDate)) + 1;
    date = currentDate.getDate() + 1;
  }
  let inputCityTime = `${inputCityHour}:${min} ${timeOfDay}`

  let formattedDate = `${day}, ${monthName} ${date}`

  let formattedDateTime = [
    formattedDate,
    inputCityTime,
    day,
    monthName,
    date,
    localTime,
  ]
  return formattedDateTime;
}

export {formatDayOfWeek, updateDateTime, updateSunTimes}