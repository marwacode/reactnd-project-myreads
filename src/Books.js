import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import './App.css'

class Books extends Component {

  constructor(props) {
    super(props)

    this.state = {
      query: '',

    }
  }


  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.props.onSearch(this.state.query)

  }

  clearQuery = () => {
    this.setState({ query: '' })
  }



  onChangeBookShelf = (book) => (event) => {

    const shelfValue = event.target.value;
    this.props.onChange(book, shelfValue)

  }


  render() {
    const { books } = this.props
    const { query } = this.state

    const list = this.props.bookResults.map((book) => {
      books.map((b) => {
        if (book.id === b.id) {
          book.shelf = b.shelf
        }
        return book.shelf
      })
      if (!book.shelf) {
        book.shelf = 'none'
      }

      return (<li key={book.id} >

        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (book.imageLinks) ? `url(${book.imageLinks.smallThumbnail})` : `url(http://via.placeholder.com)` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf}
                onChange={this.onChangeBookShelf(book)}>
                <option value="move" disabled>Move to...</option>

                <option
                  className={book.shelf === "currentlyReading" ? "book-shelf-changer select" : ""}
                  value="currentlyReading">Currently Reading</option>

                <option
                  className={book.shelf === "wantToRead" ? "book-shelf-changer select" : ""}
                  value="wantToRead">Want to Read</option>

                <option
                  className={book.shelf === "read" ? "book-shelf-changer select" : ""}
                  value="read">Read</option>

                <option
                  className={!book.shelf || book.shelf === 'none' ? "book-shelf-changer select" : ""}
                  value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>

      </li>
      )
    })

    if (books.length <= 0) {
      return <div className="search-books-bar">
        <Link to='/' className="close-search" >Close</Link>
        <div className="search-books-input-wrapper">

          <input type="text" placeholder="Search by title or author"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}

          />
          <h3>No Results</h3>
        </div>
      </div>
    }

    else if (!query) {
      return <div className="search-books-bar">
        <Link to='/' className="close-search" >Close</Link>
        <div className="search-books-input-wrapper">

          <input type="text" placeholder="Search by title or author"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}

          />
          <h3>No Results</h3>

        </div>

      </div>
    }


    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search" >Close</Link>
          <div className="search-books-input-wrapper">

            <input type="text" placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {list}
          </ol>
        </div>
      </div>
    )
  }
}

export default Books

