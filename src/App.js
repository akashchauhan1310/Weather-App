import React, { useState } from 'react'
import swal from 'sweetalert'

const api = {
  key: 'your-api-key-here',
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key == 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          if (result.cod == 404)
            (
              swal("City Not Found!", "Try checking your spelling or enter a different city", "warning")
            )
        });

    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let fulldate = day + ", " + date + " " + month + " " + year;
    return fulldate;

  }
  const bgSelector = (id) => {
    if (id >= 200 && id < 300)
      return 'app thunderstorm'
    else if (id >= 300 && id < 400)
      return 'app drizzle'
    else if (id >= 500 && id < 600)
      return 'app rain'
    else if (id >= 600 && id < 700)
      return 'app snow'
    else if (id >= 700 && id < 800)
      return 'app fog'
    else if (id == 800)
      return 'app clear'
    else if (id >= 801 && id < 900)
      return 'app cloud'
  }

  return (
    <div className={
      (typeof weather.main != "undefined")
        ? (bgSelector(weather.weather[0].id))
        : 'app warm'
    }
    >
      <div className="main">
        <div className="search-box">
          <input
            id="citySearch"
            type="text"
            className="search-bar"
            placeholder="Search City..."
            onChange={e => setQuery(e.target.value)}
            // value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ?
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
          </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
            <div className="weather-sec">
              <div className="temp-box max">
                <div className="heading max">Maximum</div>
                <div className="temper max">{Math.round(weather.main.temp_max)}°c</div>
              </div>
              <div className="temp-box min">
                <div className="heading min">Minimum</div>
                <div className="temper min">{Math.round(weather.main.temp_min)}°c</div>
              </div>
              <div className="temp-box hum">
                <div className="heading hum">Humidity</div>
                <div className="temper hum">{weather.main.humidity}%</div>
              </div>
            </div>
          </div>
          : ('')}
      </div>
    </div>
  );
}

export default App;
