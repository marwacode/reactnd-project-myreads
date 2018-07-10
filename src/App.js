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

    }

    this.setQuery = this.setQuery.bind(this)

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



  }

  setQuery(query) {
    this.setState({ query })
  }

  setShelf(shelf, book) {
    //this.setState({ shelf })
    if (shelf === "wantToRead") {
      this.setState({ bookShelfs: this.state.bookShelfs.wantToRead.concat([book]) })
      this.setState({
        bookShelfs:
          this.state.bookShelfs.currentlyReading.filter((name) => name !== book)
      })

      this.setState({
        bookShelfs:
          this.state.bookShelfs.read.filter((name) => name !== book)
      })
    }

    if (shelf === "currentlyReading") {
      this.setState({ bookShelfs: this.state.bookShelfs.currentlyReading.concat([book]) })
      this.setState({
        bookShelfs:
          this.state.bookShelfs.wantToRead.filter((name) => name !== book)
      })

      this.setState({
        bookShelfs:
          this.state.bookShelfs.read.filter((name) => name !== book)
      })
    }

    if (shelf === "read") {
      this.setState({ bookShelfs: this.state.bookShelfs.read.concat([book]) })
      this.setState({
        bookShelfs:
          this.state.bookShelfs.currentlyReading.filter((name) => name !== book)
      })

      this.setState({
        bookShelfs:
          this.state.bookShelfs.wantToRead.filter((name) => name !== book)
      })
    }

    //BooksAPI.update(book,shelf)

  }

  render() {
    //console.log("shelf",this.state.shelf)
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
            onShelf={(shelf, book) => { this.setShelf(shelf, book) }}
          />
        )} />
      </div>
    )
  }
}

export default App;
