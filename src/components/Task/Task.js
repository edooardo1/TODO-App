import React, { Component } from 'react';
import './Task.css';

export default class Task extends Component {
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
            <span className="created">{task.created}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDelete}></button>
        </div>
        {task.editing && <input type="text" className="edit" value={task.description} />}
      </li>
    );
  }
}