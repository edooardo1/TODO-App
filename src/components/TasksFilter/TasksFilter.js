import PropTypes from 'prop-types'
import React from 'react'
import './TasksFilter.css'

function TasksFilter({ currentFilter, onChangeFilter }) {
  return (
    <ul className="filters">
      <li>
        <button
          className={currentFilter === 'all' ? 'selected' : ''}
          onClick={() => onChangeFilter('all')}
          type="button"
        >
          All
        </button>
      </li>
      <li>
        <button
          className={currentFilter === 'active' ? 'selected' : ''}
          onClick={() => onChangeFilter('active')}
          type="button"
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={currentFilter === 'completed' ? 'selected' : ''}
          onClick={() => onChangeFilter('completed')}
          type="button"
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.propTypes = {
  currentFilter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  onChangeFilter: PropTypes.func.isRequired,
}

export default TasksFilter
