import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

function NewTaskForm({ onAddTask }) {
  const [description, setDescription] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (description && onAddTask) {
      onAddTask(description, minutes, seconds)
      setDescription('')
      setMinutes('')
      setSeconds('')
    }
  }

  return (
    <form className="new-task-form" onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit(e)
        }}
      />
      <input
        type="number"
        className="time-input"
        placeholder="min"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
      />
      <input
        type="number"
        className="time-input"
        placeholder="sec"
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
      />
    </form>
  )
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
}

export default NewTaskForm
