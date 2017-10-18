import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loader'
import createHistory from 'history/createBrowserHistory'
import * as BooksAPI from './BooksAPI'
import BookGrid from './BookGrid.js'
import './App.css'

class BookSearch extends Component {

    state = {
		bookList: [],
        query: '',
        loaded: true,
        typingTimeOut : 0
    }

    addBook = (id, shelf) => {
        this.setState({loaded: false});
        BooksAPI.update({id}, shelf).then((updates) => {
            const index = this.state.bookList.findIndex(book => book.id === id);
            let bookList = this.state.bookList;
            bookList.splice(index, 1);
            this.setState({bookList, loaded: true});
        })
    }

    updateQuery= (query) => {
        //Check the timeout
        if(this.state.typingTimeOut){
            clearTimeout(this.state.typingTimeOut);
        }
        //Then update the query with async function
        query = query.trim();
        this.setState({ 
            query, 
            loaded: false,
            typingTimeOut: setTimeout(() => {
                if(query !== ""){
                    BooksAPI.search(query, 20).then((bookList) => {
                        this.setState({ bookList, loaded: true })
                    })
                } else {
                    this.setState({ bookList: [], loaded: true })
                }
            }, 500)
         });
        

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
                    <input type="text" 
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