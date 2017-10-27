import React, {Component} from 'react';
import './Todo.css';

class Todo extends Component {
    render() {
        return (
            <div className="list-group-item">
                <input type="checkbox" value="on" />
                <span className="Project">{this.props.getProjectById(this.props.project).title}</span>
                <div>
                    <label className="title">{this.props.title}</label>
                    <span className="description">{this.props.description}</span>
                    <span className="labels">{this.props.labels}</span>
                    <span className="status">{this.props.status}</span>
                </div>
            </div>              
        )
    }
}

export default Todo;



              
         