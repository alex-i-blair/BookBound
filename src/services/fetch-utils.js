import { client, checkError } from './client';

export function getUser() {
  return client.auth.session() && client.auth.session().user;
}

export async function signUpUser(email, password) {
  const response = await client.auth.signUp({ email, password });
  return response.user;
}

export async function logout() {
  await client.auth.signOut();
  return (window.location.href = '../');
}

export async function signInUser(email, password) {
  const response = await client.auth.signIn({ email, password });
  return response.user;
}

export async function addToReadingList(book) {
  const bookId = await checkBookAgainstBookTable(book);
  const response = await client.from('reading_list').insert({ ...book, book_id: bookId });
  return checkError(response);
}

export async function checkBookAgainstBookTable(book) {
  const response = await client.from('reading_list').select().match({ api_id: book.api_id });
  if (response.data.length === 0) {
    const response2 = await client.from('book').insert({ recommended: 0 }).single();
    console.log('test response2', response2);
    return response2.data.id;
  }
  console.log('test response', response);
  return response.data[0].book_id;
}

export async function readBook(id) {
  const response = await client
    .from('reading_list')
    .update({ watched: true })
    .match({ id })
    .single();
  return checkError(response);
}

export async function unReadBook(id) {
  const response = await client
    .from('reading_list')
    .update({ watched: false })
    .match({ id })
    .single();
  return checkError(response);
}

export async function getReadingList(user_id) {
  const response = await client
    .from('reading_list')
    .select()
    .match({ user_id: user_id })
    .order('id');

  return checkError(response);
}

export async function searchBooks(query) {
  const response = await fetch(`/.netlify/functions/book-endpoint?searchQuery=${query}`);
  const json = await response.json();
  return json.data.items;
}
export async function searchSingleBook(id) {
  const response = await fetch(`/.netlify/functions/singleBook-endpoint?searchQuery=${id}`);
  const json = await response.json();
  return json.data;
}

export async function removeFromReadingList(id) {
  const response = await client.from('reading_list').delete().match({ id }).single();
  return checkError(response);
}

// export async function getSingleBook(id) {
//   const response = await client
//     .from('reading_list')
//     .
// }

