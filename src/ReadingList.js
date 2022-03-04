import React, { useEffect } from 'react';
import { getReadingList, getUser } from './services/fetch-utils';
import { useState } from 'react';
import ReadingListItem from './ReadingListItem';
import './styles/ListBooks.css';

export default function ReadingList({ isOnReadingList }) {
  const [books, setBooks] = useState([]);
  const user = getUser();
  const user_id = user.id;

  useEffect(() => {
    async function fetchBookData() {
      const readingList = await getReadingList(user_id);

      setBooks(readingList);
    }

    fetchBookData();
  }, [user_id]);

  return (
    <div className="result-list-container bookshelf-list">
      {books.length ? (
        books.map((book, i) => (
          <ReadingListItem key={`${book.id}-${i}`} book={book} isOnReadingList={isOnReadingList} />
        ))
      ) : (
        <h4>Find books to add to your shelf!</h4>
      )}
    </div>
  );
}
