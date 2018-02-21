<template>
  <router-view></router-view>
</template>

<script>
const VueRouter = require("vue-router")
module.exports = {
  name: "MountPoint",
  router: new VueRouter({
    routes: [{ path: "/", redirect: "/landing" }, ...require("./routes")]
  })
}
</script>

<style>

</style>
