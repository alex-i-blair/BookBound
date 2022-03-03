import React from 'react';
import { Link } from 'react-router-dom';

export default function Book({ book, isOnReadingList }) {
  const read = isOnReadingList(book.id);
  console.log('Test book in Book.js', book);
  const authors = [];
  book.volumeInfo.authors ? authors.push(book.volumeInfo.authors.join(' | ')) : {};

  return (
    <Link to={`/book-details/${book.id}`}>
      <div title="book-list-item" className={`book-list-item ${read ? 'on-shelf' : ''}`}>
        <img
          src={`https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`}
        />
        <h3>{book.volumeInfo.title}</h3>
        <p>by: {authors}</p>
      </div>
    </Link>
  );
}
