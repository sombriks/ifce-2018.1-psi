// src/main.js
require("./main.css");

const Vue = require("vue");
const VueRouter = require("vue-router");
const VueFire = require("vuefire");
const Vuetify = require("vuetify");

Vue.use(VueRouter);
Vue.use(VueFire);
Vue.use(Vuetify);

new Vue({
  el: "#app",
  ...require("./components/mountpoint.vue")
});
