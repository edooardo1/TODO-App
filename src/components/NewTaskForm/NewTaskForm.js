import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './NewTaskForm.css'

class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      minutes: '',
      seconds: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { description, minutes, seconds } = this.state
    const { onAddTask } = this.props

    const duration = parseInt(minutes || '0', 10) * 60 + parseInt(seconds || '0', 10)

    if (description.trim() && duration > 0) {
      onAddTask(description, duration)
      this.setState({ description: '', minutes: '', seconds: '' })
    }
  }

  render() {
    const { description, minutes, seconds } = this.state

    return (
      <form className="new-task-form" onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={description}
          onChange={(e) => this.setState({ description: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') this.handleSubmit(e)
          }}
        />
        <input
          type="number"
          className="time-input"
          placeholder="min"
          value={minutes}
          onChange={(e) => this.setState({ minutes: e.target.value })}
        />
        <input
          type="number"
          className="time-input"
          placeholder="sec"
          value={seconds}
          onChange={(e) => this.setState({ seconds: e.target.value })}
        />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
}

export default NewTaskForm
