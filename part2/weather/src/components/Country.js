import React from 'react'

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
        <li>{l.name}</li>
      ))}
    </ul>
    <img src={country.flag} alt={country.name}></img>
  </div>
)

export default Country