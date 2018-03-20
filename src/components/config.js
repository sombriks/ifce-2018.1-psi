// src/components/database.js
const firebase = require("firebase");
const firebaseapp = firebase.initializeApp({
  apiKey: "AIzaSyBbZ7Om2ePdLdwc6cahTzlY5IAMyvgRZR4",
  authDomain: "ifce-2018-1-psi.firebaseapp.com",
  databaseURL: "https://ifce-2018-1-psi.firebaseio.com",
  projectId: "ifce-2018-1-psi",
  storageBucket: "ifce-2018-1-psi.appspot.com",
  messagingSenderId: "738747721409"
});
const db = firebaseapp.database();

module.exports = {
  firebaseapp,
  db
};
