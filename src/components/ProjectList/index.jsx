import React, {Component} from 'react';
import Project from '../Project';

class ProjectList extends Component {
    getTodosByProject = (id) => {
        let todosJSX = this.props.todos.filter((todo, j) => {
            if(todo.project === id) {
                return true;
            }
        })
        return todosJSX;
    }

    render() {
        let projects = this.props.projects.filter((project, i) => {
            let todos = this.getTodosByProject(project.id);
            return todos.length > 0 ? true : false;
        })
        let projectsJSX= projects.map((project, i) => {
            let todos = this.getTodosByProject(project.id);
            return <Project id={project.id}
                            title ={project.title}
                            todos={todos}
                            status={this.props.status}
                            labels={this.props.labels}
                            getTitleById = {this.props.getTitleById}
                            updateTask={this.props.updateTask}
                            removeTodos={this.props.removeTodos}
                            />
        })
        return (
            <div>{projectsJSX}</div>
        )
    }
}

export default ProjectList;