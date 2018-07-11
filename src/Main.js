import React from 'react';
import { Link } from 'react-router-dom';

import './App.css'

class Main extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      currentValue: '',

    }


  }

  onChangeBookShelf = (book) => (event) => {
    
    const shelfValue = event.target.value;
    this.props.onChange(book, shelfValue )
 
  }


  render() {


    const { books } = this.props;
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
    const wantToRead = books.filter(book => book.shelf === 'wantToRead');
    const read = books.filter(book => book.shelf === 'read');


    return (
      <div className="app">

        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">

                    {(currentlyReading.length > 0) ?
                      currentlyReading.map((book) => {

                        return <li key={book.id} >

                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (book.imageLinks) ? `url(${book.imageLinks.smallThumbnail})` : `url(http://via.placeholder.com)` }}></div>
                              <div className="book-shelf-changer">
                                <select onChange={this.onChangeBookShelf(book)} >
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
                                    className={book.shelf === "none" ? "book-shelf-changer select" : ""}
                                    value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                          </div>

                        </li>
                      }) : (<div><h3>No books</h3></div>)
                    }


                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">

                    {(wantToRead.length > 0) ?
                      wantToRead.map((book) => {

                        return <li key={book.id} >

                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (book.imageLinks) ? `url(${book.imageLinks.smallThumbnail})` : `url(http://via.placeholder.com)` }}></div>
                              <div className="book-shelf-changer">
                                <select onClick={this.onChangeBookShelf(book)} >
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
                                    className={book.shelf === "none" ? "book-shelf-changer select" : ""}
                                    value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                          </div>

                        </li>
                      }) : (<div><h3>No books</h3></div>)
                    }



                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">

                    {(read.length > 0) ?
                      read.map((book) => {

                        return <li key={book.id} >

                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (book.imageLinks) ? `url(${book.imageLinks.smallThumbnail})` : `url(http://via.placeholder.com)` }}></div>
                              <div className="book-shelf-changer">
                                <select onClick={this.onChangeBookShelf(book)} >

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
                                    className={book.shelf === "none" ? "book-shelf-changer select" : ""}
                                    value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                          </div>

                        </li>
                      }) : (<div><h3>No books</h3></div>)
                    }

                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
        </div>

      </div>
    )
  }
}

export default Main
