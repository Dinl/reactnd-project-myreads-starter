import React, { Component } from 'react'
import Highlighter from 'react-highlight-words'
import './App.css'

class Book extends Component {
    
    //Change the read status of the book
    changeReadStatus = (event) => {
        this.props.update(this.props.details.id, event.target.value);
    }

    render () {

        //Get the book object from properties 
        const { details, filter } = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    
                <div className="book-cover" 
                    style={{ backgroundImage: `url(${details.imageLinks.thumbnail})` }}>
                    {details.imageLinks.thumbnail === undefined && 
                        <div>No image found</div>
                    }
                </div>
                <div className="book-shelf-changer">
                    <select onChange={this.changeReadStatus} value={details.shelf}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">
                    <Highlighter
                        highlightClassName='YourHighlightClass'
                        searchWords={[ filter ]}
                        textToHighlight={details.title}
                    />
                </div>
                {details.authors && details.authors.map( (author, id) => (
                    <div key={id} className="book-authors">
                        <Highlighter
                            highlightClassName='YourHighlightClass'
                            searchWords={[ filter ]}
                            textToHighlight={author}
                        />
                    </div>
                ))}
                
            </div>
        )
    }
}

export default Book;