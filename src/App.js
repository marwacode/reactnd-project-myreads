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
      bookShelfs: {
        wantToRead: [],
        currentlyReading: [],
        read: []
      },

      shelf: '',
      book: '',

    }

    this.setQuery = this.setQuery.bind(this)
    this.setShelf = this.setShelf.bind(this)
    this.setItems = this.setItems.bind(this)

  }



  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      //console.log(books)
    })

    this.setShelf()

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
    this.setShelf()

  }

  setQuery(query) {
    this.setState({ query })
  }

  setItems(shelf, book) {
    this.setState({
      shelf: shelf,
      book: book
    })
  }

  setShelf() {
    //this.setState({ shelf })
    if (this.state.shelf === "wantToRead") {
      this.setState((currentState) => {
        return {
          bookShelfs: currentState.bookShelfs.wantToRead.concat([this.state.book])
        }
      })

      this.setState((currentState) => {
        if (currentState.bookShelfs.currentlyReading) {
          return {
            bookShelfs: currentState.bookShelfs.currentlyReading.filter((name) => name !== this.state.book)
          }
        }

      })

      this.setState((currentState) => {
        if (currentState.bookShelfs.read) {
          return {
            bookShelfs: currentState.bookShelfs.read.filter((name) => name !== this.state.book)
          }
        }

      })
    }

    if (this.state.shelf === "currentlyReading") {
      this.setState((currentState) => {
        return {
          bookShelfs: currentState.bookShelfs.currentlyReading.concat([this.state.book])
        }
      })
      this.setState((currentState) => {
        if (currentState.bookShelfs.wantToRead) {
          return {
            bookShelfs: currentState.bookShelfs.wantToRead.filter((name) => name !== this.state.book)
          }
        }

      })

      this.setState((currentState) => {
        if (currentState.bookShelfs.read) {
          return {
            bookShelfs: currentState.bookShelfs.read.filter((name) => name !== this.state.book)
          }
        }

      })
    }

    if (this.state.shelf === "read") {
      this.setState((currentState) => {
        return {
          bookShelfs: currentState.bookShelfs.read.concat([this.state.book])
        }
      })
      this.setState((currentState) => {
        if (this.bookShelfs.currentlyReading) {
          return {
            bookShelfs: currentState.bookShelfs.currentlyReading.filter((name) => name !== this.state.book)
          }
        }

      })

      this.setState((currentState) => {
        if (currentState.bookShelfs.wantToRead) {
          return {
            bookShelfs: currentState.bookShelfs.wantToRead.filter((name) => name !== this.state.book)
          }
        }

      })
    }

    //BooksAPI.update(book,shelf)

  }

  render() {
    //console.log("shelf",this.state.shelf)
    console.log(this.state.bookShelfs)
    return (
      <div>
        <Route exact path='/' render={() => (
          <Main bookObject={this.state.bookShelfs} />
        )} />
        <Route path='/search' render={() => (
          <Books books={this.state.books}
            onSearch={(query) => {
              this.setQuery(query)
            }}
            onShelf={(shelf, book) => { this.setItems(shelf, book) }}
          />
        )} />
      </div>
    )
  }
}

export default App;
