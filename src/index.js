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
]

const tasks = {

}

const projects = [

]

const lables = [

]
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
    