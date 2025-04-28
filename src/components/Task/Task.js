import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './Task.css'

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${h}h ${m}m ${s}s`
}

export default class Task extends Component {
  static defaultProps = {
    task: {},
    onToggle: () => {},
    onDelete: () => {},
    onEdit: () => {},
    onToggleEdit: () => {},
    onStartTimer: () => {},
    onStopTimer: () => {},
  }

  static propTypes = {
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

  state = {
    editText: this.props.task.description,
  }

  handleEditChange = (e) => {
    this.setState({ editText: e.target.value })
  }

  handleEditSubmit = (e) => {
    e.preventDefault()
    if (this.state.editText.trim()) {
      this.props.onEdit(this.props.task.id, this.state.editText)
    }
  }

  handleEditKeyDown = (e) => {
    if (e.key === 'Escape') {
      this.props.onToggleEdit(this.props.task.id)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.task.editing && !prevProps.task.editing) {
      this.setState({ editText: this.props.task.description })
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

          <label className="task-info">
            <span className="description">{task.description}</span>
            <span className="created">{task.createdText}</span>
          </label>

          <span className="timer">{formatTime(task.timeSpent)}</span>

          <button className="icon icon-timer" onClick={this.handleTimerClick}>
            {task.isTimerRunning ? 'Stop' : 'Start'}
          </button>
          <button className="icon icon-edit" onClick={() => onToggleEdit(task.id)} disabled={task.completed} />
          <button className="icon icon-destroy" onClick={onDelete} />
        </div>

        {task.editing && (
          <form onSubmit={this.handleEditSubmit}>
            <input
              type="text"
              className="edit"
              value={editText}
              onChange={this.handleEditChange}
              onBlur={this.handleEditSubmit}
              onKeyDown={this.handleEditKeyDown}
            />
          </form>
        )}
      </li>
    )
  }
}
