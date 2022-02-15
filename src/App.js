import './App.css';
import Weather from './Weather'
export default function App() {

  return (
    <div className="App">
      <div className="container">
        <img src="../public/assets/weather.svg" alt="clipart of a female figure standing next to a modal of a five day forecast"/>
        <Weather />
        <footer>
          This project was coded by Rebekah Cruz and is {' '}
          < a
          href="https://github.com/bexter89/react-weather-app" target="_blank"
          rel="noreferrer">
            open-sourced on Github
          </a>
        </footer>
      </div>
    </div>
  );
}
