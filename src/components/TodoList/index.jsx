import React, {Component} from 'react';
import Todo from '../Todo';

class TodoList extends Component {
    render() {
        let todosJSX = this.props.todos.map((todo, index)=>{
            return <Todo   
                            key={index}
                            id={todo.id}
                            title={todo.title}
                            description = {todo.description}
                            status={todo.status}
                            project={todo.project}
                            labels={todo.labels}
                            getProjectById={this.props.getProjectById}
                    />
        })
        return (
            <div className="list-group">{todosJSX}</div>
        )
    }
}

export default TodoList;