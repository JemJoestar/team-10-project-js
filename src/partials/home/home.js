import { fetchPopularBooks, fetchCategoryBooks } from './fetchBooks';

// Функция для отображения популярных книг в каждой категории
async function renderPopularBooks() {
  // Удаляем предыдущие названия
  const genresList = document.querySelector('.books-output-by-category');
  genresList.innerHTML = '';

  // Добавляем элемент с названием "Best Sellers Books"
  genresList.insertAdjacentHTML(
    'afterbegin',
    createTitleMarkup('Best Sellers Books')
  );

  const popularBooksData = await fetchPopularBooks();

  genresList.innerHTML += popularBooksData
    .map(({ list_name, books }) => {
      let numberOfBooksToDisplay = 5; // По умолчанию на больших экранах показываем 5 книг

      // Используем медиа-запросы для определения количества книг на разных устройствах
      if (window.matchMedia('(max-width: 768px)').matches) {
        numberOfBooksToDisplay = 3; // На планшетах показываем 3 книги
      }

      if (window.matchMedia('(max-width: 480px)').matches) {
        numberOfBooksToDisplay = 1; // На мобильных устройствах показываем 1 книгу
      }

      const initialBooks = books.slice(0, numberOfBooksToDisplay);
      const booksHTML = initialBooks.map(book => createBookHTML(book)).join('');

      return `
        <div class="category-block">
          <p class="category-info">${list_name}</p>
          <div class="book-row">${booksHTML}</div>
          <button class="see-more-btn">See More</button>
        </div>
      `;
    })
    .join('');

  // Назначаем обработчик события для каждой кнопки "See More"
  const seeMoreButtons = document.querySelectorAll('.see-more-btn');
  seeMoreButtons.forEach(button => {
    // Получаем название категории из блока "category-info" и передаем в обработчик
    const categoryTitle = button
      .closest('.category-block')
      .querySelector('.category-info').textContent;
    button.dataset.category = categoryTitle;
    button.addEventListener('click', showMoreBooks);
  });
}

// Функция для создания HTML-разметки книги
function createBookHTML(book) {
  return `
    <div class="book-card" data-book-id="${book._id}">
      <img class="book-image" src="${book.book_image}" alt="${book.title}">
      <div class="book-info">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
      </div>
    </div>
  `;
}

// Функция для отображения дополнительных книг по категории
async function showMoreBooks(event) {
  const button = event.target;
  const categoryBlock = button.closest('.category-block');
  const bookRow = categoryBlock.querySelector('.book-row');

  // Получаем название категории из кнопки "See More"
  const categoryName = button.dataset.category;
  // Загружаем данные книг для выбранной категории
  const categoryBooksData = await fetchCategoryBooks(categoryName);

  // Преобразуем массив книг в HTML-разметку и добавляем в блок
  const remainingBooksHTML = categoryBooksData
    .map(book => createBookHTML(book))
    .join('');

  // Заменяем innerHTML, чтобы не дублировать книги
  bookRow.innerHTML = remainingBooksHTML;

  // Отображаем скрытые книги и скрываем кнопку "See More"
  const hiddenBooks = bookRow.querySelectorAll('.hidden-book');
  hiddenBooks.forEach(book => book.classList.remove('hidden-book'));
  button.style.display = 'none';
}

// Функция для создания HTML-разметки заголовка категории
function createTitleMarkup(titleText) {
  const words = titleText.split(' ');
  let lastWord = words[words.length - 1];
  lastWord = `<span class="title-colored">${lastWord}</span>`;
  words[words.length - 1] = lastWord;
  return `<h1 class="categories-title">${words.join(' ')}</h1>`;
}

// Вызываем функцию для отображения популярных книг
document.addEventListener('DOMContentLoaded', function () {
  renderPopularBooks();
});

// Назначаем обработчик события на элемент .all-categories
const allCategories = document.querySelector('.all-categories');
allCategories.addEventListener('click', renderPopularBooks);
