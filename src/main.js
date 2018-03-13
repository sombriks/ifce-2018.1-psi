require("./main.css")

const firebase = require("firebase")

const Vue = require("vue")
const VueRouter = require("vue-router")
const VueFire = require("vuefire")
const Vuetify = require("vuetify")
const { red, indigo } = require("vuetify/es5/util/colors").default


Vue.use(VueRouter)
Vue.use(VueFire)
Vue.use(Vuetify, {
  theme: {
    primary: red.darken1, // #E53935
    secondary: red.lighten4, // #FFCDD2
    accent: indigo.base // #3F51B5
  }
})

new Vue({
  el: "#app",
  // render: r => r(require("./components/mountpoint.vue"))
  ...require("./components/mountpoint.vue")
  // spread ou render qual seu favorito vote agora
})