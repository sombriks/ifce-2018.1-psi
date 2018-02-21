require("./main.css")

const Vue = require("vue")
const VueRouter = require("vue-router")

Vue.use(VueRouter)

new Vue({
  el:"#app",
  render: r => r(require("./components/mountpoint.vue"))
})