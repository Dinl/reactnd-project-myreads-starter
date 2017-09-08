import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList.js'
import BookDetail from './BookDetail.js'

class BooksApp extends React.Component {
  state = {
    query: '',
    showDetailPage: false
  }

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
          <Route exact path="/detail" render={() => (
            <BookDetail />
          )} />
        </div>
      </div>
    )
  }
}

export default BooksApp
