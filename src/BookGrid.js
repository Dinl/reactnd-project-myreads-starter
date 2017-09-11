import React, { Component } from 'react'
import Book from './Book.js'
import './App.css'

class BookGrid extends Component {

    render () {
		//Get query, filter and bookList
		const { filter, bookList, updateBook } = this.props;

        return (

			<div className="bookshelf">
				<div className="bookshelf-books">
					<ol className="books-grid">
						{bookList.map( (book) => (
							<li key={`${book.id}_li`}>
								<Book key={book.id} 
									details={book} 
									filter={filter}
									update={updateBook}  />
							</li>
						))}
					</ol>
				</div>
			</div>


        )
    }
}

export default BookGrid;