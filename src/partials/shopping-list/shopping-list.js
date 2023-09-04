import trashSvg from '../../images/icon.svg';
import appleBook from './images/apple-book.png';
import amazonLogo from './images/amazon-logo.png';
import bookShop from './images/book-shop.png';

const section = document.querySelector('.shopping-list-js');

const bookCards = JSON.parse(localStorage.getItem('bookShopList'));
console.log(`bookCards:`, bookCards);

function createMarkup() {
  return bookCards.reduce(
    (
      markup,
      { author, book_image, title, description, list_name, buy_links, _id }
    ) => {
      return (
        markup +
        `<div class="card-book" data-id="${_id}">
    <b class="btn-delete" type="button">
    <svg class="delete" width="12" height="12">
    <use href="${trashSvg}#icon-trash"></use>
    </svg>
    </b target="_blank"utton>
    <img
      class="poster"
      src="${book_image}"
      alt="poster"
      />
      <div class="book-inform">
      <h2 class="book-title">${title}</h2>
      <p class="book-undertitle">${list_name}</p>
      <p class="book-text">${description}</p>
      <div class="card-undertext">
      <p class="author">${author}</p>
      <div class="shop-list">
        <a href="${
          buy_links.find(link => link.name === 'Amazon').url
        }" class="amazon-logo  shopping-list-logo" target="_blank">
        <img src="${amazonLogo}" height="11">
        </a>
        <a href="${
          buy_links.find(link => link.name === 'Apple Books').url
        }" class="apple-logo shopping-list-logo" target="_blank">
        <img src="${appleBook}" height="16">
        </a>
        <a href="${
          buy_links.find(link => link.name === 'Bookshop').url
        }" class="book-logo shopping-list-logo" target="_blank">
        <img src="${bookShop}" height="16">
        </a>
      </div>
      </div>
      </div>
      </div>`
      );
    },
    ''
  );
}
// console.log(createMarkup(bookCards))

try {
  if (bookCards.length != 0) {
    section.innerHTML = '';
  }
  section.insertAdjacentHTML('beforeend', createMarkup(bookCards));
} catch (err) {
  console.log(`err:`, err);
}
