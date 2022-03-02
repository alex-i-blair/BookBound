import React, { useEffect } from 'react';
import { getReadingList, getUser, searchBooks } from './services/fetch-utils';
import { useState } from 'react';

export default function ReadingList() {
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

  return <div>ReadingList</div>;
}
