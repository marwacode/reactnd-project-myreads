import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import './App.css'

class Books extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,

  }

  constructor(props) {
    super(props)

    this.state = {
      query: '',
      item: '',
      currentValue: '',
      bookItem: '',

    }

    this.updateQuery = this.updateQuery.bind(this)
    this.clearQuery = this.clearQuery.bind(this)
  }


  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.handleSearch()

  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  handleSearch = () => {
    if (this.props.onSearch) this.props.onSearch(this.state.query)
  }

  handleSelect = () => {
    if (this.props.onShelf) this.props.onShelf(this.state.currentValue, this.state.bookItem)
  }

  handleClick = (e) => {
    this.setState({
      item: e.target.value,

    });

    this.handleSelect()
  }


  render() {
    const { books } = this.props
    const { query } = this.state

    console.log("item", this.state.bookItem)
    //console.log("value", this.state.currentValue)

    let showingBooks = []
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      if (books) {
        showingBooks = books.filter((book) => match.test(book.title || book.authors))
      }

    } else {
      showingBooks = []
    }

    if (!books) {
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
            {showingBooks.map((book) => {

              return <li key={book.id} >

                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (book.imageLinks) ? `url(${book.imageLinks.smallThumbnail})` : `url(http://via.placeholder.com)` }}></div>
                    <div className="book-shelf-changer">
                      <select onClick={this.handleClick} >
                        <option value="move" disabled>Move to...</option>

                        <option onClick={() => { this.setState({ currentValue: "currentlyReading", bookItem : book}) }}
                          className={this.state.currentValue === "currentlyReading" ? "book-shelf-changer select" : ""}
                          value="currentlyReading">Currently Reading</option>

                        <option onClick={() => { this.setState({ currentValue: "wantToRead",bookItem : book }) }}
                          className={this.state.currentValue === "wantToRead" ? "book-shelf-changer select" : ""}
                          value="wantToRead">Want to Read</option>

                        <option onClick={() => { this.setState({ currentValue: "read",bookItem : book }) }}
                          className={this.state.currentValue === "read" ? "book-shelf-changer select" : ""}
                          value="read">Read</option>

                        <option onClick={() => { this.setState({ currentValue: "none",bookItem : book }) }}
                          className={this.state.currentValue === "none" ? "book-shelf-changer select" : ""}
                          value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>

              </li>
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default Books

