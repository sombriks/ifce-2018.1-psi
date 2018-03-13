<template>
<v-app>
  <v-navigation-drawer app v-model="drawer">

  </v-navigation-drawer>
  <v-toolbar app>
     <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Find My Pet</v-toolbar-title>
  </v-toolbar>
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
    routes: [{ path: "/", redirect: "/lista" }, ...require("./routes")]
  }),
  data: _ => ({ drawer: false }),
}
</script>
