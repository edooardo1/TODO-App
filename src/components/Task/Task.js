import React from 'react';
import './Task.css';

const Task = ({ task }) => {
  return (
    <li className={task.completed ? 'completed' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={task.completed} readOnly />
        <label>
          <span className="description">{task.description}</span>
          <span className="created">{task.created}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      {task.editing && (
        <input type="text" className="edit" value={task.description} />
      )}
    </li>
  );
};

export default Task;