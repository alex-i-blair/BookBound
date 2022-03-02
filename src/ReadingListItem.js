import React, { useState } from 'react';
import { searchSingleBook } from './services/fetch-utils';
import { useEffect } from 'react';
import Book from './Book';

export default function ReadingListItem({ book }) {
  console.log(book.api_id);
  const [bookItem, setBookItem] = useState({ volumeInfo: {} });

  useEffect(() => {
    async function fetchBookData() {
      const singleBook = await searchSingleBook(book.api_id);

      setBookItem(singleBook);
    }

    fetchBookData();
  }, [book.api_id]);
  // console.log(bookItem);

  return <div>
    <Book book={bookItem} />
  </div>;
}
