import React, { Component } from 'react';
import TodoList from '../TodoList';
import ProjectList from '../ProjectList';

/**
* Filters data as required by child components.
*/
class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: "all",
            filteredTodos: this.props.todos,
            todosFilter: "default",
            todoListIsHidden: false,
            projectListIsHidden: true,
            displayClearForDefaultTodos: "inline-block"
        }
    }

    /**
    * Called by handleFilterByStatus to get the todos filtered by status. The current status value is taken from selectValue state
    */
    filterTodos = () => {
        let filteredTodos;
        if (this.state.selectValue === "all") {
            filteredTodos = this.props.todos;
        } else {
            filteredTodos = this.props.todos.filter((todo, item) => {
                if (Number(todo.status) === Number(this.state.selectValue)) {
                    return true;
                }
            })
        }
        console.log(filteredTodos);
        this.setState({
            filteredTodos: filteredTodos
        })
    }

    /**
    * Handler for Filter todos by status on change event of select.
    */
    handleFilterByStatus = (e) => {
        this.setState({
            selectValue: e.target.value
        }, () => this.filterTodos())
    }

    /**
    * Handler clear complete button on click event.
    */
    handleClearComplete = (projectId) => {
        let completeTodos = [];
        this.props.todos.forEach((todo, i) => {
            if (Number(todo.status) === 101) {
                completeTodos.push(todo.id);
            }
        })
        this.props.removeTodos(completeTodos);
    }

    /**
    * Handler for todos filter for default display format and display by project.
    */
    handleTodosFilter = (e) => {
        this.setState({
            todosFilter: e.target.value
        }, () => this.toggleDisplay());
    }

    /**
    * sets state to hide or show components as per user input.
    */
    toggleDisplay = () => {
        this.setState({
            projectListIsHidden: this.state.projectListIsHidden ? false : true,
            todoListIsHidden: this.state.todoListIsHidden ? false : true,
            displayClearForDefaultTodos: this.state.displayClearForDefaultTodos === "none" ? "inline-block" : "none"
        })
    }

    render() {
        //assign status options for filter.
        let selectJSX = this.props.status.map((state, i) => {
            return <option value={state.id} key={i}>{state.title}</option>
        })

        // css for disable and enable clear complete button
        let clearBtnCss = {};

        if(!this.props.competeTasksCounter) {
            clearBtnCss = {
                "backgroundColor": "#ccc",
                "pointerEvents": "none",
                "color": "#000",
                display: this.state.displayClearForDefaultTodos
            }
        } else {
            clearBtnCss = {
                "backgroundColor": "#111",
                "pointerEvents": "auto",
                "color": "#fff",
                display: this.state.displayClearForDefaultTodos
            }
        }

        return (

            <div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="filters">
                            <button style={clearBtnCss} onClick={() => { this.handleClearComplete(this.props.id) }}>Clear Complete</button>
                            <select className="todos-by-status" value={this.state.selectValue} onChange={this.handleFilterByStatus}>
                                <option value="all">All</option>
                                {selectJSX}
                            </select>
                            <select className="todos-filter" value={this.state.todosFilter} onChange={this.handleTodosFilter}>
                                <option value="default">Default</option>
                                <option value="filterByProject">Filter by project</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        {!this.state.todoListIsHidden &&
                            <TodoList projects={this.props.projects}
                                todos={this.state.filteredTodos}
                                getTitleById={this.props.getTitleById}
                                removeTodos={this.props.removeTodos}
                                status={this.props.status}
                                updateTask={this.props.updateTask}
                            />}
                        {!this.state.projectListIsHidden &&
                            <ProjectList projects={this.props.projects}
                                todos={this.state.filteredTodos}
                                getTitleById={this.props.getTitleById}
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