import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {DebounceInput} from 'react-debounce-input';
import Loader from 'react-loader'
import createHistory from 'history/createBrowserHistory'
import { addUrlProps, replaceInUrlQuery } from 'react-url-query';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'
import BookGrid from './BookGrid.js'
import './App.css'

function mapUrlToProps(url, props) {
    return {
        query: url.query,
    };
}

function mapUrlChangeHandlersToProps(props) {
    return {
        onChangeQuery: (value) => replaceInUrlQuery('query', value),
    }
}

class BookSearch extends Component {
    
    state = {
		bookList: [],
        query: '',
        loaded: true
    }

    static propTypes = {
        query: PropTypes.string
    }

    static defaultProps = {
        query: ""
    }

    addBook = (id, shelf) => {
        this.setState({loaded: false});
        this.props.addBook(this.state.find((book) => book.id === id));
        
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
                const userBookList = this.props.bookList;
                this.setState({ 
                    bookList: bookList.error !== undefined ? bookList : bookList.map(book => {
                        const index = userBookList.findIndex((userBook) => userBook.id === book.id);
                        book.shelf = index >= 0 ? userBookList[index].shelf : "none";

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
        const search = this.props.query;
        if(search && search !== "")
            this.updateQuery(this.props.query);
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

export default addUrlProps({ mapUrlToProps, mapUrlChangeHandlersToProps })(BookSearch);;