import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BookSearch from './BookSearch.js'
import MyBooks from './myBooks.js'
import history from './history';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {

	//State of App
	state = {
		bookList: [],
		loaded: false
	}

	addBook = (book, shelf) => {
		book.shelf = shelf;
		const matchBook = this.state.bookList.find((userBook) => userBook.id === book.id);
		if(matchBook){
			this.updateBook(book.id, shelf);
		} 
		else {
			this.setState({
				bookList: this.state.bookList.concat(book)
			});
		}
	}

	updateBook= (id, shelf) => {
		this.setState({loaded: false});
		BooksAPI.update({id}, shelf).then((updates) => {
			this.setState(prevState => ({
				bookList: prevState.bookList.map(book => {
					if(book.id === id){
						book.shelf = shelf
					}
					return book;
				}),
				loaded: true
			}));
		})
	}

	componentDidMount() {
		//Update the history
		history.listen(() => this.forceUpdate());
		//Update the state
		this.setState({loaded: false});
		BooksAPI.getAll().then((bookList) => {
			this.setState({bookList, loaded: true});
		})
	}

	render() {
		//Load via constants
		const { bookList, loaded } = this.state;
    return (
		<div className="app">
			<Route exact path="/" render={() => <MyBooks bookList={bookList} loaded={loaded} updateBook={this.updateBook} />} />
			<Route exact path="/search" render={() => <BookSearch bookList={bookList} addBook={this.addBook} />}  />
		</div>
    )
  }
}

export default BooksApp