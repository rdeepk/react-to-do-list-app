import React, {Component} from 'react';
import Todo from '../Todo';

class TodoList extends Component {
    render() {

        let todosJSX = this.props.todos.map((todo, index)=>{
            return <Todo    todo={todo}
                            getTitleById={this.props.getTitleById}
                            status={this.props.status}
                            updateTask={this.props.updateTask}
                            />
        })
        return (
            <div className="list-group">{todosJSX}</div>
        )
    }
}

export default TodoList;