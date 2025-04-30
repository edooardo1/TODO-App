import PropTypes from 'prop-types'
import React from 'react'

import TasksFilter from '../TasksFilter/TasksFilter'
import './Footer.css'

function Footer({ activeTasksCount, currentFilter, onChangeFilter, onClearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {activeTasksCount} item{activeTasksCount !== 1 ? 's' : ''} left
      </span>
      <TasksFilter currentFilter={currentFilter} onChangeFilter={onChangeFilter} />
      <button className="clear-completed" onClick={onClearCompleted} type="button">
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  activeTasksCount: PropTypes.number.isRequired,
  currentFilter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
}

export default Footer
