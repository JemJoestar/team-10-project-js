import axios from 'axios';

const BASE_URL = 'https://books-backend.p.goit.global/books';
const POPULAR_BOOKS_URL = `${BASE_URL}/top-books`;
const CATEGORY_BOOKS_URL = `${BASE_URL}/category?category=`;

export async function fetchPopularBooks() {
  try {
    const { data } = await axios.get(POPULAR_BOOKS_URL);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCategoryBooks(category) {
  try {
    const { data } = await axios.get(`${CATEGORY_BOOKS_URL}${category}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
