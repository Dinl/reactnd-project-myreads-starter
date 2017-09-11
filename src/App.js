import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import BookList from './BookList.js'
import BookSearch from './BookSearch.js'

class BooksApp extends Component {
  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>Awesome Books</h1>
          </div>
          <Route exact path="/" render={() => (
            <BookList />
          )} />
          <Route exact path="/search" render={() => (
            <BookSearch />
          )} />
        </div>
      </div>
    )
  }
}

export default BooksApp
