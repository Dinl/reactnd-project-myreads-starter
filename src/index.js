import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import history from './history'
import { configureUrlQuery } from 'react-url-query';
import './index.css'
import '../node_modules/react-tabs/style/react-tabs.css'

configureUrlQuery({ history });

ReactDOM.render(
    <BrowserRouter><App /></BrowserRouter>,  
    document.getElementById('root')
)
