import React, {Component} from 'react';
import TodoByProject from '../TodoByProject';

class TodoListByProject extends Component {
    render(){
        let TodoByProjectJSX = this.props.todos.map((todo, i) => {
            return <TodoByProject   todo={todo}
                                    getTitleById = {this.props.getTitleById}
                                    status={this.props.status}
                                    labels={this.props.labels}
                                    updateTask={this.props.updateTask}
                                    project={this.props.project}
                                    />
        })
        return (
            <div>{TodoByProjectJSX}</div>
        )
    }
}

export default TodoListByProject;