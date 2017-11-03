import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TodoFilter from '../TodoFilter';
import AddTodo from '../AddTodo';
import AddProject from '../AddProject';
import AddLabel from '../AddLabel';

class Header extends React.Component {
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

    render() {
        // css for disable and enable clear complete button
        let clearBtnCss = {};

        if (!this.props.competeTasksCounter) {
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


        //assign status options for filter.
        let selectJSX = this.props.status.map((state, i) => {
            return <option value={state.id} key={i}>{state.title}</option>
        })
        return (
            <div>
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <Link to="/">Todos</Link>
                        <Link to="/addnew">Add New Todo</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/labels">Labels</Link>
                        {/* <!-- /.navbar-collapse --> */}
                    </div>
                    {/* <!-- /.container-fluid --> */}
                </nav>
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <select className="todos-filter" value={this.state.todosFilter} onChange={this.handleTodosFilter}>
                            <option value="default">Default</option>
                            <option value="filterByProject">Filter by project</option>
                        </select>
                        <select className="todos-by-status" value={this.state.selectValue} onChange={this.handleFilterByStatus}>
                            <option value="all">All</option>
                            {selectJSX}
                        </select>
                        <button style={clearBtnCss} onClick={() => { this.handleClearComplete(this.props.id) }}>Clear Complete</button>
                        {/* <!-- /.navbar-collapse --> */}
                    </div>
                    {/* <!-- /.container-fluid --> */}
                </nav>
                <Route path="/addnew" exact render={(props) => (<AddTodo    projects={this.props.projects}
                                                                            status={this.props.status}
                                                                            labels={this.props.labels}
                                                                            addNewTask={this.props.addNewTask}
                                                                    />
                )} />
                <Route path="/" exact render={(props) => (<TodoFilter   getTitleById={this.props.getTitleById}
                                                                        removeTodos={this.props.removeTodos}
                                                                        status={this.props.status}
                                                                        updateTask={this.props.updateTask}
                                                                        todos={this.state.filteredTodos}
                                                                        projects={this.props.projects}
                                                                        labels={this.props.labels}
                                                                        competeTasksCounter={this.props.competeTasksCounter}
                                                                        todoListIsHidden={this.state.todoListIsHidden}
                                                                        projectListIsHidden={this.state.projectListIsHidden}
                                                                        deleteById={this.props.deleteById}
                                                                    />
                )} />
                <Route path="/projects" exact render={(props) => (<AddProject    projects={this.props.projects}
                                                                            status={this.props.status}
                                                                            labels={this.props.labels}
                                                                            addNewProject={this.props.addNewProject}
                                                                    />
                )} />
                <Route path="/labels" exact render={(props) => (<AddLabel    projects={this.props.projects}
                                                                            status={this.props.status}
                                                                            labels={this.props.labels}
                                                                            addNewLabel={this.props.addNewLabel}
                                                                    />
                )} />
            </div>
        )
    }
}

export default Header;