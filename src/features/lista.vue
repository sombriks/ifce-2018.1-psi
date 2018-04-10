<template>
<v-app id="inspire">
    <v-layout row>
      <v-flex xs12 sm12>
        <v-card>
          <v-list>
            <v-list-tile avatar v-for="anuncio in anuncios" :key="anuncio['.key']" @click="showAnimal(anuncio['.key'])">
              <v-list-tile-action v-if="anuncio['recompensa']">
                <v-icon>money</v-icon>
              </v-list-tile-action>
              <v-list-tile-action v-else>
                <v-icon>favorite</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{anuncio["nomeanuncio"]}}</v-list-tile-title>
                <v-list-tile-sub-title> {{anuncio["descricaoanuncio"]}} </v-list-tile-sub-title>
              </v-list-tile-content>
              <!-- teoricamente a gnt vai add imagens xD   -->
              <!-- <v-list-tile-avatar>
              </v-list-tile-avatar> -->
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
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
  },
  methods:{
    showAnimal: function(key){ 
      this.$router.push({path: `/detalhe/${key}`})
    }
  }
}
</script>

