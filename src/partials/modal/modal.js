import axios from 'axios';


// зберігаємо посилання на елементи в об'єкті
const globalRefs = {
bookList: document.querySelector('.books-output-by-category'),

backdrop: document.querySelector('.backdrop-js'),
closeModalBtn: document.querySelector('.modal-close-btn'),
bookCover: document.querySelector('.modal-book-cover'),
bookTitle: document.querySelector('.modal-book-title'),
bookAuthor: document.querySelector('.modal-book-author'),
bookDescr: document.querySelector('.modal-book-descr'),
amazonLink: document.querySelector('.modal-amazon-link'),
appleLink: document.querySelector('.modal-apple-link'),
bookshopLink: document.querySelector('.modal-bookshop-link'),
addBtn: document.querySelector('.modal-add-btn'),
rmvMsg: document.querySelector('.modal-rmv-message'),
}


// змінні у які буде записана інфорамція про книгу і додані у локал стор. книги

let bookData;
let bookShoppingList =
    JSON.parse(localStorage.getItem('bookShopList')) || [];

// додаємо лісенери для відкриття та закриття модалки 
try{

  globalRefs.bookList.addEventListener('click', openModal);
  globalRefs.closeModalBtn.addEventListener('click', closeModal);
  
  // Функція закриття модалки при кліку на бекдроп
  
  globalRefs.backdrop.addEventListener('click', event => {
    if (event.target.classList.contains('backdrop-js')) {
      closeModal();
    }
  });
}catch(err){
  
}
  
  // закриття при кліку на esc
  
document.addEventListener('keydown', onEscPress);

function onEscPress(event) { 
    if (event.key === 'Escape') {
    closeModal();
  }
}
// Функція для відкриття модалки

async function openModal(event) {
    event.preventDefault();
    // консоль щоб побачити чи приходить айдішник з арі
    console.log(event.target.parentNode.dataset.bookId);
    
    try {
    //   отримання правильного айді при кліку по книзі
    bookData = await getBookInfo(event.target.parentNode.dataset.bookId);
    
    globalRefs.bookList.removeEventListener('click', openModal);
      
    // робимо модалку видимою
    globalRefs.backdrop.classList.remove('is-hidden');
        globalRefs.addBtn.classList.remove('is-hidden');
    // заповнюємо розмітку правильними данними
    globalRefs.bookCover.src = bookData.book_image;
    globalRefs.bookTitle.textContent = bookData.title;
    globalRefs.bookAuthor.textContent = bookData.author;
    globalRefs.bookDescr.textContent = bookData.description;
    
    // отримуємо посилання на магазини
    const amazonURL = bookData.buy_links.find(
      buyLink => buyLink.name === 'Amazon'
    ).url;
    
      const applebooksURL = bookData.buy_links.find(
      buyLink => buyLink.name === 'Apple Books'
    ).url;
    
      const bookshopURL = bookData.buy_links.find(
      buyLink => buyLink.name === 'Bookshop'
    ).url;
   
    // записуємо посилання в атрибут href 
    globalRefs.amazonLink.href = amazonURL;
    globalRefs.appleLink.href = applebooksURL;
    globalRefs.bookshopLink.href = bookshopURL;
    
// перевіряємо чи додана кника в локал стор
    bookAddedCheck();
    document.body.style.overflow = 'hidden';
    
  } catch {
    console.error('Error');
  }
}

// отримуємо данні з api

async function getBookInfo(bookId) {
  const response = await axios.get(
    `https://books-backend.p.goit.global/books/${bookId}`
  );
    console.log(response.data);
  return await response.data;
}
  
// перевірка чи додана книга в локал стор
function bookAddedCheck() {
  if (bookShoppingList.some(book => book._id === bookData._id)) {
    globalRefs.addBtn.removeEventListener('click', addToCart);
      globalRefs.addBtn.addEventListener('click', removeFromCart);
    //   якщо так, то міняємо напис на кнопці
      globalRefs.addBtn.textContent = 'REMOVE FROM SHOPING LIST';
    //   і показуємо повідомлення
    globalRefs.rmvMsg.classList.remove('is-hidden');
  } else {
    globalRefs.addBtn.removeEventListener('click', removeFromCart);
    globalRefs.addBtn.addEventListener('click', addToCart);
      globalRefs.addBtn.textContent = 'ADD TO SHOPING LIST';
    //   якщо ні, ховаємо повідомлення
    globalRefs.rmvMsg.classList.add('is-hidden');
  }
  localStorage.setItem('bookShopList', JSON.stringify(bookShoppingList));
}
// функція додавання книги в локал стор
function addToCart() {
  bookShoppingList.push(bookData);
  bookAddedCheck();
}
// видалення з локал стор
function removeFromCart() {
  bookShoppingList = bookShoppingList.filter(book => book._id !== bookData._id);
  bookAddedCheck();
}
// закриття модалки
function closeModal() {
  globalRefs.backdrop.classList.add('is-hidden');
  globalRefs.bookList.addEventListener('click', openModal);
    document.body.style.overflow = '';
    // знімаємо лісенер для esc
 document.removeEventListener('keydown', onEscPress);
}