import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  addToReadingList,
  removeFromReadingList,
  searchSingleBook,
  getUser,
  getReadingList,
} from './services/fetch-utils';

export default function BookDetails() {
  const [singleBook, setSingleBook] = useState({ volumeInfo: {} });
  const params = useParams();
  const [readingList, setReadingList] = useState([]);
  // const [alreadyOnList, setAlreadyOnList] = useState('');

  useEffect(() => {
    async function getSingleBook() {
      const response = await searchSingleBook(params.id);
      setSingleBook(response);
    }
    getSingleBook();
    fetchReadingList();
  }, [params.id]);
  // console.log('one book', singleBook);

  async function fetchReadingList() {
    const user = getUser();
    const bookShelf = await getReadingList(user.id);
    setReadingList(bookShelf);
  }

  function isOnReadingList(api_id) {
    const match = readingList.find((item) => item.api_id === api_id);
    return Boolean(match);
  }

  const alreadyOnList = isOnReadingList(singleBook.id);

  console.log('on list?', alreadyOnList);

  async function handleClick() {
    const readingListItem = { api_id: singleBook.id };
    await addToReadingList(readingListItem);
  }

  async function handleRemoveClick() {
    await removeFromReadingList(singleBook.id);
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
      {alreadyOnList ? (
        <button onClick={handleRemoveClick}>Remove from Bookshelf</button>
      ) : (
        <button onClick={handleClick}>Add to Bookshelf</button>
      )}
    </div>
  );
}
