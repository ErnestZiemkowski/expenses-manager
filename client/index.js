import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
    <HashRouter>
        <Routes />    
    </HashRouter>,
    document.getElementById('root')
);

module.hot.accept();
