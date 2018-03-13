// src/components/database.js
const firebase = require("firebase")
const db = firebase.initializeApp({
  databaseURL: "https://ifce-2018-1-psi.firebaseio.com",
}).database()


module.exports = {
  db
}

