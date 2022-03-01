import React from 'react';
import { Link } from 'react-router-dom';

export default function Book({ book }) {
  const authors = [];
  book.volumeInfo.authors ? authors.push(book.volumeInfo.authors.join(' | ')) : {};

  return (
    <Link to={`/book-details/${book.id}`}>
      <div className="book">
        <h3>{book.volumeInfo.title}</h3>
        <p>by: {authors}</p>
        <img
          src={`https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`}
        />
      </div>
    </Link>
  );
}
