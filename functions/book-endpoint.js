const fetch = require('node-fetch');
require('dotenv').config();

exports.handler = async (event) => {
  const searchQuery = event.queryStringParameters.searchQuery;

  const URL = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=0&maxResults=40&orderBy=relevance&key=${process.env.BOOK_API_KEY}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const json = JSON.stringify({ data });

    return {
      statusCode: 200,
      body: json,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
