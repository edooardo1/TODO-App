import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  static defaultProps = {
    onAddTask: () => {},
  }

  static propTypes = {
    onAddTask: PropTypes.func.isRequired,
  }

  state = {
    description: '',
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.description.trim()) {
      this.props.onAddTask(this.state.description)
      this.setState({ description: '' })
    }
  }

  handleChange = (e) => {
    this.setState({ description: e.target.value })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.description}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}
