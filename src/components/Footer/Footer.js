import React, { Component } from 'react';
import TasksFilter from '../TasksFilter/TasksFilter';
import './Footer.css';

export default class Footer extends Component {
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