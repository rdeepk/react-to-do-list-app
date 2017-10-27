import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const status = [
    {
        id: 100,
        title: 'Active'
    },
    {
        id: 101,
        title: 'Complete'
    },
    {
        id: 102,
        title: 'Not Started'
    }
];
//Math.max.apply(Math,array.map(function(o){return o.y;}))
const todos = [
    {
        id: 1001,
        title: 'learn angular',
        description:'Want to learn angular',
        status:102,
        project:201,
        labels:[5004,5001]
    },
    {
        id: 1002,
        title: 'write the content for the next module',
        description:'Needed completion',
        status:'101',
        project:201,
        labels:[5004, 5001, 5003]
    },
    {
        id: 1003,
        title: 'buy cheese',
        description:'For dinner on weekend',
        status:102,
        project:202,
        labels:[5002]
    },
    {
        id: 1003,
        title: 'buy milk',
        description:'Milk is important',
        status:102,
        project:202,
        labels:[5002]
    }
];

const projects = [
    {
        id: 201,
        title: 'Web Dev'
    },
    {
        id: 202,
        title: 'Personal'
    },
    {
        id: 203,
        title: 'Health'
    }

];

const labels = [
    {
        id: 5001,
        title:'front-end'
    },
    {
        id: 5002,
        title:'shopping'
    },
    {
        id: 5003,
        title:'urgent'
    },
    {
        id: 5004,
        title:'web-dev'
    },
    {
        id: 5005,
        title:'fitness'
    }

];
ReactDOM.render(<App    todos={todos}
                        status={status}
                        projects={projects}
                        labels={labels}
                />, document.getElementById('tasks'));
registerServiceWorker();
    