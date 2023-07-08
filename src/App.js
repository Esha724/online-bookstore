import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');
  const [filterPublicationDate, setFilterPublicationDate] = useState('');
  
   

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/books');
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchBooks = async () => {
    try {
      const response = await axios.get('/books/search', {
        params: { query: searchQuery }
      });
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filterBooks = async () => {
    try {
      const response = await axios.get('/books/filter', {
        params: {
          genre: filterGenre,
          min_price: filterMinPrice,
          max_price: filterMaxPrice,
          publication_date: filterPublicationDate
        }
      });
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    searchBooks();
  };

  const handleFilter = (event) => {
    event.preventDefault();
    filterBooks();
  };

  return (
    <div className="container-fluid containers">
      <h1 className="title text-light display-1 fw-bold">Online Bookstore</h1>
        <div className='row mt-5'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title, author, or genre"
        />
        <button type="submit">Search</button>
      </form>
      </div>
      </div>

      <div className='row'>
      <div className='col-md-2'></div>
      <div className='col-md-8'>
      <form className="filter-form" onSubmit={handleFilter}>
        <input
          type="text"
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          placeholder="Filter by genre"
        />
        <input
          type="number"
          value={filterMinPrice}
          onChange={(e) => setFilterMinPrice(e.target.value)}
          placeholder="Minimum price"
        />
        <input
          type="number"
          value={filterMaxPrice}
          onChange={(e) => setFilterMaxPrice(e.target.value)}
          placeholder="Maximum price"
        />
        <input
          type="text"
          value={filterPublicationDate}
          onChange={(e) => setFilterPublicationDate(e.target.value)}
          placeholder="Filter by publication date"
        />
        <button type="submit">Filter</button>
      </form>
      </div>
      </div>

      <div className="book-list">
        {books.length === 0 ? (
          <p className='text-white text-center'>No books found.</p>
        ) : (
          books.map((book) => (
            <div key={book.id} className="book-item">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">Author: {book.author}</p>
              <div className="book-image">
                <img src={book.cover_image} alt={book.title} />
              </div>
              <p className="book-price">Price: ${book.price}</p>
              <p className="book-rating">Rating: {book.rating}</p>
              <p className="book-genre">Genre: {book.genre}</p>
              <p className="book-publication-date">Publication Date: {book.publication_date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
