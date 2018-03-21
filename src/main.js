// src/main.js
require("./main.css");

const Vue = require("vue");
const VueRouter = require("vue-router");
const VueFire = require("vuefire");
const Vuetify = require("vuetify");
const Vuex = require("vuex");

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueFire);
Vue.use(Vuetify);

const { store } = require("./components/globalstate");

new Vue({
  store,
  el: "#app",
  ...require("./components/mountpoint.vue")
});
