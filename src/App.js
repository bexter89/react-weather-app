import './App.css';
import Weather from './Weather'
export default function App() {

  return (
    <main className="App">
      <div className="container">
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
    </main>
  );
}
