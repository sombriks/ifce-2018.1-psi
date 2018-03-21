<template>
  <v-card v-if="currentUser && $route.params.idamigoanimal == currentUser.uid">
    <v-btn @click="sair">Sair</v-btn>
  </v-card>
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
  computed: mapState(["currentUser"]),
  created() {
    this.$store.commit("setTitle", "Find My Pet - Perfil")
  }
}
</script>

