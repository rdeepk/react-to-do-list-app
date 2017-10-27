import React, { Component } from 'react';
import './AddTodo.css';

class AddTodo extends Component {
    constructor() {
        super();
        this.state = {
            addNewFormDisplay: "none",
            addNewButtonDisplay: "block"
        }
    }
    handleAddNew = () => {
        this.setState({
            addNewFormDisplay: "block",
            addNewButtonDisplay: "none"
        })
    }

    handleCancel = () => {
        this.setState({
            addNewFormDisplay: "none",
            addNewButtonDisplay: "block"
        })
    }

    handleFormSubmit(e) {
        e.preventDefault();
        console.log(this.form)
    
        this.props.addNewTask(this.form)
    }

    render() {
        let projectsJSX = this.props.projects.map((project, i) =>{
                return <option value={project.id}>{project.title}</option>
        })

        let statusJSX = this.props.status.map((item, i) =>{
            return <option value={item.id}>{item.title}</option>
        })

        let labelsJSX = this.props.labels.map((label, i) =>{
            return <option value={label.id}>{label.title}</option>
        })

        return (
            <div className="add-new-task">
                <section style={{ display: this.state.addNewFormDisplay }}>
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Add New Task</h2>
                    </div>
                </div> 	
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <form id="contactForm"  ref={(form) => { this.form = form }}
                                                onSubmit={(e) => { this.handleFormSubmit(e) }}>
                        <div className="form-group">
                            <label for="name">Task title: <span className="required">*</span></label>
                            <input type="text" name="title" required="required" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label for="description">Task description: <span className="required">*</span></label>
                            <input type="text" name="description" required="required" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label for="project">Project: <span className="required">*</span></label>
                            <select name="project">{projectsJSX}</select>
                        </div>                           
                        <div className="form-group">
                            <label for="status">Status: <span className="required">*</span></label>
                            <select name="status">{statusJSX}</select>
                        </div>
                        <div className="form-group">
                            <label for="labels">Labels:</label>
                            <select name="label">{labelsJSX}</select>
                        </div>
                        <input type="submit" value="ADD" />
                        <button type="button" onClick={this.handleCancel}>Cancel</button>
                        </form>
                    </div>
                </div>                        
            </section>
            <div>
                <div className="row">
                    <div className="col-sm-12">
                    <button style={{ display: this.state.addNewButtonDisplay }} className="btn btn-default" onClick={this.handleAddNew}>Add New Task</button>
                    </div>
                </div>
            </div>
        </div>
            
        )
    }
}

export default AddTodo;