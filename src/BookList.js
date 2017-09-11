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
	
	updateBook= (id, shelf) => {
		const index = this.state.bookList.findIndex(book => book.id === id);
		let bookList = this.state.bookList;
		bookList[index].shelf = shelf;
		this.setState({bookList});
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
		//Get query, filter and bookList
		const { filter, bookList } = this.state;

		//Filter the original list
		const filterBookList = bookList.filter((book) => {
			return (book.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1) ||
				(book.authors.join().toLowerCase().indexOf(filter.toLowerCase()) !== -1);
		});

		const Books_Reading = filterBookList.filter((book) => (book.shelf === 'currentlyReading'));
		const Books_Readed = filterBookList.filter((book) => (book.shelf === 'read'));
		const Books_ToRead = filterBookList.filter((book) => (book.shelf === 'wantToRead'));

        return (
            <div className="list-books-content">
                <div className="search-books-input-wrapper">
                    <input type="text" 
						   placeholder="Filter by title or author"
						   onChange={(event) => this.updateFilter(event.target.value)} />
					<span>Or...</span>
					<div className="search-books-button">
						<Link to="/search">Search</Link>
					</div>
                </div>

				<Tabs>
					<TabList>
					<Tab>Currently Reading ({Books_Reading.length})</Tab>
					<Tab>Read ({Books_Readed.length})</Tab>
					<Tab>Want to Read ({Books_ToRead.length})</Tab>
					</TabList>
						
					<TabPanel>
						<div className="bookshelf">
							<div className="bookshelf-books">
								<ol className="books-grid">
									{Books_Reading.map( (book) => (
										<li key={`${book.id}_li`}>
											<Book key={book.id} 
												  details={book} 
												  filter={filter}
												  update={this.updateBook}  />
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
											<Book key={book.id} 
												  details={book} 
												  filter={filter}
												  update={this.updateBook} />
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
											<Book key={book.id} 
												  details={book} 
												  filter={filter}
												  update={this.updateBook} />
										</li>
									))}
								</ol>
							</div>
						</div>
					</TabPanel>
				</Tabs>
				
				
				<div className="open-search">
					<Link to="/search">Add a book</Link>
				</div>
            </div>
        )
    }
}

export default BookList;