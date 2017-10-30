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

    toggleDisplay = () => {
         this.setState({
            addNewFormDisplay: this.state.addNewFormDisplay === "block" ? "none" : "block",
            addNewButtonDisplay: this.state.addNewButtonDisplay === "block" ? "none" : "block"
         })     
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.toggleDisplay();
    
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
                        <h3>Add New Task</h3>
                    </div>
                </div> 	
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <form id="contactForm"  ref={(form) => { this.form = form }}
                                                onSubmit={(e) => { this.handleFormSubmit(e) }}>
                        <div className="form-group">
                            <label for="name">Title:</label>
                            <input type="text" name="title" required="required" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label for="description">Description:</label>
                            <input type="text" name="description" required="required" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label for="project">Project:</label>
                            <select name="project">{projectsJSX}</select>
                            <label for="status">Status:</label>
                            <select name="status">{statusJSX}</select>
                            <label for="labels">Labels:</label>
                            <select name="label">{labelsJSX}</select>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Add" />
                            <button type="button" onClick={this.toggleDisplay}>Cancel</button>
                        </div>
                        </form>
                    </div>
                </div>                        
            </section>
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="add-new-btn">
                            <button style={{ display: this.state.addNewButtonDisplay }} className="pull-right" onClick={this.toggleDisplay}>Add New</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
        )
    }
}

export default AddTodo;