import { getAllCategories, findBooksByCategory } from './book-api-service';

const refs = {
  categoryListEl: document.querySelector('.category-list'),
  bookListEl: document.querySelector('.books-output-by-category'),
};

async function renderCategories() {
  const allCaregories = await getAllCategories();
  console.log(`allCaregories:`, allCaregories);

  const marcup = allCaregories
    .map(({ list_name }) => {
      return `<li class="category" data-category="${list_name}">
        ${list_name}
        </li>`;
    })
    .join('');

  refs.categoryListEl.insertAdjacentHTML("beforeend", marcup);

  [...refs.categoryListEl.children].forEach(category => {
    if(category.dataset.category){
        category.addEventListener('click', onSelectCategory);
    }
  });
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

  refs.bookListEl.innerHTML = `${bookListTitle}<ul class="categoris-books-list">${createBookListMarcup(books)}</ul>`;
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
      return `<li class="book-card">
        <img data-id="${_id}" src="${book_image}" alt="${title} cover" >
        <h2>${title}</h2>
        <p>${author}</p>
      </li>`;
    })
    .join('');
}

renderCategories()