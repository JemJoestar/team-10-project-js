const section = document.querySelector('.shopping-list-js');

const bookCards = JSON.parse(localStorage.getItem('bookShopList'));

console.log(bookCards);

function createMarkup() {
  return bookCards.reduce(
    (markup, { author, book_image, title, description}) => {
      return (
        markup +
        `<div class="card-book">
    <button class="btn-delete" type="button">
      <svg class="delete" width="12" height="12">
        <use href="./images/icon.svg#icon-trash"></use>
      </svg>
    </button>
    <img
      class="poster"
      src="${book_image}"
      alt="poster"
    />
    <div>
      <h2 class="book-title">${title}</h2>
      <p class="book-undertitle">11111</p>
      <p class="book-text">${description}</p>
      <div class="card-undertext">
        <p class="author">${author}</p>
      </div>
    </div>
  </div>`
      );
    },
    ''
  );
}
console.log(createMarkup(bookCards))

section.insertAdjacentHTML('beforeend', createMarkup(bookCards));
