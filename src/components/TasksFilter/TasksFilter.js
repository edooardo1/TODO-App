import React, { Component } from 'react';
import './TasksFilter.css';

export default class TasksFilter extends Component {
  render() {
    const { currentFilter, onChangeFilter } = this.props;
    
    return (
      <ul className="filters">
        <li>
          <button 
            className={currentFilter === 'all' ? 'selected' : ''}
            onClick={() => onChangeFilter('all')}
          >
            All
          </button>
        </li>
        <li>
          <button 
            className={currentFilter === 'active' ? 'selected' : ''}
            onClick={() => onChangeFilter('active')}
          >
            Active
          </button>
        </li>
        <li>
          <button 
            className={currentFilter === 'completed' ? 'selected' : ''}
            onClick={() => onChangeFilter('completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}