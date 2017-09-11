import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BookSearch from './BookSearch.js'
import MyBooks from './myBooks.js'
import './App.css'

class BooksApp extends Component {
  render() {
    return (
		<div className="app">        
			<Route exact path="/" render={() => (
				<MyBooks />
			)} />
			<Route exact path="/search" render={() => (
				<BookSearch />
			)} />
		</div>
    )
  }
}

export default BooksApp