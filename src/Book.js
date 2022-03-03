import React from 'react';
import { Link } from 'react-router-dom';
import { addToReadingList } from './services/fetch-utils';
import './styles/ListBooks.css';

export default function Book({ book, isOnReadingList }) {
  const alreadyOnList = isOnReadingList(book.id);
  const authors = [];
  book.volumeInfo.authors ? authors.push(book.volumeInfo.authors.join(' | ')) : {};

  async function handleClick() {
    const readingListItem = { api_id: book.id };
    await addToReadingList(readingListItem);
    window.location.href = '/reading-list';
  }

  return (
    <div title="book-list-item" className={`book-list-item ${alreadyOnList ? 'on-shelf' : ''}`}>
      <Link to={`/book-details/${book.id}`}>
        <img
          src={`https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`}
        />

        <div className="overflow-text">{book.volumeInfo.title}</div>

        <p className="overflow-author">by: {authors}</p>
      </Link>
      {!alreadyOnList && <button onClick={handleClick}>+</button>}
    </div>
  );
}
