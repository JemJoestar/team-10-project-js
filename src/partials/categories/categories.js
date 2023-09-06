import { getAllCategories, findBooksByCategory } from './book-api-service';

const refs = {
  categoryListEl: document.querySelector('.category-list'),
  bookListEl: document.querySelector('.books-output-by-category'),
};

async function renderCategories() {
  try {
    const allCaregories = await getAllCategories();
    console.log(`allCaregories:`, allCaregories);

    const marcup = allCaregories
      .map(({ list_name }) => {
        return `<li class="category" tabindex="0" data-category="${list_name}">
      ${list_name}
      </li>`;
      })
      .join('');

    refs.categoryListEl.insertAdjacentHTML('beforeend', marcup);

    [...refs.categoryListEl.children].forEach(category => {
      if (category.dataset.category) {
        category.addEventListener('click', onSelectCategory);
      }
    });
  } catch (err) {}
}

// Выбор категории
async function onSelectCategory(event) {
  [...refs.categoryListEl.children].forEach(category =>
    category.classList.remove('selected')
  );

  event.currentTarget.classList.add('selected');

  const currentCategoryName = event.currentTarget.dataset.category;

  renderBooks(currentCategoryName);
}

async function renderBooks(currentCategoryName) {
  const books = await findBooksByCategory(currentCategoryName);
  console.log(`books:`, books);

  const bookListTitle = createTitleMarcup(currentCategoryName);

  refs.bookListEl.innerHTML = `${bookListTitle}<ul class="categoris-books-list">${createBookListMarcup(
    books
  )}</ul>`;
}

function createTitleMarcup(titleText) {
  const words = titleText.split(' ');
  let lastWord = words[words.length - 1];
  lastWord = `<span class="title-colored">${lastWord}</span>`;
  words[words.length - 1] = lastWord;
  return `<h1 class="categories-title">${words.join(' ')}</h1>`;
}

function createBookListMarcup(books) {
  return books
    .map(({ _id, author, title, book_image }) => {
      return `<li class="book-card" data-book-id="${_id}">
      <div class="overlay-item">
        <img class="book-image" src="${book_image}" alt="${title} cover" loading="lazy">
        <p class = "book-overlay">quick view</p>
        </div>
        <h2 class="bookinfo-title">${title}</h2>
        <p class="bookinfo-author">${author}</p>
      </li>`;
    })
    .join('');
}

renderCategories();
