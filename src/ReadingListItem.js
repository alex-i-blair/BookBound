import React, { useState } from 'react';
import { searchSingleBook } from './services/fetch-utils';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ReadingListItem({ book }) {
  // console.log(book.api_id);
  const [bookItem, setBookItem] = useState({ volumeInfo: {} });

  useEffect(() => {
    async function fetchBookData() {
      const singleBook = await searchSingleBook(book.api_id);

      setBookItem(singleBook);
    }

    fetchBookData();
  }, [book.api_id]);
  // console.log('Test book in ReadingListItem', bookItem);

  const authors = [];
  bookItem.volumeInfo.authors ? authors.push(bookItem.volumeInfo.authors.join(' | ')) : {};

  return (
    <Link to={`/book-details/${bookItem.id}`}>
      <div title="read-book">
        <h3>{bookItem.volumeInfo.title}</h3>
        <p>by: {authors}</p>
        <img
          src={`https://books.google.com/books/content?id=${bookItem.id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`}
        />
      </div>
    </Link>
  );
}
