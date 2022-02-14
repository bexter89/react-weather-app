import React, { useState } from "react";
import axios from "axios";

export default function Search({ updateWeather, setFutureData, setValid }) {
  const [city, setCity] = useState("Austin");
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bafdfac4d6d7b1fc3d3952df39f393b7&units=imperial`;

  function handleSubmit(e) {
    e.preventDefault();
    if (city.length <= 2) {
      setValid(false)
    }
    else {
      axios.get(apiURL)
      .then(parseTodaysWeather)
      .catch(err => {
        if (err) {
          setValid(false);
        }
      })
    }
  }

  function handleChange(e) {
    setCity(e.target.value);
  }

  function get5DayForecast (coords) {
    let futureForecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=alert,minutely,current,hourly&appid=bafdfac4d6d7b1fc3d3952df39f393b7&units=imperial`
    axios.get(futureForecastURL).then(getFutureData)
  }

  function getFutureData(futureForecast) {
    let days = futureForecast.data.daily;
    days.shift()
    days.splice(5)
    let futureWeather = days.map(day => parseWeatherData(day))
    setFutureData(futureWeather)
  }

  function parseTodaysWeather(data) {
    get5DayForecast(data.data.coord);
    updateWeather(parseWeatherData(data.data));
    setValid(true)
  }

  function parseWeatherData(data) {
    function formatTime (timestamp) {
      let date =  new Date(timestamp * 1000);
      let hours = date.getHours();
      let minutes = "0" + date.getMinutes();
      let timeOfDay = hours >= 12 ? ` PM` : ` AM`
      if (hours >= 13) {
        hours = hours - 12;
      }
      let formattedTime = hours + ':' + minutes.substr(-2) + timeOfDay;
      return formattedTime;
    }

    function formatDate(timestamp) {
      let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', "Saturday"]
      let date = new Date(timestamp * 1000)
      let day = date.getDay();
      return week[day];
    }

    let cityData = {
      name: city,
      day: formatDate(data.dt),
      desc: data.weather[0].description,
      weatherCode: data.weather[0].icon,
      weatherID: data.weather[0].id,
      weatherMain: data.weather[0].main,
    };

    if (!data.main) {
      cityData.humidity = Math.round(data.humidity);
      cityData.temp =  Math.round(data.temp.day);
      cityData.tempMin = Math.round(data.temp.min);
      cityData.tempMax = Math.round(data.temp.max);
      cityData.wind = Math.round(data.wind_speed);
      cityData.sunrise = formatTime(data.sunrise);
      cityData.sunset = formatTime(data.sunset);
      cityData.moonPhase = data.moon_phase;
    } else {
      cityData.time = formatTime(data.dt);
      cityData.humidity = Math.round(data.main.humidity);
      cityData.temp =  Math.round(data.main.temp);
      cityData.tempMin = Math.round(data.main.temp_min);
      cityData.tempMax =  Math.round(data.main.temp_max);
      cityData.wind = data.wind.speed;
      cityData.sunrise = formatTime(data.sys.sunrise);
      cityData.sunset = formatTime(data.sys.sunset);
    };
    if (data.rain) {
      cityData.rain = data.rain
    };
    if (data.snow){
      cityData.snow = data.snow
    };
    return cityData;
  }

  return (
    <div className="Search">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
          <input
            type="search"
            placeholder="enter a city..."
            className="form-control"
            autoFocus="on"
            onChange={handleChange}
          />
          </div>
          <div className="col-3">
            <input
              className="btn btn-primary w-100"
              type="submit"
              value="search"
            />
          </div>
        </div>
      </form>
    </div>
  )
}