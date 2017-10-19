import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {DebounceInput} from 'react-debounce-input';
import Loader from 'react-loader'
import createHistory from 'history/createBrowserHistory'
import * as BooksAPI from './BooksAPI'
import BookGrid from './BookGrid.js'
import './App.css'

class BookSearch extends Component {

    state = {
		bookList: [],
        query: '',
        loaded: true
    }

    addBook = (id, shelf) => {
        this.setState({loaded: false});
        BooksAPI.update({id}, shelf).then((updates) => {
            this.setState(prevState => (
                {
                    bookList: prevState.bookList.filter(book => book.id !== id),
                    loaded: true
                }
            ));
        })
    }

    updateQuery= (query) => {
        //Then update the query with async function
        query = query.trim();
        this.setState({ query, loaded: false });

        if(query !== ""){
            BooksAPI.search(query, 20).then((bookList) => {
                this.setState({ 
                    bookList: bookList.error !== undefined ? bookList : bookList.map(book => {
                        book.shelf = "none";
                        return book;
                    }), 
                    loaded: true })
            })
        } else {
            this.setState({ bookList: [], loaded: true })
        }

        const history = createHistory();
        history.push('/search/?query='+query);
    }

    componentDidMount() {        
        const search = this.props.location.search.substring(1);
        let parameters = {};
        search.split("&").map((param) => {
            const [key, value] = param.split("=")
            parameters[key] = value;
            return value;
        });
        if(parameters.hasOwnProperty('query'))
            this.updateQuery(parameters['query']);
    }

    render () {

        //Get query, filter and bookList
		const { query, bookList, loaded } = this.state;

        return (
            <div className="search-books">
				<div className="list-books-title">
					<h1>Awesome Books</h1>
					<Link className="close-search" to="/">Close</Link>
				</div>


                <div className="search-books-input-wrapper">
                    <DebounceInput type="text" 
                            minLength={1}
                            debounceTimeout={500}
                            value={query}
                            placeholder="Find by title or author"
                            onChange={(event) => this.updateQuery(event.target.value)} />
                </div>
                <Loader loaded={loaded}>
                    <BookGrid filter={query} bookList={bookList} updateBook={this.addBook} />
                    { bookList && !Array.isArray(bookList) && <div className="bookshelf-books">No results</div> }                    
                </Loader>
            </div>
        )
    }
}

export default BookSearch;