import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState(null)

  const fetchWeather = () => {
    axios
      .get('http://api.weatherstack.com/current', {
        params: {
          access_key: api_key,
          query: country.capital,
        },
      })
      .then((response) => {
        setWeather(response.data)
      })
  }
  useEffect(fetchWeather, [])

  if (weather) {
    return (
      <>
        <h2>Weather in {country.name}</h2>
        <div>
          <b>Temperature:</b> {weather.current.temperature}
        </div>
        <img
          src={weather.current.weather_icons[0]}
          alt={weather.current.weather_descriptions[0]}
        ></img>
        <div>
          <b>Wind:</b> {weather.current.wind_speed} mph direction{' '}
          {weather.current.wind_dir}
        </div>
      </>
    )
  }
  return <p>Fetching weather, please wait...</p>
}

const Country = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <p>
      capital: {country.capital} <br></br>
      population: {country.population}
    </p>
    <h2>languages</h2>
    <ul>
      {country.languages.map((l) => (
        <li key={l.name}>{l.name}</li>
      ))}
    </ul>
    <img src={country.flag} alt={country.name}></img>
    <Weather country={country}></Weather>
  </div>
)

export default Country
