import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'
import './App.css'

class BookList extends Component {

    state = {
        bookList: [],
        query: ''
    }

    updateQuery= (query) => {
        this.setState({ query: query.trim() });
    }

    clearQuery = () => {
        this.setState({ query: '' });
    }

    componentDidMount() {
        BooksAPI.getAll().then((bookList) => {
            console.log(bookList);
            this.setState({bookList})
        })
    }

    render () {

        const { query, bookList } = this.state;

        return (
            <div className="list-books-content">
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author"/>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        <li>
                            {bookList.map( (book) => (
                                <Book key={book.id} details = {book} />
                            ))}
                        </li>
                    </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookList;