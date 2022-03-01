import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { searchSingleBook } from './services/fetch-utils';
export default function BookDetails({ book }) {
  const [bookId, setBookId] = useState('');
  const [singleBook, setSingleBook] = useState({});
  const params = useParams();
  console.log('URL stuff', params.id);

  useEffect(() => {
    async function getSingleBook() {
      const response = await searchSingleBook(params.id);
      setSingleBook(response);
    }
    getSingleBook();
  }, [params.id]);
  console.log('one book', singleBook);

  
  // const authors = [];
  // book.volumeInfo.authors ? authors.push(book.volumeInfo.authors.join(' | ')) : {};
  // console.log(book);

  return ( 
    <div className="book-details">
      {/* <h3>{book.volumeInfo.title}</h3><p>by: {authors}</p>
      <p>published by: {book.volumeInfo.publisher} | {book.volumeInfo.publishedDate}</p>
      <img src={`https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`} />
      <h4>{book.volumeInfo.description}</h4> */}
    </div>
  );
}
