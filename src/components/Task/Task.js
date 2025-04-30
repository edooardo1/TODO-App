import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './Task.css'

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${h}h ${m}m ${s}s`
}

class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editText: props.task.description,
    }
  }

  componentDidUpdate(prevProps) {
    const { task } = this.props
    if (task.editing && !prevProps.task.editing) {
      this.setState({ editText: task.description })
    }
  }

  handleEditChange = (e) => {
    this.setState({ editText: e.target.value })
  }

  handleEditSubmit = (e) => {
    e.preventDefault()
    const { editText } = this.state
    const { task, onEdit } = this.props
    if (editText.trim()) {
      onEdit(task.id, editText)
    }
  }

  handleEditKeyDown = (e) => {
    const { task, onToggleEdit } = this.props
    if (e.key === 'Escape') {
      onToggleEdit(task.id)
    }
  }

  handleTimerClick = () => {
    const { task, onStartTimer, onStopTimer } = this.props
    if (task.isTimerRunning) {
      onStopTimer(task.id)
    } else {
      onStartTimer(task.id)
    }
  }

  render() {
    const { task, onToggle, onDelete, onToggleEdit } = this.props
    const { editText } = this.state

    return (
      <li className={`${task.completed ? 'completed' : ''} ${task.editing ? 'editing' : ''}`}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={task.completed} onChange={onToggle} />

          <div className="task-info" id={`label-${task.id}`}>
            {' '}
            {}
            <span className="description">{task.description}</span>
            <span className="created">{task.createdText}</span>
          </div>

          <span className="timer">{formatTime(task.timeSpent)}</span>

          <button
            className="icon icon-timer"
            onClick={this.handleTimerClick}
            type="button"
            aria-label={task.isTimerRunning ? 'Stop timer' : 'Start timer'}
          >
            {task.isTimerRunning ? 'Stop' : 'Start'}
          </button>
          <button
            className="icon icon-edit"
            onClick={() => onToggleEdit(task.id)}
            disabled={task.completed}
            type="button"
            aria-label="Edit task"
          />
          <button className="icon icon-destroy" onClick={onDelete} type="button" aria-label="Delete task" />
        </div>

        {task.editing && (
          <form onSubmit={this.handleEditSubmit}>
            <label htmlFor={`edit-${task.id}`} className="visually-hidden">
              <span>Edit task input</span>
              <input
                id={`edit-${task.id}`}
                type="text"
                className="edit"
                value={editText}
                onChange={this.handleEditChange}
                onBlur={this.handleEditSubmit}
                onKeyDown={this.handleEditKeyDown}
                aria-labelledby={`label-${task.id}`}
              />
            </label>
          </form>
        )}
      </li>
    )
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdText: PropTypes.string.isRequired,
    editing: PropTypes.bool.isRequired,
    timeSpent: PropTypes.number,
    isTimerRunning: PropTypes.bool,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
}

export default Task
