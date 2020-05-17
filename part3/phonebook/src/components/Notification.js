import React from 'react'

const Notification = ({ message, status }) => {
  const style = {
    color: status === 'success' ? 'green' : 'red',
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
