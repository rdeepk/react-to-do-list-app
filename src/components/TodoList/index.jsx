import React, {Component} from 'react';
import Todo from '../Todo';

/**
* Provides the List of todos for default display.
*/
class TodoList extends Component {
    render() {
        console.log(this.props.todos);

        let todosJSX = this.props.todos.map((todo, index)=>{
            return <Todo    key={index}
                            todo={todo}
                            getTitleById={this.props.getTitleById}
                            status={this.props.status}
                            updateTask={this.props.updateTask}
                            competeTasksCounter={this.props.competeTasksCounter}
                            deleteById={this.props.deleteById}
                            />
        })
        return (
            <div className="todos-default">{todosJSX}</div>
        )
    }
}

export default TodoList;