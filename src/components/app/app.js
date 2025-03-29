import React from 'react';
import TaskList from '../TaskList/TaskList';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import Footer from '../Footer/Footer';
import './app.css'

const App = () => {
  const tasks = [
    { id: 1, description: 'Completed task', completed: true, created: '17 seconds ago' },
    { id: 2, description: 'Editing task', completed: false, created: '5 minutes ago' },
    { id: 3, description: 'Active task', completed: false, created: '5 minutes ago' },
  ];

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList tasks={tasks} />
      </section>
      <Footer />
    </section>
  );
};

export default App;