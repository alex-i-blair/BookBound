import React, { useState } from 'react';
import { searchSingleBook, removeFromReadingList } from './services/fetch-utils';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/ListBooks.css';

export default function ReadingListItem({ book }) {
  const [bookItem, setBookItem] = useState({ volumeInfo: {} });

  useEffect(() => {
    async function fetchBookData() {
      const singleBook = await searchSingleBook(book.api_id);

      setBookItem(singleBook);
    }

    fetchBookData();
  }, [book.api_id]);

  const authors = [];
  bookItem.volumeInfo.authors ? authors.push(bookItem.volumeInfo.authors.join(' | ')) : {};

  async function handleRemoveClick() {
    await removeFromReadingList(bookItem.id);
    window.location.href = '/reading-list';
  }

  return (
    <div className="book-list-item">
      <Link to={`/book-details/${bookItem.id}`}>
        <img
          src={`https://books.google.com/books/content?id=${bookItem.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
        />
        <h3>{bookItem.volumeInfo.title}</h3>
        <p>by: {authors}</p>
      </Link>
      <img src="./remove-button.png" className="remove-" onClick={handleRemoveClick}></img>
    </div>
  );
}
