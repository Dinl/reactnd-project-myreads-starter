import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'
import './App.css'

class BookList extends Component {

    state = {
        bookList: [],
		query: '',
		filter: ''
    }

    updateQuery= (query) => {
        this.setState({ query: query.trim() });
	}
	
	updateFilter= (filter) => {
        this.setState({ filter: filter.trim() });
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
		const Books_Reading = bookList.filter((book) => (book.shelf === 'currentlyReading'));
		const Books_Readed = bookList.filter((book) => (book.shelf === 'read'));
		const Books_ToRead = bookList.filter((book) => (book.shelf === 'wantToRead'));

        return (
            <div className="list-books-content">
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Filter by title or author"/>
                </div>

				<Tabs>
					<TabList>
					<Tab>Currently Reading</Tab>
					<Tab>Want to Read</Tab>
					<Tab>Read</Tab>
					</TabList>
						
					<TabPanel>
						<div className="bookshelf">
							<div className="bookshelf-books">
								<ol className="books-grid">
									{Books_Reading.map( (book) => (
										<li key={`${book.id}_li`}>
											<Book key={book.id} details={book} />
										</li>
									))}
								</ol>
							</div>
						</div>
					</TabPanel>
					<TabPanel>
						<div className="bookshelf">
							<div className="bookshelf-books">
								<ol className="books-grid">
									{Books_Readed.map( (book) => (
										<li key={`${book.id}_li`}>
											<Book key={book.id} details={book} />
										</li>
									))}
								</ol>
							</div>
						</div>
					</TabPanel>
					<TabPanel>
						<div className="bookshelf">
							<div className="bookshelf-books">
								<ol className="books-grid">
									{Books_ToRead.map( (book) => (
										<li key={`${book.id}_li`}>
											<Book key={book.id} details={book} />
										</li>
									))}
								</ol>
							</div>
						</div>
					</TabPanel>
				</Tabs>
            </div>
        )
    }
}

export default BookList;