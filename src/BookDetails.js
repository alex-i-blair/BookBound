import React from 'react';

export default function BookDetails({ book }) {
  
  const authors = [];
  book.volumeInfo.authors ? authors.push(book.volumeInfo.authors.join(' | ')) : {};
  console.log(book);

  return ( 
    <div className="book-details">
      <h3>{book.volumeInfo.title}</h3><p>by: {authors}</p>
      <p>published by: {book.volumeInfo.publisher} | {book.volumeInfo.publishedDate}</p>
      <img src={`https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`} />
      <h4>{book.volumeInfo.description}</h4>
    </div>
  );
}
