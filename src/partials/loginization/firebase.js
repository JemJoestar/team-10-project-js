// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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

export function createUser(email, password) {
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      successfulAction('User created.');
    })
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
      successfulAction('The user is authorized.');
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
    .then(() => {
      successfulAction('Sign-out successful');
    })
    .catch(error => {
      // An error happened.
      customErr(error);
    });
}

export function onAuthUserChanged() {
  const auth = getAuth(app);
  onAuthStateChanged(auth, user => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      const uid = user.uid;
      console.log('Юзер активний');
      // ...
    } else {
      // User is signed out
      // ...
      console.log('Юзер вийшов');
    }
  });
}

function successfulAction(message) {
  Notify.success(message);
}

function customErr(err) {
  Notify.warning(err);
}
