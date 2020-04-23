import React from 'react'

const Notification = ({ message }) => {
  const style = {
    color: 'green',
    background: 'lightgray',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }
  return <div style={style}>{message}</div>
}

export default Notification
