import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function Weather() {
  let [city, setCity] = useState(null);
  let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState(null);
  function handleSubmit(event) {
    event.preventDefault();
    if (city) {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a95c2c6739994ba4903e007ee817e7d1&units=metric`;
      axios.get(url).then(showWeather);
    }
  }
  function showWeather(response) {
    console.log(response.data);
    setTemperature(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].description);
    setHumidity(Math.round(response.data.main.humidity));
    setWind(response.data.wind.speed);
    let tempIcon = response.data.weather[0].icon;
    setIcon(`https://openweathermap.org/img/wn/${tempIcon}@2x.png`);
  }
  function updateInput(event) {
    console.log(event.target.value);
    setCity(event.target.value);
  }
  let ul;
  if (temperature) {
    ul = (
      <ul>
        <li>Temperature: {temperature}°C</li>
        <li>Description: {description}</li>
        <li>Humidity: {humidity}%</li>
        <li>Wind: {wind}km/h</li>
        <li>
          <img src={icon} />{" "}
        </li>
      </ul>
    );
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="search" onChange={updateInput} />
        <input type="submit" value="Search" />
      </form>
      {ul}
    </div>
  );
}
