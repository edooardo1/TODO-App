import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import './Task.css'

function formatTime(seconds) {
  const total = Number(seconds)
  if (Number.isNaN(total) || total < 0) return '00:00'

  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

function Task({ task, onToggle, onDelete, onEdit, onToggleEdit, onStartTimer, onStopTimer }) {
  const [editText, setEditText] = useState(task.description)

  useEffect(() => {
    if (task.editing) {
      setEditText(task.description)
    }
  }, [task.editing, task.description])

  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (editText.trim()) {
      onEdit(task.id, editText)
    }
  }

  const handleTimerClick = () => {
    if (task.isTimerRunning) {
      onStopTimer(task.id)
    } else {
      onStartTimer(task.id)
    }
  }

  return (
    <li className={`${task.completed ? 'completed' : ''} ${task.editing ? 'editing' : ''}`}>
      <div className="view">
        <input
          id={`toggle-${task.id}`}
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
        />
        <label htmlFor={`toggle-${task.id}`}>
          <div className="task-text">
            <span className="description">{task.description}</span>
            <span className="timer">{formatTime(task.remainingTime)}</span>
            <button
              className="icon icon-timer"
              type="button"
              onClick={handleTimerClick}
              aria-label={task.isTimerRunning ? 'Pause timer' : 'Start timer'}
            >
              {task.isTimerRunning ? '⏸' : '▶'}
            </button>
            <span className="created">{task.createdText}</span>
          </div>
        </label>
        <button
          className="icon icon-edit"
          type="button"
          onClick={() => onToggleEdit(task.id)}
          disabled={task.completed}
          aria-label="Edit task"
        />
        <button className="icon icon-destroy" type="button" onClick={onDelete} aria-label="Delete task" />
      </div>
      {task.editing && (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            className="edit"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                onToggleEdit(task.id)
              }
            }}
          />
        </form>
      )}
    </li>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdText: PropTypes.string.isRequired,
    editing: PropTypes.bool.isRequired,
    remainingTime: PropTypes.number.isRequired,
    isTimerRunning: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
}

export default Task
