import React, { useState } from "react";
import axios from "axios";
import  { parseTodaysWeatherData, parseFutureData } from './apiHelpers/dataHandlers'

export default function Search({ updateWeather, setFutureData, setShowWeather, setShowExpanded, setCloseExpandedView }) {
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
          setCloseExpandedView(true)
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
    let days = futureForecast.data.daily;
    days.shift();
    days.splice(5);
    let futureWeather = days.map((dailyData) => parseFutureData(city, dailyData));
    setFutureData(futureWeather);
  }

  function parseTodaysWeather(data) {
    get5DayForecast(data.data.coord);
    let todaysWeather = parseTodaysWeatherData(city, data.data)
    updateWeather(todaysWeather);
    setShowWeather(true);
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
