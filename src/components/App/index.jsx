import React, { Component } from 'react';
//import './App.css';
import TodoList from '../TodoList';
import Projects from '../Projects';
import AddTodo from '../AddTodo';
import ProjectList from '../ProjectList';

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

  clearComplete = (projectId) => {
    let completeTodos = [];
    this.props.todos.forEach((todo, i) => {
        if(Number(todo.status) === 101) {
            completeTodos.push(todo.id);
        }
    })
    this.removeTodos(completeTodos);
}

  addNewTask = (todo) => {
    let labels = [];
    this.state.labels.forEach((label, i) =>{
      console.log(todo.label.value)
      console.log(label.id)
      if(Number(todo.label.value) === label.id){
        labels[i] = {
          id: todo.label.value,
          ischecked: true
        } 
      } else {
        labels[i] = {
          id: todo.label.value,
          ischecked: false
        } 
      }
    })
    console.log(labels);
    let newTodo = {
      id: this.getNextId(this.state.todos),
      title: todo.title.value,
      description: todo.description.value,
      status: Number(todo.status.value),
      project: Number(todo.project.value),
      labels: labels
    }
    this.state.todos.push(newTodo)
    this.setState(this.state.todos)
  }

  updateTask = (task, id) => {
    this.state.todos.forEach((todo, i) => {
      if(todo.id === id) {
        this.state.todos[i].title = task.title.value;
        this.state.todos[i].description = task.description.value;
        this.state.todos[i].status = task.status.value;
        //set labels
        task.labels.forEach((label, j) => {
          this.state.todos[i].labels[j].ischecked = task.labels[j].checked
        })
        this.setState(this.state.todos);
      }
    })
  }

  getTitleById = (name, id) => {
    return this.props[name].find((key, index) => {
        return key.id === id;
    });
  }

  removeTodos = (todoIdArray) => {
    todoIdArray.forEach((id, i) => {
      this.state.todos.forEach((todo, index) => {
        if(id === todo.id) {
          this.state.todos.splice(index, 1);
        }
      })
    })
    this.setState(this.state.todos);
  }

  render() {

    return (
      <div>
        <button class="pull-right btn btn-default" onClick={()=>{this.clearComplete(this.props.id)}}>Clear Complete</button>
        <AddTodo projects={this.state.projects}  status={this.state.status}  labels={this.state.labels} addNewTask={this.addNewTask} />
        <TodoList projects={this.state.projects} todos={this.state.todos} getTitleById = {this.getTitleById} removeTodos={this.removeTodos} />
        <Projects projects={this.state.projects} />
        <ProjectList  projects={this.state.projects}
                      todos={this.state.todos}
                      getTitleById = {this.getTitleById}
                      status={this.state.status}
                      labels={this.state.labels}
                      updateTask={this.updateTask}
                      removeTodos={this.removeTodos}
                      />
      </div>
    );
  }
}

export default App;
