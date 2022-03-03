import React from 'react';
import { useState, useEffect } from 'react';
import BookList from './BookList';
import { getReadingList, getUser, searchBooks } from './services/fetch-utils';
import './styles/ListBooks.css';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    fetchReadingList();
  }, []);

  console.log(readingList);

  async function handleSearch(e) {
    e.preventDefault();
    const books = await searchBooks(searchQuery);
    setBooks(books);
  }

  async function fetchReadingList() {
    const user = getUser();
    const bookShelf = await getReadingList(user.id);
    setReadingList(bookShelf);
  }

  function isOnReadingList(api_id) {
    const match = readingList.find((item) => item.api_id === api_id);

    // console.log(match);

    return Boolean(match);
  }
  const test = isOnReadingList(5);
  // console.log(test);

  return (
    <div className="search-page">
      <header className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            required
            placeholder="Search Books"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button>Search</button>
        </form>
      </header>
      <div>
        <BookList books={books} isOnReadingList={isOnReadingList} />
      </div>
    </div>
  );
}
