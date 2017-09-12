import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookGrid from './BookGrid.js'
import './App.css'

class BookSearch extends Component {

    state = {
		bookList: [],
		query: '',
    }

    addBook = (id, shelf) => {
        BooksAPI.update({id}, shelf).then((updates) => {
            const index = this.state.bookList.findIndex(book => book.id === id);
            let bookList = this.state.bookList;
            bookList.splice(index, 1);
            this.setState({bookList});
        })
    }

    updateQuery= (query) => {
        query = query.trim();
        this.setState({ query });
        if(query !== ""){
            BooksAPI.search(query, 20).then((bookList) => {
                this.setState({ bookList })
            })
        } else {
            this.setState({ bookList: [] })
        }
    }

    render () {

        //Get query, filter and bookList
		const { query, bookList } = this.state;

        return (
            <div className="search-books">
				<div className="list-books-title">
					<h1>Awesome Books</h1>
					<Link className="close-search" to="/">Close</Link>
				</div>


                <div className="search-books-input-wrapper">
                    <input type="text" 
                            placeholder="Find by title or author"
                            onChange={(event) => this.updateQuery(event.target.value)} />
                </div>

                <BookGrid filter={query} bookList={bookList} updateBook={this.addBook} />
            </div>            
        )
    }
}

export default BookSearch;