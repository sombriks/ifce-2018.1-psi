// src/components/store
const Vuex = require("vuex");

exports.store = new Vuex.Store({
  state: {
    currentUser: null
  },
  mutations: {
    setUser(state, newUser) {
      console.log(newUser);
      state.currentUser = newUser;
    }
  }
});
