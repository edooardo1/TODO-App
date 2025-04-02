import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import TaskList from '../TaskList/TaskList';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import Footer from '../Footer/Footer';
import './app.css';

export default class App extends Component {
  static defaultProps = {
    initialTasks: []
  };

  static propTypes = {
    initialTasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        created: PropTypes.instanceOf(Date)
      })
    )
  };

  state = {
    tasks: this.props.initialTasks,
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
      created: new Date()
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
    const filteredTasks = this.getFilteredTasks().map(task => ({
      ...task,
      createdText: formatDistanceToNow(task.created, { addSuffix: true })
    }));
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