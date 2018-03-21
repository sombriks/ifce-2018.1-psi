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
const appurl = {
  development: "http://127.0.0.1:9966",
  production: "https://ifce-2018-1-psi.firebaseapp.com"
};

// XXX merge do globalstate e do config?
module.exports = {
  signInSuccessUrl: appurl[process.env.NODE_ENV],
  firebaseapp,
  db
};
