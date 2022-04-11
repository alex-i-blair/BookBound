import React from 'react';
import { Link } from 'react-router-dom';
import { addToReadingList } from './services/fetch-utils';
import './styles/ListBooks.css';

export default function Book({ 
  // here's how to destructure deeply nested objects as props
  book: {
    volumeInfo: {
      authors,
      title
    },
    id
  }, 
  isOnReadingList }) {
  const alreadyOnList = isOnReadingList(id);
  const authors = [];
  authors ? authors.push(authors.join(' | ')) : {};

  async function handleClick() {
    const readingListItem = { api_id: id };
    await addToReadingList(readingListItem);
    // i'd like to see you use history.push instead of a hard URL change. That way you don't break out of the react ecosystem
    window.location.href = '/reading-list';
  }

  return (
    <div title="book-list-item" className={`book-list-item ${alreadyOnList ? 'on-shelf' : ''}`}>
      <Link to={`/book-details/${id}`}>
        <img
          src={`https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`}
        />

        <div className="overflow-text">{title}</div>

        <p className="overflow-author">by: {authors}</p>
      </Link>
      {!alreadyOnList && <img className="add-btn" src="./add-button.png" onClick={handleClick} />}
    </div>
  );
}
