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

function updateSunTimes(unixTimestamp) {
  console.log('sun timestamp: ', unixTimestamp)
  let sunTimeStamp = new Date(unixTimestamp * 1000)
  console.log(sunTimeStamp)
  let utcTime = (sunTimeStamp.getTimezoneOffset())/60;
  console.log('utcTime: ', utcTime)
  let hour = sunTimeStamp.getHours();
  console.log(hour, 'hour')

  let adjustedHour;
  if (utcTime > 0) {
    adjustedHour = hour + utcTime;
  } else {
    adjustedHour = hour - utcTime;
  }

  console.log(adjustedHour, 'adj hour *****')
  let minutes = "0" + sunTimeStamp.getMinutes();
  let timeOfDay;

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


 function updateDateTime(utcHoursShift) {
  let currentDate = new Date();
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

  // **** Local Time Configuration ****
  let monthNum = currentDate.getMonth()
  let monthName = months[monthNum]
  let date = currentDate.getDate();
  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();
  let localTimeofDay = ' AM';

  //if before 10am, add leading 0
  if (hour < 10) {
    hour = `0${hour}`;
  }
  // add leading 0 if minutes are below 10
  let min = currentDate.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  if (hour >= 13) {
    localTimeofDay = ' PM'
    hour -= 12;
  }
  let localTime = `${hour}:${min} ${localTimeofDay}`
  let formattedDayMoDate = `${day}, ${monthName} ${date},`

  // **** Input City Time Configuration ****
  let inputCityDate = date;
  let inputCityDay = day;
  let utcTime = (currentDate.getTimezoneOffset())/60;
  let inputCityHour = utcTime + currentDate.getHours() + utcHoursShift;
  let inputCityTimeofDay = ' AM';

  if (inputCityHour >= 24) {
    console.log('input hour greater than 24')
    inputCityHour = inputCityHour - 24
    inputCityDay = days[currentDate.getDay() + 1];
    inputCityDate = currentDate.getDate() + 1;
    if (inputCityHour >= 12) {
      inputCityTimeofDay = ' PM'
    }
  }

  if (inputCityHour < 1) {
    inputCityHour = `0${inputCityHour}`;
  }

  if (inputCityHour >= 13) {
    inputCityTimeofDay = ' PM'
    inputCityHour -= 12;
  }

  let inputCityTime = `${inputCityHour}:${min} ${inputCityTimeofDay}`;
  let localFormattedFullDate =`${formattedDayMoDate} ${inputCityTime}`
  let inputCityFormattedFullDate = `${inputCityDay}, ${monthName} ${inputCityDate}`

  let formattedDateTime = [
    [localFormattedFullDate, inputCityFormattedFullDate],
    [localTime, inputCityTime],
    [day, inputCityDay],
    [monthName],
    [date, inputCityDate],
  ]

  return formattedDateTime;
}

export {formatDayOfWeek, updateDateTime, updateSunTimes}