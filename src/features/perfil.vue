<template>
  <v-container grid-list-xs text-xs-center align-center>
    <v-layout row>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card v-if="currentUser && $route.params.idamigoanimal == currentUser.uid">
          <v-btn @click="sair">Sair</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const { mapState } = require("vuex")
const { firebaseapp } = require("../components/config")
module.exports = {
  name: "Perfil",
  methods: {
    sair() {
      firebaseapp.auth().signOut()
      window.location.href = "#/"
      this.$store.commit("setUser", null)
    }
  },
  computed: mapState({
    currentUser: ({ currentUser }) => currentUser
  })
}
</script>

