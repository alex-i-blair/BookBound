import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addToReadingList, searchSingleBook } from './services/fetch-utils';
export default function BookDetails() {
  const [singleBook, setSingleBook] = useState({ volumeInfo: {} });
  const params = useParams();

  useEffect(() => {
    async function getSingleBook() {
      const response = await searchSingleBook(params.id);
      setSingleBook(response);
    }
    getSingleBook();
  }, [params.id]);
  // console.log('one book', singleBook);

  async function handleClick() {
    const readingListItem = { api_id: singleBook.id };
    await addToReadingList(readingListItem);
  }

  const authors = [];
  singleBook.volumeInfo.authors ? authors.push(singleBook.volumeInfo.authors.join(' | ')) : {};

  return (
    <div className="book-details">
      <h3>{singleBook.volumeInfo.title}</h3>
      <p>by: {authors}</p>
      <p>
        published by: {singleBook.volumeInfo.publisher} | {singleBook.volumeInfo.publishedDate}
      </p>
      <img
        src={`https://books.google.com/books/content?id=${singleBook.id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`}
      />
      <h4>{singleBook.volumeInfo.description}</h4>
      <button onClick={handleClick}>Add to My Bookshelf</button>
    </div>
  );
}
