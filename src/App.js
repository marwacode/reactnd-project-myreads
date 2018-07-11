import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Books from './Books';
import Main from './Main';
import './App.css';




class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [],
      query: '',

    }

    this.setQuery = this.setQuery.bind(this)

  }



  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })

  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.query !== this.state.query) {
      if (this.state.query) {
        BooksAPI.search(this.state.query)
          .then((books) => {
            this.setState({ books: books })
          })
      }

    }

    

  }

  setQuery(query) {
    this.setState({ query })
  }

  updateBook(book, shelfValue) {
    BooksAPI
      .update(book, shelfValue)
      .then(() => {
        this.setState({
          ...this.state,
          books: this.state.books.map(b => {
            if (b.id !== book.id) return b;

            const nextBook = { ...b };

            nextBook.shelf = shelfValue;

            return nextBook;
          })
        })
      })
  }


  render() {

    return (
      <div>
        <Route exact path='/' render={() => (
          <Main books={this.state.books}
            onChange={this.updateBook}
          />
        )} />
        <Route path='/search' render={() => (
          <Books books={this.state.books}
            onSearch={(query) => {
              this.setQuery(query)
            }}
            onChange={this.updateBook}
          />
        )} />
      </div>
    )
  }
}

export default App;
