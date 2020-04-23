import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')

  const hook = () => {
    personService.getAll().then(data => {
      setPersons(data)
    })
  }
  useEffect(hook, [])

  const handleForm = event => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    let replacePhoneNumber = false

    // Does the phone number already exist?
    if (names.includes(newName)) {
      replacePhoneNumber = window.confirm(
        `${newName} is already in phonebook, replace number?`
      )

      // Replace it.
      if (replacePhoneNumber) {
        const oldPerson = persons.filter(p => p.name === newName)[0]
        const newPerson = {
          ...oldPerson,
          number: newNumber,
        }

        personService
          .update(oldPerson.id, newPerson) // Server side.
          .then(() => {
            // Client side.
            let newPersons = persons.slice()
            const i = newPersons.findIndex(p => p.id === oldPerson.id)
            newPersons[i] = newPerson
            setPersons(newPersons)
            setMessage(`Modified ${newPerson.name}'s number`)
          })
        return
      } else {
        // We don't replace the phone number, so exit.
        return
      }
    }

    // It doens't, so create a new person instead.
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    personService.create(newPerson).then(data => {
      setPersons(persons.concat(data))
      setNewName('')
      setNewNumber('')
      setMessage(`Added ${newPerson.name}`)
    })
  }

  const handleRemoval = id => () => {
    const person = persons.filter(p => p.id === id)[0]

    const yes = window.confirm(`Delete ${person.name} ?`)
    if (yes) {
      personService
        .remove(id) // Server side.
        .then(() => {
          // Client side.
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }
  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }
  const handleFilter = event => {
    setFilter(event.target.value)
  }

  const filteredView = filter
    ? persons.filter(person => person.name.includes(filter))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleFilter}></Filter>
      <Notification message={message}></Notification>
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleForm={handleForm}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      ></PersonForm>
      <h3>Numbers</h3>
      <Persons persons={filteredView} handleRemoval={handleRemoval}></Persons>
    </div>
  )
}

export default App
