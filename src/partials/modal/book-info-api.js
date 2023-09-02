import axios from 'axios';


export async function getBookInfo(id) {
const ID_URL  = `https://books-backend.p.goit.global/books/${id}`;
  return await axios.get(`${ID_URL}`).then(response => {
    return response.data;
  });
}