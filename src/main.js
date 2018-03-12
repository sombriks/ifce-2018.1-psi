require("./main.css")

const Vue = require("vue")
const VueRouter = require("vue-router")
const Vuetify = require("vuetify")
const VueFire = requier("vuefire")

const firebase = require("firebase")

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(VueFire)

new Vue({
  el:"#app",
  render: r => r(require("./components/mountpoint.vue"))
})