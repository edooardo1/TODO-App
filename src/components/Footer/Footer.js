import React, { Component } from 'react';
import TasksFilter from '../TasksFilter/TasksFilter';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <TasksFilter />
        <button className="clear-completed">Clear completed</button>
      </footer>
    );
  }
}