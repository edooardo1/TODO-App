import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../TasksFilter/TasksFilter';
import './Footer.css';

export default class Footer extends Component {
  static defaultProps = {
    activeTasksCount: 0,
    currentFilter: 'all',
    onChangeFilter: () => {},
    onClearCompleted: () => {}
  };

  static propTypes = {
    activeTasksCount: PropTypes.number.isRequired,
    currentFilter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
    onChangeFilter: PropTypes.func.isRequired,
    onClearCompleted: PropTypes.func.isRequired
  };

  render() {
    const { activeTasksCount, currentFilter, onChangeFilter, onClearCompleted } = this.props;
    
    return (
      <footer className="footer">
        <span className="todo-count">
          {activeTasksCount} item{activeTasksCount !== 1 ? 's' : ''} left
        </span>
        <TasksFilter 
          currentFilter={currentFilter}
          onChangeFilter={onChangeFilter}
        />
        <button 
          className="clear-completed"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}