<template>
<v-app id="inspire"> 
    <v-container fluid grid-list-md>
          <v-layout row wrap v-for="(anunciosOfUser,userKey) in anuncios"
              :key="key = anunciosOfUser['.key']">
            <v-flex v-bind="{ [`xs${anuncio.flex}`]: true }" v-for="(anuncio,anuncioKey) in anunciosOfUser.anuncio"
              :key="anuncio.nomeanuncio" xs12 lg6 >
              <v-card>
                <v-card-media :src="anuncio.imageUrl" height="200px">
                </v-card-media>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0 wrapAnuncio">{{anuncio.nomeanuncio}}</h3>
                    <div class="wrapAnuncio">{{anuncio.descricaoanuncio}}</div>
                    <div>{{anuncio.telefoneanuncio}}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat color="orange" @click="showAnimal(userKey,anuncioKey)">Detalhes</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
  </v-app>
</template>

<script>
const { mapState } = require("vuex")
const { db } = require("../components/config")
module.exports = {
  name: "Lista",
  firebase: {
    anuncios: {
      source: db.ref(`anuncios`),
      asObject: true,
      },
  },
  created() {
    this.$store.commit("setTitle", "Find My Pet - Últimos anúncios")
  },
  methods:{
    showAnimal: function(userKey,anuncioKey){
      this.$router.push({path: `/detalhe/${userKey}/${anuncioKey}`})
    }
  },
  computed: mapState(["currentUser"]), 
}
</script>

<style>
.wrapAnuncio{
  width: 300px;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
