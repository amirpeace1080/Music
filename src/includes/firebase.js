import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyALx3wqi7HVELVSuglFI7pTW7bKzUxX3cQ",
  authDomain: "music-1131d.firebaseapp.com",
  projectId: "music-1131d",
  storageBucket: "music-1131d.appspot.com",
  messagingSenderId: "273183987311",
  appId: "1:273183987311:web:b95af354e5df7630585f9a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error ${error.code}`);
});

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  storage,
};
