import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  addToReadingList,
  removeFromReadingList,
  searchSingleBook,
  getUser,
  getReadingList,
} from './services/fetch-utils';

export default function BookDetails() {
  const [singleBook, setSingleBook] = useState({ volumeInfo: {}, saleInfo: {} });
  const params = useParams();
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    async function getSingleBook() {
      const response = await searchSingleBook(params.id);
      setSingleBook(response);
    }
    getSingleBook();
    fetchReadingList();
  }, [params.id]);

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

  async function handleClick() {
    const readingListItem = { api_id: singleBook.id };
    await addToReadingList(readingListItem);
    window.location.href = '/reading-list';
  }

  async function handleRemoveClick() {
    await removeFromReadingList(singleBook.id);
    window.location.href = '/reading-list';
  }

  function handlePurchaseClick() {
    window.open(singleBook.saleInfo.buyLink);
  }

  const authors = [];
  singleBook.volumeInfo.authors ? authors.push(singleBook.volumeInfo.authors.join(' | ')) : {};

  return (
    <div className="book-details">
      <h3>{singleBook.volumeInfo.title}</h3>
      <div className="author-info">
        <p>by: {authors}</p>
        <p>
          published by: {singleBook.volumeInfo.publisher} | {singleBook.volumeInfo.publishedDate}
        </p>
      </div>
      <img
        src={`https://books.google.com/books/content?id=${singleBook.id}&printsec=frontcover&img=1&zoom=5&source=gbs_api`}
      />
      <p>{singleBook.volumeInfo.description}</p>
      <div className="detail-btns">
        {alreadyOnList ? (
          <button onClick={handleRemoveClick}>Remove from Bookshelf</button>
        ) : (
          <button onClick={handleClick}>Add to Bookshelf</button>
        )}
        {singleBook.saleInfo.buyLink && (
          <button onClick={handlePurchaseClick}>Purchase Book</button>
        )}
        <button>Recommend</button>
      </div>
    </div>
  );
}
