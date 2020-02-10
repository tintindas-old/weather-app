import React, {useState} from 'react';


const api = {
  key: process.env.REACT_APP_OPEN_WEATHER_KEY,
  baseURL: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(api.baseURL+ "weather?q=" + query + "&units=metric&appid=" + api.key)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
          console.log(api.key);
        });
    }
  }

  let today = new Date();
  const options = {
    weekday: "long",
    timezone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: "true"
  };
  today = today.toLocaleString("en-GB", options);


  return (
    <div className="app">
      <main>

        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search} />
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{today}</div>
            </div>

            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className="init-box">
            <div className="init-text">Enter the name of your City</div>
          </div>
        )}

        <footer>a tintin_das creation</footer>

      </main>
    </div>
  );
}

export default App;
