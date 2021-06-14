import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import firebase from 'firebase/app'
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDeJBQzHsIq5GZPR8UVE1_KRv8ZQqIwWIY",
  authDomain: "netflix-clone-2a69d.firebaseapp.com",
  projectId: "netflix-clone-2a69d",
  storageBucket: "netflix-clone-2a69d.appspot.com",
  messagingSenderId: "1050801664055",
  appId: "1:1050801664055:web:1fc51daea49d6d2f6c8fb2"
};

firebase.initializeApp(firebaseConfig);


export const Context = createContext(null)
const firestore = firebase.firestore()
const projectStorage = firebase.storage()
const timestamp = firebase.firestore.FieldValue.serverTimestamp




ReactDOM.render(
  <React.StrictMode>
   <Context.Provider value={{
     firebase,
     firestore,
     projectStorage,
     timestamp,
   }}>
   <App />
   </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

