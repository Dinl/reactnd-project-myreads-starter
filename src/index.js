import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './index.css'
import './../node_modules/react-tabs/style/react-tabs.css'

ReactDOM.render(
    <BrowserRouter><App /></BrowserRouter>,  
    document.getElementById('root')
)
