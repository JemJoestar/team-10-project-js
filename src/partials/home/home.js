import { fetchPopularBooks, fetchCategoryBooks } from './fetchBooks';

// Функция для отображения популярных книг в каждой категории
async function renderPopularBooks() {
  const genresList = document.querySelector('.books-output-by-category');
  const popularBooksData = await fetchPopularBooks();
  
  console.log(`genresList:` )

  genresList.innerHTML = popularBooksData
    .map(({ list_name, books }) => {
      // Ограничиваем количество отображаемых книг до 5
      const initialBooks = books.slice(0, 5);
      // Преобразуем массив книг в HTML-разметку
      const booksHTML = initialBooks.map(book => createBookHTML(book)).join('');

      // Создаем блок для каждой категории и заполняем его данными
      return `
        <div class="category-block">
          <h3 class="category-title">${list_name}</h3>
          <div class="book-row">${booksHTML}</div>
          <button class="see-more-btn">See More</button>
        </div>
      `;
    })
    .join('');

  // Назначаем обработчик события для каждой кнопки "See More"
  const seeMoreButtons = document.querySelectorAll('.see-more-btn');
  seeMoreButtons.forEach(button => {
    // Получаем название категории из заголовка блока и передаем в обработчик
    const categoryTitle = button
      .closest('.category-block')
      .querySelector('.category-title').textContent;
    button.dataset.category = categoryTitle;
    button.addEventListener('click', showMoreBooks);
  });
}

// Функция для создания HTML-разметки книги
function createBookHTML(book) {
  return `
    <div class="book-card">
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

  if (!categoryBlock.dataset.loaded) {
    // Получаем название категории из кнопки "See More"
    const categoryName = button.dataset.category;
    // Загружаем данные книг для выбранной категории
    const categoryBooksData = await fetchCategoryBooks(categoryName);

    // Преобразуем массив книг в HTML-разметку и добавляем в блок
    const remainingBooksHTML = categoryBooksData
      .map(book => createBookHTML(book))
      .join('');
    bookRow.insertAdjacentHTML('beforeend', remainingBooksHTML);

    // Устанавливаем флаг, что дополнительные книги загружены
    categoryBlock.dataset.loaded = true;
  }

  // Отображаем скрытые книги и скрываем кнопку "See More"
  const hiddenBooks = bookRow.querySelectorAll('.hidden-book');
  hiddenBooks.forEach(book => book.classList.remove('hidden-book'));
  button.style.display = 'none';
}

// Вызываем функцию для отображения популярных книг
renderPopularBooks();
