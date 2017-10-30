import React, { Component } from 'react';

class TodoByProject extends Component {
    constructor() {
        super();
        this.state = {
            showTodoDisplay: "block",
            editTodoDisplay: "none"
        }
    }

    toggleDisplay = () => {
        this.setState({
            showTodoDisplay: this.state.showTodoDisplay === "block" ? "none" : "block",
            editTodoDisplay: this.state.editTodoDisplay === "block" ? "none" : "block"
        })
    }
 handleFormSubmit(e) {
        this.props.updateTask(this.form, this.props.todo.id)
    }
   

    render() {
        let editLabelsJSX = this.props.todo.labels.map((label, i) => {
            return <div className="edit-labels">   
                        <label htmlFor="labels">
                            <input type="checkbox" name="labels" id={label.id} checked={label.ischecked}/>
                            {this.props.getTitleById('labels', Number(label.id)).title}
                        </label>
                    </div>
        })

        let existingTodoStatus;
        let statusJSX = this.props.status.map((item, i) => {
            if(!existingTodoStatus) {
                existingTodoStatus = (item.id === Number(this.props.todo.status)) ? item.id : '';
            }
                return <option value={item.id}>{item.title}</option>
        })
        

        let validLabels = this.props.todo.labels.filter((label, i)  => {
            return label.ischecked 
        })

        let labelsJSX = validLabels.map((label, i) => {
            return <div className="todo-label">
                        <label htmlFor="labels">
                            <input type="checkbox" name="labels" value={label.id} checked="checked" />
                            {this.props.getTitleById('labels', Number(label.id)).title}
                        </label>
                    </div>
        })

        let status = this.props.getTitleById('status', Number(this.props.todo.status)).title;
        let statusClass = status.toLowerCase().split(' ').join('-');



        let getIcon = () => {
            let icon;
            switch(statusClass) {
                case 'active':
                    icon = <i className="fa fa-ellipsis-h" aria-hidden="true" title="Active"></i>
                    break;
                case 'complete':
                    icon = <i className="fa fa-check" aria-hidden="true" title="Completed"></i>
                    break;
                case 'not-started':
                    icon = <i className="fa fa-book" aria-hidden="true" title="Not Started"></i>
                    break;
            }
            return icon;
        }


        return (
            <div className={"item " + statusClass}>
                <div style={{ display: this.state.showTodoDisplay }}>
                    <div className="row">
                        <div className="col-xs-3 col-md-2 check">
                            <div>{getIcon()}</div>
                            <div><button className="edit-link" onClick={this.toggleDisplay}><i className="fa fa-pencil-square-o" aria-hidden="true" title="Edit"></i></button></div>
                        </div>
                        <div className="col-xs-9 col-md-10 display">
                            <div className="title"><strong>Task:</strong> {this.props.todo.title}</div>
                            <div className="description"><strong>Description:</strong> {this.props.todo.description}</div>
                            <div className="labels"><strong>Labels:</strong> {labelsJSX}</div>
                            <div className="status"><strong>Status:</strong> {status}</div>
                        </div>
                    </div>
                </div>
                 <div style={{ display: this.state.editTodoDisplay }} className="edit">
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <form id="editTodoForm" ref={(form) => { this.form = form }}
                                onChange={(e) => { this.handleFormSubmit(e) }}>
                                <div className="form-group">
                                    <label htmlFor="title">Title: <span className="required">*</span></label>
                                    <input type="text" value={this.props.todo.title} name="title" required="required" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label  htmlFor="description">Description: <span className="required">*</span></label>
                                    <input type="text" name="description" value={this.props.todo.description} required="required" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status: <span className="required">*</span></label>
                                    <select name="status" value={existingTodoStatus}>{statusJSX}</select>
                                </div>
                                <div className="form-group hidden">
                                    <label htmlFor="project">Project: <span className="required">*</span></label>
                                    <select name="project" value ={this.props.project}></select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="labels">Labels: {editLabelsJSX}</label>
                                </div>
                                <button type="button" onClick={this.toggleDisplay}>Close</button>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default TodoByProject;