<template>
<v-app>
  <v-navigation-drawer app></v-navigation-drawer>
  <v-toolbar app color="primary"></v-toolbar>
  <v-content>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-content>
  <v-footer app></v-footer>
</v-app>
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
