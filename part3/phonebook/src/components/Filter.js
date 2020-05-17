import React from 'react'

const Filter = ({ filter, handleChange }) => {
  return (
    <>
      filter shown with <input value={filter} onChange={handleChange}></input>
    </>
  )
}

export default Filter
