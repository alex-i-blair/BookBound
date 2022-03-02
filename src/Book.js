import React from 'react';
import { Link } from 'react-router-dom';

export default function Book({ book, isOnReadingList }) {
  const read = isOnReadingList(book.id);
  // console.log(bookshelf);
  const authors = [];
  book.volumeInfo.authors ? authors.push(book.volumeInfo.authors.join(' | ')) : {};

 

  return (
    <Link to={`/book-details/${book.id}`}>
      
      <div title='read-book' className={`read-book ${read ? 'in-list' : ''}`}>
        <h1>{read && '❤️'}</h1>
        <h3>{book.volumeInfo.title}</h3>
        <p>by: {authors}</p>
        <img
          src={`https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`}
        />
      </div>
    </Link>
  );
}
