// import { getBookInfo } from "./book-info-api";

// const bookList = document.querySelector(".books-output-by-category")

// bookList.addEventListener('click', onBookClick);

// const mainRefs = {
//   backdrop: document.querySelector('.backdrop-js'),
//   modal: document.querySelector('.modal-js'),
// };

// class Loader {
//   bookLoaderEl = document.querySelector('.loader-js');

//   show() {
//     this.bookLoaderEl.classList.remove('is-hidden');
//   }

//   hide() {
//     this.bookLoaderEl.classList.add('is-hidden');
//   }

//   getEl() {
//     return this.bookLoaderEl;
//   }
// }

// const BOOKS_DATA_KEY = 'books-data';
// const bookArray = [];
// const currentStorage = JSON.parse(localStorage.getItem(BOOKS_DATA_KEY));
// const loader = new Loader();

// if (currentStorage) {
//   bookArray.push(...currentStorage);
// } else {
//   localStorage.setItem(BOOKS_DATA_KEY, JSON.stringify([]));
// }

// // function onBookClick(event) { 
// //     event.preventDefault();
// // console.log('click on book')
// // const bookCards = document.querySelectorAll('.book-card');
// // return bookCards.forEach(card => {
// //   card.addEventListener('click', () => {
// //     const bookId = card.dataset.bookId;
// //     getBookInfo(bookId)
// //       .then(bookData => {
// //         openModal(bookData);
// //       })
// //       .catch(error => {
// //         console.log(error);
// //       });
// //   });
// // });
// // }

//  function onBookClick(event) {
//     event.preventDefault();
    
//    if (event.target.closest('.book-card')) {
//      console.log('click on book');
//      const bookId = event.target.dataset.bookId;
//      console.log(getBookInfo(bookId));
//       getBookInfo(bookId)
//       .then(bookData => {
//         openModal(bookData);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
// }

// async function openModal(bookId) {
//   loader.show();
//     try {
        
//        const bookData = await getBookInfo(bookId);


//         mainRefs.modal.classList.remove('is-hidden');
//         mainRefs.backdrop.classList.remove('is-hidden');
    
//         createModalMarkup(bookData);

//     loader.hide();

//     const refs = {
//       addBtn: document.querySelector('.modal-add-btn'),
//       rmvBtn: document.querySelector('.modal-rmv-btn'),
//       rmvMsg: document.querySelector('.modal-rmv-message'),
//       closeModalBtn: document.querySelector('.modal-close-btn'),
//     };

//     refs.rmvBtn.classList.add('is-hidden');
//     refs.rmvMsg.classList.add('is-hidden');    
//     refs.addBtn.classList.remove('is-hidden');
   

//     const isBookInStorage = bookArray.find(book => book._id === bookData._id);
//     const bookIndex = bookArray.indexOf(isBookInStorage);

//     if (isBookInStorage) {
//       refs.addBtn.classList.add('is-hidden');
//       refs.removeBlock.classList.remove('is-hidden');
//     }

//     window.addEventListener('keydown', onEscKeyPress);
//     window.addEventListener('click', onBackdropClick);
//     refs.addBtn.addEventListener('click', onAddBtnClick);
//     refs.rmvBtn.addEventListener('click', onRemoveBtnClick);
//     refs.closeModalBtn.addEventListener('click', onCloseModalBtnClick);

//     function onCloseModalBtnClick() {
//       closeModal();
//       removeListeners();
      
      
//     }

//  function onAddBtnClick() {
//       bookArray.push(bookData);
//       localStorage.setItem(BOOKS_DATA_KEY, JSON.stringify(bookArray));
//       refs.addBtn.classList.add('is-hidden');
//      refs.rmvBtn.classList.remove('is-hidden');
//      refs.rmvMsg.classList.remove('is-hidden');
//     }

//     function onRemoveBtnClick() {
//       bookArray.splice(bookIndex, 1);
//       localStorage.setItem(BOOKS_DATA_KEY, JSON.stringify(bookArray));
//       refs.addBtn.classList.remove('is-hidden');
//         refs.rmvBtn.classList.add('is-hidden');
//         refs.rmvMsg.classList.remove('is-hidden');
//     }

//     function onEscKeyPress(evt) {
//       const isEsc = evt.code === 'Escape';
//       if (isEsc) {
//         closeModal();
//         removeListeners();
        
//       }
//     }

//     function onBackdropClick(evt) {
//       if (evt.target === mainRefs.backdrop) {
//         closeModal();
//         removeListeners();
//       }
//     }

//     function closeModal() {
//       mainRefs.modal.classList.add('is-hidden');
//       mainRefs.backdrop.classList.add('is-hidden');
//     }

//     function removeListeners() {
//       window.removeEventListener('keydown', onEscKeyPress);
//       window.removeEventListener('click', onBackdropClick);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// function createModalMarkup(data) { 
//     let amazonUrl = data.buy_links.find(book => book.name === 'Amazon').url;
//     let appleBooksUrl = data.buy_links.find(
//             book => book.name === 'Apple Books'
//         ).url;
//     let barnesAndNobleUrl = data.buy_links.find(
//             book => book.name === 'Barnes and Noble'
//         ).url;
    
//     const modalWindow = document.querySelector('.modal');
//     const modalMarkup = `<div class="modal-container">
//       <img src="${data.book_image}" alt="Book cover" class="modal-book-cover" />
//       <div class="modal-book-info">
//         <h1 class="modal-book-title">${data.title}</h1>
//         <p class="modal-book-author">${data.author}</p>
//         <p class="modal-book-descr">
//           ${data.description}
//         </p>
//         <ul class="modal-shops-list">
//           <li class="modal-list-item amazon">
//             <a href="${amazonUrl}"><img alt="" class="modal-link" />O</a>
//           </li>
//           <li class="modal-list-item apple">
//             <a href="${appleBooksUrl}"><img alt="" class="modal-link" />O</a>
//           </li>
//           <li class="modal-list-item barnes">
//             <a href="${barnesAndNobleUrl}"><img alt="" class="modal-link" />O</a>
//           </li>
//         </ul>
//       </div>
//       <div class="modal-shop-btn">
//         <button class="modal-add-btn is-hidden">add to shopping list</button>
//         <button class="modal-rmv-btn">remove from the shopping list</button>
//         <p class="modal-rmv-message">
//           Сongratulations! You have added the book to the shopping list. To
//           delete, press the button “Remove from the shopping list”.
//         </p>
//       </div>
//     </div>`

//     return modalWindow.insertAdjacentHTML("beforeend", modalMarkup);
// }


// // data-book-id="${book._id}"