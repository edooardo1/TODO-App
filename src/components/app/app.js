import React, { useEffect, useState, useRef } from 'react'
import { formatDistanceToNow } from 'date-fns'

import Footer from '../Footer/Footer'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import './app.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [filterState, setFilterState] = useState('all')
  const timerRef = useRef(null)

  const updateTimers = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.isTimerRunning && task.remainingTime > 0) {
          const newTime = task.remainingTime - 1
          return {
            ...task,
            remainingTime: newTime,
            isTimerRunning: newTime > 0,
          }
        }
        return task
      })
    )
  }

  useEffect(() => {
    timerRef.current = setInterval(updateTimers, 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  const addTask = (description, minutes, seconds) => {
    const duration = parseInt(minutes || '0', 10) * 60 + parseInt(seconds || '0', 10)
    if (!description.trim() || Number.isNaN(duration) || duration <= 0) return

    const newTask = {
      id: Date.now(),
      description: description.trim(),
      completed: false,
      editing: false,
      created: new Date(),
      createdText: 'just now',
      remainingTime: duration,
      isTimerRunning: false,
    }
    setTasks((prev) => [...prev, newTask])
  }

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const editTask = (id, newDescription) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, description: newDescription, editing: false } : task)))
  }

  const toggleEditMode = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, editing: !task.editing } : { ...task, editing: false })))
  }

  const changeFilter = (newFilter) => setFilterState(newFilter)

  const clearCompleted = () => setTasks(tasks.filter((task) => !task.completed))

  const startTimer = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, isTimerRunning: true } : task)))
  }

  const stopTimer = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, isTimerRunning: false } : task)))
  }

  const getFilteredTasks = () => {
    switch (filterState) {
      case 'active':
        return tasks.filter((task) => !task.completed)
      case 'completed':
        return tasks.filter((task) => task.completed)
      default:
        return tasks
    }
  }

  const activeTasksCount = tasks.filter((task) => !task.completed).length

  const filteredTasks = getFilteredTasks().map((task) => ({
    ...task,
    createdText: formatDistanceToNow(task.created, { addSuffix: true }),
  }))

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onToggleTask={toggleTaskStatus}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
          onToggleEdit={toggleEditMode}
          onStartTimer={startTimer}
          onStopTimer={stopTimer}
        />
      </section>
      <Footer
        activeTasksCount={activeTasksCount}
        currentFilter={filterState}
        onChangeFilter={changeFilter}
        onClearCompleted={clearCompleted}
      />
    </section>
  )
}

export default App
