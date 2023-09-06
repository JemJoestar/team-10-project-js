import axios from 'axios';

const BASE_URL = 'https://books-backend.p.goit.global/books';

export async function getAllCategories() {
  return (await axios({ url: `${BASE_URL}/category-list` })).data;
}

export async function findBooksByCategory(category) {
  return (await axios({
    url: `${BASE_URL}/category`,
    params: {
      category: category,
    },
  })).data;
}
