import {
  createUser,
  signInUser,
  signOutUser,
  importShoppingListToFirebase,
  authUser,
} from './firebase';

const form = document.getElementById('form-login-js');
const refs = {
  inputName: form.querySelector('[name="userName"]'),
  submitBtn: form.querySelector('#btn-submit-form'),
  signUp: document.getElementById('sign-up'),
  signIn: document.getElementById('sign-in'),
  logOutBtn: document.getElementById('btn-log-out'),
  backdrop: document.getElementById('backdrop-js'),
  openFormBtn: document.querySelector('.Authorization'),
  closeFormBtn: document.getElementById('btn-close-form'),
};

refs.openFormBtn.textContent = 'Sing up';
refs.openFormBtn.addEventListener('click', onOpenLoginForm);

//відкриваємо форму та вішаємо слухачів
function onOpenLoginForm() {
  if (refs.openFormBtn.textContent === 'Sing up') {
    form.addEventListener('submit', onSubmit);
    refs.signIn.addEventListener('click', onSignIn);
    refs.signUp.addEventListener('click', onSignUp);
    refs.closeFormBtn.addEventListener('click', onCloseLoginForm);

    refs.backdrop.classList.remove('is-hidden');
  }
  if (refs.openFormBtn.className.includes('auth')) {
    refs.backdrop.classList.remove('is-hidden');
    form.style.display = 'none';
    refs.closeFormBtn.addEventListener('click', onCloseLoginForm);
  }
}
// дії при відправці форми
async function onSubmit(event) {
  event.preventDefault();

  const { userName, userEmail, userPassword } = parseEmailAndPassword();

  if (refs.submitBtn.textContent === 'SIGN UP') {
    createUser(userName, userEmail, userPassword);
  } else {
    signInUser(userEmail, userPassword);
  }
  refs.logOutBtn.addEventListener('click', outUser, { once: true });
  form.reset();

  //якщо користувач авторизувався, тоді записуємо книги з localStorage в firebase
  const displayName = authUser?.currentUser?.displayName;

  if (displayName) {
    refs.openFormBtn.classList.add('auth');
    const dataFromLocalStorage = localStorage.getItem('bookShopList');
    const parsedData = JSON.parse(dataFromLocalStorage);
    importShoppingListToFirebase(parsedData);

    onCloseLoginForm();
    refs.openFormBtn.textContent = displayName;
  }
}

//дії коли Юзер вийшов
function outUser() {
  signOutUser();
  onCloseLoginForm();
  refs.openFormBtn.classList.remove('auth');
  refs.openFormBtn.textContent = 'Sing up';
  form.style.display = 'block';
}

//змінюємо вид форми при натиснені SignIn
function onSignIn(event) {
  event.preventDefault();
  refs.inputName.toggleAttribute('required');
  refs.inputName.classList.add('is-hidden');
  refs.submitBtn.textContent = 'SIGN IN';
}

//змінюємо вид форми при натиснені SignUp
function onSignUp(event) {
  event.preventDefault();
  refs.inputName.toggleAttribute('required');
  refs.inputName.classList.remove('is-hidden');
  refs.submitBtn.textContent = 'SIGN UP';
}

//закриваємо форму і знімаємо всіх слухачів
function onCloseLoginForm() {
  refs.backdrop.classList.add('is-hidden');

  form.removeEventListener('submit', onSubmit);
  refs.signIn.removeEventListener('click', onSignIn);
  refs.signUp.removeEventListener('click', onSignUp);
  refs.closeFormBtn.removeEventListener('click', onCloseLoginForm);
}

//функція для отримання логіну і пароля
function parseEmailAndPassword() {
  const data = new FormData(form);
  const dataParams = {};
  for (const [key, value] of data.entries()) {
    dataParams[key] = value;
  }
  return dataParams;
}
