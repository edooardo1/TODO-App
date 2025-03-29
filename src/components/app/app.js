import React, { Component } from 'react';
import TaskList from '../TaskList/TaskList';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import Footer from '../Footer/Footer';
import './app.css';

export default class App extends Component {
  state = {
    tasks: [
      { id: 1, description: 'Completed task', completed: true, created: '17 seconds ago' },
      { id: 2, description: 'Editing task', completed: false, created: '5 minutes ago' },
      { id: 3, description: 'Active task', completed: false, created: '5 minutes ago' },
    ]
  };

  toggleTaskStatus = taskId => this.setState(prev => ({
    tasks: prev.tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
  }));

  deleteTask = taskId => this.setState(prev => ({
    tasks: prev.tasks.filter(task => task.id !== taskId)
  }));

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList 
            tasks={this.state.tasks} 
            onToggleTask={this.toggleTaskStatus}
            onDeleteTask={this.deleteTask}
          />
        </section>
        <Footer />
      </section>
    );
  }
}