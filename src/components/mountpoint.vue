<template>
<v-app>
  <v-navigation-drawer app v-model="drawer">
    <v-list>
      <v-list-tile v-if="currentUser">
        <v-list-tile-action>
          <v-avatar>
            <img :src="currentUser.photoURL"/>
          </v-avatar>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Olá, {{currentUser.displayName}}!</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="!currentUser" href="#/login">
        <v-list-tile-action>
          <v-icon>perm_identity</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Login</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile href="#/lista">
        <v-list-tile-action>
          <v-icon>list</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Anúncios</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="currentUser" :href="`#/perfil/${currentUser.uid}`">
        <v-list-tile-action>
          <v-icon>list</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Meus anúncios</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="currentUser" href="#/novo">
        <v-list-tile-action>
          <v-icon>playlist_add</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Novo anúncio</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile href="https://sombriks.github.io/ifce-2018.1-psi/#/" target="projmanagement">
        <v-list-tile-action>
          <v-icon>help</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Sobre o Find My Pet</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar app color="amber">
     <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{titleSection}}</v-toolbar-title>
  </v-toolbar>
  <v-content>
    <v-container grid-list-xs>
      <v-layout row>
        <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
  <v-footer app color="amber" class="text-xs-right">
      <div>&nbsp;&copy; PSI 2018.1</div> 
  </v-footer>
</v-app>
</template>
<script>
const { mapState } = require("vuex")
const VueRouter = require("vue-router")
const { firebaseapp } = require("./config")
module.exports = {
  name: "MountPoint",
  router: new VueRouter({
    routes: [{ path: "/", redirect: "/lista" }, ...require("./routes")]
  }),
  data: _ => ({ drawer: false }),
  created() {
    firebaseapp.auth().onAuthStateChanged(user => {
      // better than mapAction IMO
      this.$store.commit("setUser", user)
    })
  },
  computed: mapState(["currentUser", "titleSection"])
}
</script>
