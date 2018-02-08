import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Posts from './components/posts'

ReactDOM.render(<Posts />, document.getElementById('root'));
registerServiceWorker();
