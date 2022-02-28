import React from 'react';

export default function Book({ book }) {
  const authors = book.volumeInfo.authors;
  const authorString = authors.join(' | ');
  return (
    <div className="book">
      <h3>{book.volumeInfo.title}</h3>
      <p>by: {authorString}</p>
      <img src={book.volumeInfo.imageLinks.smallThumbnail}></img>
    </div>
  );
}
