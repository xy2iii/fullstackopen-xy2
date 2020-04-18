import React from 'react'

const Persons = ({ persons, handleRemoval }) => (
  <ul>
    {persons.map(person => (
      <li key={person.id}>
        {person.name} : {person.number}
        <button onClick={handleRemoval(person.id)}>Remove phone number</button>
      </li>
    ))}
  </ul>
)

export default Persons
