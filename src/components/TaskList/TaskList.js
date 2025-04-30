import PropTypes from 'prop-types'
import React from 'react'

import Task from '../Task/Task'
import './TasksList.css'

function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask, onToggleEdit, onStartTimer, onStopTimer }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggle={() => onToggleTask(task.id)}
          onDelete={() => onDeleteTask(task.id)}
          onEdit={onEditTask}
          onToggleEdit={onToggleEdit}
          onStartTimer={onStartTimer}
          onStopTimer={onStopTimer}
        />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdText: PropTypes.string.isRequired,
      editing: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  onStartTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
}

export default TaskList
