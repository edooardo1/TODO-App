import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './NewTaskForm.css'

class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { description } = this.state
    const { onAddTask } = this.props
    if (description.trim()) {
      onAddTask(description)
      this.setState({ description: '' })
    }
  }

  handleChange = (e) => {
    this.setState({ description: e.target.value })
  }

  render() {
    const { description } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={description}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
}

export default NewTaskForm
