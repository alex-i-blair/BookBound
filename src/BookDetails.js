import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  addToReadingList,
  removeFromReadingList,
  searchSingleBook,
  getUser,
  getReadingList,
  recommendBook,
  unRecommendBook,
} from './services/fetch-utils';

export default function BookDetails() {
  const [singleBook, setSingleBook] = useState({ volumeInfo: {}, saleInfo: {} });
  const params = useParams();
  const [readingList, setReadingList] = useState([]);
  const [recommended, setRecommended] = useState(false);

  useEffect(() => {
    async function getSingleBook() {
      const response = await searchSingleBook(params.id);
      setSingleBook(response);
      if (readingList.length) {
        const match = await findReadingListMatch(response.id);
        match && setRecommended(match.recommended);
      } else {
        await fetchReadingList();
      }
    }
    getSingleBook();
  }, [params.id, readingList]);

  async function fetchReadingList() {
    const user = getUser();
    const bookShelf = await getReadingList(user.id);
    setReadingList(bookShelf);
  }

  function isOnReadingList(api_id) {
    const match = readingList.find((item) => item.api_id === api_id);
    return Boolean(match);
  }

  // const recommended = isRecommended(singleBook.id);

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

  async function findReadingListMatch(api_id) {
    const match = readingList.find((item) => item.api_id === api_id);
    return match;
  }

  async function handleRecommendClick() {
    const match = await findReadingListMatch(singleBook.id);
    if (match) {
      setRecommended(!match.recommended);
      match.recommended ? await unRecommendBook(match.id) : await recommendBook(match.id);
    } else {
      await recommendBook(singleBook.id);
    }
    await fetchReadingList();
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
      <p dangerouslySetInnerHTML={{ __html: singleBook.volumeInfo.description }} />
      <div className="detail-btns">
        {alreadyOnList ? (
          <button onClick={handleRemoveClick}>Remove from Bookshelf</button>
        ) : (
          <button onClick={handleClick}>Add to Bookshelf</button>
        )}
        {singleBook.saleInfo.buyLink && (
          <button onClick={handlePurchaseClick}>Purchase Book</button>
        )}
        {alreadyOnList && (
          <>
            {recommended ? (
              <button onClick={handleRecommendClick}>Unrecommend</button>
            ) : (
              <button onClick={handleRecommendClick}>Recommend</button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
