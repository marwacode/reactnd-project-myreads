import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import * as BooksAPI from './BooksAPI';
import Books from './Books';
import Main from './Main';
import './App.css';




class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [],
      bookResults: [],

    }

    this.updateBook = this.updateBook.bind(this)

  }


  componentDidMount() {

    this.getBooks()


  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  searchItem = (query) => {
    if (query.length > 0) {
      const match = new RegExp(escapeRegExp(query), 'i')
      BooksAPI.search(query)
        .then((books) => books.length > 0 ? books.filter((book) => match.test(book.title || book.authors)) : [])
        .catch((e) => console.log(e))
        .then((books) => {
          this.setState({
            bookResults: books,
            books: books
          })
          
        })
        .then(this.getBooks())

    }



  }


  updateBook(book, shelfValue) {

    BooksAPI
      .update(book, shelfValue)
      .then(() => {
        this.setState(prevState => ({

          books: prevState.books.map(b => {
            if (b.id !== book.id) return b;

            const nextBook = { ...b };

            nextBook.shelf = shelfValue;

            return nextBook;
          })
        }))
      }).catch((e) => console.log(e))
      .then(() => {
        this.setState({ query: "" })
      })
      .then(this.getBooks())

  }



  render() {

    return (
      <div>
        <Route exact path='/' render={() => (
          <Main books={this.state.books}
            onChange={this.updateBook}
            onStart={this.getBooks}
          />
        )} />
        <Route path='/search' render={() => (
          <Books books={this.state.books}
            bookResults={this.state.bookResults}
            onSearch={(query) => {
              this.searchItem(query)
            }}
            onChange={this.updateBook}
            onStart={this.getBooks}
          />
        )} />
      </div>
    )
  }
}

export default App;
