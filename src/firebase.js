import fb from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const firebaseApp = fb.initializeApp({
  apiKey: "AIzaSyCts3zNfPyma8VBsWa18knw0oqspHIbtUM",
  authDomain: "todo-bdbca.firebaseapp.com",
  projectId: "todo-bdbca",
  storageBucket: "todo-bdbca.appspot.com",
  messagingSenderId: "992630653963",
  appId: "1:992630653963:web:c6e1e81e3a3a506b36330e",
});

const db = firebaseApp.firestore();
const storage = fb.storage();

const provider = new GoogleAuthProvider();
const auth = getAuth();

const singInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      //signinsuccess
    })
    .catch((error) => {
      //errors
    });
};

const logout = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export { db, auth, storage, fb, singInWithGoogle, logout };
