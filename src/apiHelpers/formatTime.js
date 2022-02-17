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

function updateSunTimes(unixTimestamp, offsetHours) {
  //get locoal time offset
  let sunTimeStamp = new Date(unixTimestamp * 1000)
  //get inputCity time offset
  let hour = sunTimeStamp.getHours();
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
  console.log(utcHoursShift, ' offset Hrs')
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

//////////////////////////
  let inputCityDate = date;
  let inputCityDay = day;
  let utcTime = (currentDate.getTimezoneOffset())/60;
  console.log('utct time: ', utcTime)
  let inputCityHour = utcTime + currentDate.getHours() + utcHoursShift;
  console.log('first ', inputCityHour)
  let inputCityTimeofDay = ' AM';

  if (inputCityHour >= 24) {
    inputCityHour = inputCityHour - 24
    inputCityDay = days[currentDate.getDay() + 1];
    inputCityDate = currentDate.getDate() + 1;
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
  console.log(formattedDateTime, 'all data')
  return formattedDateTime;
}

export {formatDayOfWeek, updateDateTime, updateSunTimes}