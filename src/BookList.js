import React from 'react';
import Book from './Book';

export default function BookList({ books }) {
  console.log('||', 'book list books', books);

  return (
    <div>
      {books.map((book, i) => (
        <Book key={`${book}-${i}`} book={book} />
      ))}
    </div>
  );
}
