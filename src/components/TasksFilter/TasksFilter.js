import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TasksFilter.css';

export default class TasksFilter extends Component {
  static defaultProps = {
    currentFilter: 'all',
    onChangeFilter: () => {}
  };

  static propTypes = {
    currentFilter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
    onChangeFilter: PropTypes.func.isRequired
  };

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