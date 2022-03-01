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
  const response = await client.from('reading_list').insert(book);
  return checkError(response);
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

export async function getReadingList() {
  const response = await client.from('reading_list').select().order('id');
  return checkError(response);
}

export async function searchBooks(query) {
  const response = await fetch(`/.netlify/functions/book-endpoint?searchQuery=${query}`);
  const json = await response.json();
  return json.data.items;
}
export async function searchSingleBook(query) {
  const response = await fetch(`/.netlify/functions/singleBook-endpoint?searchQuery=${query}`);
  const json = await response.json();
  return json.data.items;
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