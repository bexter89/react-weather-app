import React, { useState } from "react";
import axios from "axios";

export default function Search({ updateWeather, setFutureData, setShowWeather }) {
  const [city, setCity] = useState("Austin");
  const [showHelperText, setShowHelperText] = useState(false);

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=898e905f7875f8205e8a422f229b472e&units=imperial`;

  function handleSubmit(e) {
    e.preventDefault();
    if (city.length <= 2) {
      setShowHelperText(true);
    } else {
      search();
    }
  }

  function search() {
    axios
      .get(apiURL)
      .then((data, err) => {
        if (err) {
          setShowHelperText(true);
          throw(err);
        } else {
          parseTodaysWeather(data);
          setShowWeather(true);
          setShowHelperText(false);
        }
      })
      .catch((err) => {
        if (err) {
          console.error(err);
          setShowHelperText(true);
        }
      });
  }

  function handleChange(e) {
    setCity(e.target.value);
  }

  function get5DayForecast(coords) {
    let futureForecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=current,minutely,hourly&appid=898e905f7875f8205e8a422f229b472e&units=imperial`;
    axios
      .get(futureForecastURL)
      .then((data, err) => {
        if (err) {
          throw(err);
        } else {
          getFutureData(data);
          setShowWeather(true);
          setShowHelperText(false);
        }
      })
      .catch((err) => {
        if (err) {
          setShowWeather(false);
          console.error(err);
        }
      });
  }

  function handleXClick(e) {
    e.preventDefault();
    setShowHelperText(false);
  }

  function getFutureData(futureForecast) {
    console.log("future forecast: ", futureForecast);
    let days = futureForecast.data.daily;
    days.shift();
    days.splice(5);
    let futureWeather = days.map((day) => parseWeatherData(day));
    setFutureData(futureWeather);
  }

  function parseTodaysWeather(data) {
    get5DayForecast(data.data.coord);
    updateWeather(parseWeatherData(data.data));
    setShowWeather(true);
  }

  function parseWeatherData(data) {
    function formatTime(timestamp) {
      let date = new Date(timestamp * 1000);
      let hours = date.getHours();
      let minutes = "0" + date.getMinutes();
      let timeOfDay = hours >= 12 ? ` PM` : ` AM`;
      if (hours >= 13) {
        hours = hours - 12;
      }
      let formattedTime = hours + ":" + minutes.substr(-2) + timeOfDay;
      return formattedTime;
    }

    function formatDate(timestamp) {
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
      cityData.temp = Math.round(data.temp.day);
      cityData.tempMin = Math.round(data.temp.min);
      cityData.tempMax = Math.round(data.temp.max);
      cityData.wind = Math.round(data.wind_speed);
      cityData.sunrise = formatTime(data.sunrise);
      cityData.sunset = formatTime(data.sunset);
      cityData.moonPhase = data.moon_phase;
    } else {
      cityData.time = formatTime(data.dt);
      cityData.humidity = Math.round(data.main.humidity);
      cityData.temp = Math.round(data.main.temp);
      cityData.tempMin = Math.round(data.main.temp_min);
      cityData.tempMax = Math.round(data.main.temp_max);
      cityData.wind = data.wind.speed;
      cityData.sunrise = formatTime(data.sys.sunrise);
      cityData.sunset = formatTime(data.sys.sunset);
    }
    if (data.rain) {
      cityData.rain = data.rain;
    }
    if (data.snow) {
      cityData.snow = data.snow;
    }
    return cityData;
  }

  return (
    <section className="Search">
      <form onSubmit={handleSubmit}>
        <div className="row align-items-center">
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
      {showHelperText ? (
        <div className="Helper mt-1 row justify-content-center">
          <div className="col text-center">
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>Please enter a valid city name</strong>
              <button
                onClick={handleXClick}
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      )
      :
      null
      }
    </section>
  );
}
