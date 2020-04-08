import React, { useState } from 'react'
import Country from './Country'

const ShowCountry = ({ country }) => {
  const [active, setActive] = useState(false)

  return (
    <>
      <li key={country.name}>{country.name}</li>
      <button onClick={() => setActive(!active)}>Show country</button>
      {active ? <Country country={country}> </Country> : <></>}
    </>
  )
}

const CountryList = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length === 1) {
    return <Country country={countries[0]}></Country>
  }

  return (
    <ul>
      {countries.map((country) => (
        <ShowCountry key={country.name} country={country}></ShowCountry>
      ))}
    </ul>
  )
}

export default CountryList
