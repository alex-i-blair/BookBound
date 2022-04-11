import React from 'react';
import Book from './Book';
import { useLocation } from 'react-router-dom';
import ReadingListItem from './ReadingListItem';


export default function BookList({ books, isOnReadingList }) {
  const location = useLocation();
  return (
    <div className='result-list-container'>
      {books.map((book, i) =>
      // nice conditional rendering. I wonder if you could have used <Route /> from react-router to manage this?
        location.pathname.includes('search') ? 
          <Book key={book.id + i} book={book} isOnReadingList={isOnReadingList} />
         : 
          <ReadingListItem key={book.id + i}
            book={book}
            isOnReadingList={isOnReadingList} />
        )}
    </div>
  );
}
