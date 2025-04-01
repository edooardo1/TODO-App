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
    ],
    filter: 'all'
  };

  toggleTaskStatus = taskId => this.setState(prev => ({
    tasks: prev.tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
  }));

  deleteTask = taskId => this.setState(prev => ({
    tasks: prev.tasks.filter(task => task.id !== taskId)
  }));

  addTask = description => {
    const newTask = {
      id: Date.now(),
      description,
      completed: false,
      created: 'just now'
    };
    
    this.setState(prev => ({
      tasks: [...prev.tasks, newTask]
    }));
  };

  changeFilter = filter => this.setState({ filter });

  clearCompleted = () => this.setState(prev => ({
    tasks: prev.tasks.filter(task => !task.completed)
  }));

  getFilteredTasks = () => {
    const { tasks, filter } = this.state;
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  getActiveTasksCount = () => {
    return this.state.tasks.filter(task => !task.completed).length;
  };

  render() {
    const { filter } = this.state;
    const filteredTasks = this.getFilteredTasks();
    const activeTasksCount = this.getActiveTasksCount();

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList 
            tasks={filteredTasks} 
            onToggleTask={this.toggleTaskStatus}
            onDeleteTask={this.deleteTask}
          />
        </section>
        <Footer 
          activeTasksCount={activeTasksCount}
          currentFilter={filter}
          onChangeFilter={this.changeFilter}
          onClearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}