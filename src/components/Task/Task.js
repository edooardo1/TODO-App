import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

export default class Task extends Component {
  static defaultProps = {
    task: {},
    onToggle: () => {},
    onDelete: () => {}
  };

  static propTypes = {
    task: PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      createdText: PropTypes.string.isRequired
    }).isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  render() {
    const { task, onToggle, onDelete } = this.props;
    
    return (
      <li className={task.completed ? 'completed' : ''}>
        <div className="view">
          <input 
            className="toggle" 
            type="checkbox" 
            checked={task.completed} 
            onChange={onToggle}
          />
          <label>
            <span className="description">{task.description}</span>
            <span className="created">{task.createdText}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDelete}></button>
        </div>
      </li>
    );
  }
}