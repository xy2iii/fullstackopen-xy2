import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

const App = (props) => {
  // notes is an initial value, passed by props.
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const fetchCountries = () => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data)
    })
  }
  useEffect(fetchCountries, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = filter
    ? countries.filter((country) => country.name.includes(filter))
    : countries

  return (
    <>
      Find country: <input value={filter} onChange={handleFilter}></input>
      <CountryList countries={filteredCountries}></CountryList>
    </>
  )
}
export default App
