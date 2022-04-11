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
  const [match, setMatch] = useState({});

  useEffect(() => {
    async function findReadingListMatch(api_id) {
      const match = getMatch(api_id);

      setMatch(match);
    }

    async function getSingleBook() {
      const response = await searchSingleBook(params.id);
      setSingleBook(response);
      if (readingList.length) {
        const match = await findReadingListMatch(response.id);
        
        if (match) setRecommended(match.recommended);
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
    const match = getMatch(api_id);

    return Boolean(match);
  }

  // looks like you use this behavior twice, might as well make a function
  function getMatch(id) {
    return readingList.find((item) => item.api_id === id);
  }
  
  async function handleClick() {
    const readingListItem = { api_id: singleBook.id };
    await addToReadingList(readingListItem);
    // i'd rather see react-router's history.push here to navigate within the app
    window.location.href = '/reading-list';
  }

  async function handleRemoveClick() {
    await removeFromReadingList(singleBook.id);
    // again, i'd rather see react-router's history.push here to navigate within the app
    window.location.href = '/reading-list';
  }

  function handlePurchaseClick() {
    window.open(singleBook.saleInfo.buyLink);
  }

  async function handleRecommendClick() {
    if (match) {
      setRecommended(!match.recommended);
      // ternaries are usually for conditional assignment or return values. for function calls with side effects, if/else blocks are more standard
      if (match.recommended)  await unRecommendBook(match.id)
      else await recommendBook(match.id);

    } else {
      await recommendBook(singleBook.id);
    }

    await fetchReadingList();
  }

  // this should live in a react useState. you never want use state in a react app that does not live in a useState call
  const authors = [];

   // kind of seems like an if statement makes more sense, since there is no assignment
   // also, this should be using react state, not free-floating memory
  if (singleBook.volumeInfo.authors) authors.push(singleBook.volumeInfo.authors.join(' | '))

  const alreadyOnList = isOnReadingList(singleBook.id);

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
      {/* nice work dangerously setting this HTML! you will want to be careful with this and rewad into the security risks that come with trusting raw HTML that lives in a database */}
      <p dangerouslySetInnerHTML={{ __html: singleBook.volumeInfo.description }} />
      <div className="detail-btns">
        {/* no need for these parentheses, but that's just a style preference I have */}
        {alreadyOnList 
          ? <button onClick={handleRemoveClick}>Remove from Bookshelf</button>
          : <button onClick={handleClick}>Add to Bookshelf</button>
        }
        {singleBook.saleInfo.buyLink && 
          <button onClick={handlePurchaseClick}>Purchase Book</button>
        }
        {alreadyOnList && 
          <>
            {recommended 
              ? <button onClick={handleRecommendClick}>Unrecommend</button>
              : <button onClick={handleRecommendClick}>Recommend</button>
            }
          </>
        }
      </div>
    </div>
  );
}
