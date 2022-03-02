import React, { useEffect } from 'react';
import { getReadingList, getUser, searchBooks } from './services/fetch-utils';
import { useState } from 'react';
import ReadingListItem from './ReadingListItem';

export default function ReadingList() {
  const [books, setBooks] = useState([]);
  const user = getUser();
  const user_id = user.id;
  const [bookIds, setBookIds] = useState([]);

  useEffect(() => {
    async function fetchBookData() {
      const readingList = await getReadingList(user_id);

      setBooks(readingList);
    }

    fetchBookData();
  }, [user_id]);
  console.log('||', 'reading list', books);

  return (
    <div>
      <h2>My Bookshelf</h2>
      {books.map((book, i) => (
        <ReadingListItem key={`${book}-${i}`} book={book} />
      ))}
    </div>
  );
}
