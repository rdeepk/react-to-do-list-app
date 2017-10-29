import React, {Component} from 'react';
import TodoList from '../TodoList';

class Filter extends Component {

    // filterByProjects = () => {
    //     let project = [];
    //     this.props.todos.map((todo, index)=>{
    //         //let projectName = this.props.getTitleById('projects', Number(todo.project)).title;
    //         //check if project is already initialized
    //         //let projectExists = typeof project[projectName] !== 'undefined' && project[projectName] instanceof Array
    //         //if not then initialize it
    //         //project[projectName] = projectExists ? project[projectName]: [];
    //         let projectName = this.props.getTitleById('projects', Number(todo.project)).title;
    //         let task = {};
    //         for (var key in todo) {
    //             task[key] = todo[key];
    //         }
    //         console.log(task);
    //     })
    //     //console.log(project);
    //     return project;
    // }

        

    filterByStatus = () => {
        let status = {};
        this.props.todos.map((todo, index)=>{
            //check if project is already initialized
            let statusExists = typeof status[todo.status] !== 'undefined' && status[todo.status] instanceof Array
            //if not then initialize it
            status[todo.status] = statusExists ? status[todo.status]: [];
            let task = {};
            for (var key in todo) {
                task[key] = todo[key];
            }
            status[todo.status].push(task);
            
        })
        //console.log(status);
        return status;
    }

    filterByLabels() {
        let status = {};
        this.props.todos.map((todo, index)=>{
            //check if project is already initialized
            let statusExists = typeof status[todo.status] !== 'undefined' && status[todo.status] instanceof Array
            //if not then initialize it
            status[todo.status] = statusExists ? status[todo.status]: [];
            let task = {};
            for (var key in todo) {
                task[key] = todo[key];
            }
            status[todo.status].push(task);
            
        })
        //console.log(status);
        return status;
    }


    render() {
        // let todosByProject = this.props.projects.reduce((todos, project)=>{
        //     let todosJSX = this.props.todos.filter((todo, j) => {
        //         if(todo.project === project.id) {
        //             return true;
        //         }
        //     })
        //     todos = <TodoList project = {project.title} todos={todosJSX} />
        // })
        let projects = this.props.projects;
        let todos;
        for(let i = 0; i< projects.length; i++) {
            let todosJSX = this.props.todos.filter((todo, j) => {
                if(todo.project === projects[i].id) {
                    return true;
                }
            })
            if(todosJSX.length > 0) {
            todos = <TodoList project = {projects[i].title} todos={todosJSX} />
            }
        }
        
        

        return (
                <div>{todos}</div>
                // <TodoList   filterByProjects={this.todosByProject}
                //             filterByStatus={this.filterByStatus}
                //             getTitleById={this.props.getTitleById}
                //             />
        )
    }
}

export default Filter;