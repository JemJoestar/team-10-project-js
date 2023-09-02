import axios from 'axios';


export function getBookInfo(id) {
const ID_URL  = `https://books-backend.p.goit.global/books/${id}`;
  return axios.get(`${ID_URL}`).then(response => {
    return response.data;
  });
}