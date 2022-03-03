import React, { useEffect } from 'react';
import { getReadingList, getUser } from './services/fetch-utils';
import { useState } from 'react';
import ReadingListItem from './ReadingListItem';

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
  // console.log('||', 'reading list', books);

  return (
    <div>
      <h2>My Bookshelf</h2>
      {books.map((book, i) => (
        <ReadingListItem key={`${book.id}-${i}`} book={book} isOnReadingList={isOnReadingList} />
      ))}
    </div>
  );
}
