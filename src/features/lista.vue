<template>
  <v-list two-line>
    <v-list-tile v-for="ann in anuncios" :key="ann['.key']">
      {{ann.nomeanuncio}}
    </v-list-tile>
  </v-list>
</template>

<script>
const { db } = require("../components/config")
module.exports = {
  name: "Lista",
  firebase: {
    anuncios: db.ref("anuncios")
  },
  created() {
    this.$store.commit("setTitle", "Find My Pet - Últimos anúncios")
  }
}
</script>

