// src/components/globalstore.js
const Vuex = require("vuex");

exports.store = new Vuex.Store({
  state: {
    currentUser: null,
    titleSection: "Find My Pet"
  },
  mutations: {
    setUser(state, newUser) {
      state.currentUser = newUser;
    },
    setTitle(state, title) {
      state.titleSection = title;
    }
  }
});
