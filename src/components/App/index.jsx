import React, { Component } from 'react';
//import './App.css';
import TodoList from '../TodoList';
import Projects from '../Projects';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: props.todos,
      projects: props.projects
    }
  }
  render() {
    const getProjectById = (id) => {
      return this.props.projects.find((project, index) => {
          return project.id === id;
      });
  }
    return (
      <div>
        <TodoList todos={this.state.todos} projects={this.state.projects} getProjectById={getProjectById} />
        <Projects projects={this.state.projects} />
        </div>
    );
  }
}

export default App;
