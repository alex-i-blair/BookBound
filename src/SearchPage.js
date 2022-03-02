import React from 'react';
import { useState } from 'react';
import BookList from './BookList';
import { searchBooks, } from './services/fetch-utils';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  
  async function handleSearch(e) {
    e.preventDefault();

    const books = await searchBooks(searchQuery);
    setBooks(books);
  }
  function isOnReadingList(api_id) {
    const match = books.find(item => (item.id) === (api_id));

    console.log(match);
    return Boolean(match);
  }

  return (
    <div className="search-page">
      <form onSubmit={handleSearch}>
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button>Search</button>
      </form>
      <div>
        <BookList books={books} isOnReadingList={isOnReadingList}/>
      </div>
    </div>
  );
}
