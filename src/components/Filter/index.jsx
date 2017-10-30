import React, {Component} from 'react';
import TodoList from '../TodoList';
import ProjectList from '../ProjectList';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: "all",
            filteredTodos: this.props.todos,
            todosFilter: "default",
            todoListIsHidden: false,
            projectListIsHidden: true
        }
    }


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
        return status;
    }

    filterTodos = () => {
        let filteredTodos;
        if(this.state.selectValue === "all") {
            filteredTodos = this.props.todos;
        } else {
            filteredTodos = this.props.todos.filter((todo, item) =>{
                if(Number(todo.status) === Number(this.state.selectValue)) {
                    return true;
                }
            })
        }
        console.log(filteredTodos);
        this.setState({
            filteredTodos: filteredTodos
        })
    }
    
    handleFilterByStatus = (e) => {
        this.setState({
            selectValue: e.target.value
        }, () => this.filterTodos())
    }

    handleClearComplete = (projectId) => {
        let completeTodos = [];
        this.props.todos.forEach((todo, i) => {
            if(Number(todo.status) === 101) {
                completeTodos.push(todo.id);
            }
        })
        this.props.removeTodos(completeTodos);
    }

    handleTodosFilter = (e) => {
        this.setState({
            todosFilter: e.target.value
        }, () => this.toggleDisplay());
    }

    toggleDisplay = () => {
        this.setState({
            projectListIsHidden: this.state.projectListIsHidden ? false : true,
            todoListIsHidden: this.state.todoListIsHidden ? false : true
         }) 
    }

    render() {
        let selectJSX = this.props.status.map((state, i) => {
            return <option value={state.id}>{state.title}</option>
        })

        return (

                <div>
                    <div className="row">
                        <div className="col-sm-8">
                            <select className="todos-by-status" value={this.state.selectValue} onChange={this.handleFilterByStatus}>
                                <option value="all">All</option>
                                {selectJSX}
                            </select>
                            <select className="todos-filter" value={this.state.todosFilter} onChange={this.handleTodosFilter}>
                                <option value="default">Default</option>
                                <option value="filterByProject">Filter by project</option>
                            </select>
                            
                        </div>
                        <div className="col-sm-4">
                            <button className="pull-right btn btn-default" onClick={()=>{this.handleClearComplete(this.props.id)}}>Clear Complete</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                        {!this.state.todoListIsHidden && 
                        <TodoList style={{ display: this.state.displayDefaultTodos }}   projects={this.props.projects}
                                        todos={this.state.filteredTodos}
                                        getTitleById = {this.props.getTitleById}
                                        removeTodos={this.props.removeTodos}
                                        status={this.props.status}
                                        updateTask={this.props.updateTask}
                                        />}
                        {!this.state.projectListIsHidden &&
                        <ProjectList style={{ display: this.state.displayTodosByProject }}  projects={this.props.projects}
                            todos={this.state.filteredTodos}
                            getTitleById = {this.props.getTitleById}
                            status={this.props.status}
                            labels={this.props.labels}
                            updateTask={this.props.updateTask}
                            removeTodos={this.props.removeTodos}
                        />}
                        </div>
                    </div>
                </div>
        )
    }
}

export default Filter;