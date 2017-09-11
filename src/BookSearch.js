import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'
import './App.css'

class BookSearch extends Component {

    state = {
		bookList: [],
		query: '',
    }

    updateQuery= (query) => {
        query = query.trim();
        this.setState({ query });
        if(query !== ""){
            BooksAPI.search(query, 20).then((bookList) => {
                this.setState({bookList})
            })
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
                <div className="bookshelf">
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {Array.isArray(bookList) && bookList.map( (book) => (
                                <li key={`${book.id}_li`}>
                                    <Book key={book.id} 
                                            details={book} 
                                            filter={query}
                                            update={this.updateBook}  />
                                </li>
                            ))}
                        </ol>
						{!Array.isArray(bookList) && 
							<div><span>No results</span></div>
						}
                    </div>
                </div>
            </div>            
        )
    }
}

export default BookSearch;