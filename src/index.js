import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';

import App from './App';
import 'antd/dist/antd.css';

ReactDOM.render(
    <Router>    
        <Provider store={configureStore()}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('root')
 );