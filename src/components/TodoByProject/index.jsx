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
            return <div><input type="checkbox" name="labels" id={label.id} checked={label.ischecked}/>
            <label htmlFor="labels">{this.props.getTitleById('labels', Number(label.id)).title}</label></div>
        })

        let existingTodoStatus;
        let statusJSX = this.props.status.map((item, i) => {
            if(!existingTodoStatus) {
                existingTodoStatus = (item.id === Number(this.props.todo.status)) ? item.id : '';
            }
                return <option value={item.id} >{item.title}</option>
        })
        

        let validLabels = this.props.todo.labels.filter((label, i)  => {
            return label.ischecked 
        })

        let labelsJSX = validLabels.map((label, i) => {
            return <div><input type="checkbox" name="labels" value={label.id} checked="checked" />
                   <label htmlFor="labels">{this.props.getTitleById('labels', Number(label.id)).title}</label></div>
        })

        return (
           
            <div>
                <div style={{ display: this.state.showTodoDisplay }} className="todo list-group-item">
                    <div className="row">
                        <div className="col-sm-2"><input type="checkbox" value="on" /></div>
                        <div className="col-sm-8">Title: {this.props.todo.title}</div>
                        <div className="col-sm-2"><button onClick={this.toggleDisplay}>Edit</button></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2"><div className="description">Description: {this.props.todo.description}</div></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2"><div className="labels">Labels: {labelsJSX}</div></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2">
                            <div className="status">Status: {this.props.getTitleById('status', Number(this.props.todo.status)).title}</div>
                        </div>
                    </div>
                </div>
                 <div style={{ display: this.state.editTodoDisplay }} className="todo-edit list-group-item">
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