import React from 'react'

const PersonForm = ({
  newName,
  newNumber,
  handleNewPerson,
  handleNameChange,
  handleNumberChange,
}) => (
  <form onSubmit={handleNewPerson}>
    <div>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm
