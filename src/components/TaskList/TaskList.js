import React, { Component } from 'react';
import Task from '../Task/Task';
import './TasksList.css';

export default class TaskList extends Component {
  render() {
    const { tasks, onToggleTask, onDeleteTask } = this.props;
    
    return (
      <ul className="todo-list">
        {tasks.map(task => (
          <Task 
            key={task.id} 
            task={task} 
            onToggle={() => onToggleTask(task.id)}
            onDelete={() => onDeleteTask(task.id)}
          />
        ))}
      </ul>
    );
  }
}