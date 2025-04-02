import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from '../Task/Task';
import './TasksList.css';

export default class TaskList extends Component {
  static defaultProps = {
    tasks: [],
    onToggleTask: () => {},
    onDeleteTask: () => {}
  };

  static propTypes = {
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        createdText: PropTypes.string.isRequired
      })
    ).isRequired,
    onToggleTask: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired
  };

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