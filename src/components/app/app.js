import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Footer from '../Footer/Footer'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import './app.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: props.initialTasks.map((task) => ({
        ...task,
        timeSpent: 0,
        isTimerRunning: false,
        lastStartTime: null,
      })),
      filter: 'all',
    }
  }

  componentDidMount() {
    this.timerID = setInterval(this.updateTimers, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  updateTimers = () => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => {
        if (task.isTimerRunning && task.lastStartTime) {
          const now = Date.now()
          const delta = Math.floor((now - task.lastStartTime) / 1000)
          return {
            ...task,
            timeSpent: task.baseTimeSpent + delta,
          }
        }
        return task
      }),
    }))
  }

  toggleTaskStatus = (taskId) => {
    this.setState((prev) => ({
      tasks: prev.tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    }))
  }

  deleteTask = (taskId) => {
    this.setState((prev) => ({
      tasks: prev.tasks.filter((task) => task.id !== taskId),
    }))
  }

  addTask = (description) => {
    const newTask = {
      id: Date.now(),
      description,
      completed: false,
      created: new Date(),
      editing: false,
      timeSpent: 0,
      isTimerRunning: false,
      lastStartTime: null,
    }

    this.setState((prev) => ({
      tasks: [...prev.tasks, newTask],
    }))
  }

  editTask = (taskId, newDescription) => {
    this.setState((prev) => ({
      tasks: prev.tasks.map((task) =>
        task.id === taskId ? { ...task, description: newDescription, editing: false } : task
      ),
    }))
  }

  toggleEditMode = (taskId) => {
    this.setState((prev) => ({
      tasks: prev.tasks.map((task) =>
        task.id === taskId ? { ...task, editing: !task.editing } : { ...task, editing: false }
      ),
    }))
  }

  changeFilter = (filter) => {
    this.setState({ filter })
  }

  clearCompleted = () => {
    this.setState((prev) => ({
      tasks: prev.tasks.filter((task) => !task.completed),
    }))
  }

  getFilteredTasks = () => {
    const { tasks, filter } = this.state
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed)
      case 'completed':
        return tasks.filter((task) => task.completed)
      default:
        return tasks
    }
  }

  getActiveTasksCount = () => {
    const { tasks } = this.state
    return tasks.filter((task) => !task.completed).length
  }

  startTimer = (taskId) => {
    this.setState((prev) => ({
      tasks: prev.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              isTimerRunning: true,
              lastStartTime: Date.now(),
              baseTimeSpent: task.timeSpent,
            }
          : task
      ),
    }))
  }

  stopTimer = (taskId) => {
    this.setState((prev) => ({
      tasks: prev.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              isTimerRunning: false,
              lastStartTime: null,
              timeSpent: task.timeSpent,
            }
          : task
      ),
    }))
  }

  render() {
    const { filter } = this.state
    const filteredTasks = this.getFilteredTasks().map((task) => ({
      ...task,
      createdText: formatDistanceToNow(task.created, { addSuffix: true }),
    }))
    const activeTasksCount = this.getActiveTasksCount()

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onToggleTask={this.toggleTaskStatus}
            onDeleteTask={this.deleteTask}
            onEditTask={this.editTask}
            onToggleEdit={this.toggleEditMode}
            onStartTimer={this.startTimer}
            onStopTimer={this.stopTimer}
          />
        </section>
        <Footer
          activeTasksCount={activeTasksCount}
          currentFilter={filter}
          onChangeFilter={this.changeFilter}
          onClearCompleted={this.clearCompleted}
        />
      </section>
    )
  }
}

App.propTypes = {
  initialTasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      created: PropTypes.instanceOf(Date),
    })
  ),
}

App.defaultProps = {
  initialTasks: [],
}

export default App
