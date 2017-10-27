import React, { Component } from 'react';
//import './App.css';
import TodoList from '../TodoList';
import Projects from '../Projects';
import AddTodo from '../AddTodo';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: props.todos,
      projects: props.projects,
      status: props.status,
      labels: props.labels
    }
  }

  getNextId = (arrName => arrName[arrName.length-1].id+1);


  addNewTask = (todo) => {
    let newTodo = {
      id: this.getNextId(this.state.todos),
      title: todo.title.value,
      description: todo.description.value,
      status: Number(todo.status.value),
      project: Number(todo.project.value),
      labels: todo.label.value.split(" ")
    }
    this.state.todos.push(newTodo)
    this.setState(this.state.todos)
    console.log(this.state.todos);
  }

  getTitleById = (name, id) => {
    return this.props[name].find((key, index) => {
        return key.id === id;
    });
  }

  render() {

    return (
      <div>
        <AddTodo projects={this.state.projects}  status={this.state.status}  labels={this.state.labels} addNewTask={this.addNewTask} />
        <TodoList todos={this.state.todos} getTitleById = {this.getTitleById} />
        <Projects projects={this.state.projects} />
      </div>
    );
  }
}

export default App;
