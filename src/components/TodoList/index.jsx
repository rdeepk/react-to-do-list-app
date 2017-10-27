import React, {Component} from 'react';
import Todo from '../Todo';

class TodoList extends Component {
    render() {
        let todosJSX = this.props.todos.map((todo, index)=>{
            let labelNames = todo.labels.map((item, i) => {
                return this.props.getTitleById('labels', Number(item)).title;
            })
            return <Todo   
                            key={index}
                            id={todo.id}
                            title={todo.title}
                            description = {todo.description}
                            status={this.props.getTitleById('status', Number(todo.status)).title}
                            project={this.props.getTitleById('projects', Number(todo.project)).title}
                            labels={labelNames.join(' ')}
                            getLabelsById={this.props.getLabelsById}
                    />
        })
        return (
            <div className="list-group">{todosJSX}</div>
        )
    }
}

export default TodoList;