import React, { Component } from 'react'
import './App.css'

class Book extends Component {
    
    render () {

        //Get the book object from properties
        const { details } = this.props;

        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" 
                    style={{ width: 128, height: 193, 
                            backgroundImage: `url(${details.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{details.title}</div>
                {details.authors.map( (author, id) => (
                    <div key={id} className="book-authors">{author}</div>
                ))}
                
            </div>
        )
    }
}

export default Book;