// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBCW2BfxUWy_6A-Tubz5H90ifw6J8gzfKo',
  authDomain: 'bookauthorization-yb.firebaseapp.com',
  projectId: 'bookauthorization-yb',
  storageBucket: 'bookauthorization-yb.appspot.com',
  messagingSenderId: '432805777430',
  appId: '1:432805777430:web:74728d04e28081ab5f6537',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export function createUser(username, email, password) {
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;

      // Додаємо ім'я користувача
      updateProfile(user, {
        displayName: username,
      });
    })
    .then(() => successfulAction(`User ${username} created.`))
    .catch(error => {
      const errorCode = error.code;
      customErr(error.message);
    });
}

export function signInUser(email, password) {
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // console.log(auth.currentUser);
    })
    .catch(error => {
      const errorCode = error.code;
      customErr(error.message);
    });
}

export function signOutUser() {
  const auth = getAuth(app);
  signOut(auth)
    .then(() => {})
    .catch(error => {
      // An error happened.
      customErr(error);
    });
}

export function importShoppingListToFirebase(parsedData) {
  fetch(
    `https://bookauthorization-yb-default-rtdb.europe-west1.firebasedatabase.app/bookShopList.json`,
    {
      method: 'POST',
      body: JSON.stringify(parsedData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then(resp => resp.json());
}

export const authUser = getAuth(app);

function successfulAction(message) {
  Notify.success(message);
}

function customErr(err) {
  Notify.warning(err);
}
