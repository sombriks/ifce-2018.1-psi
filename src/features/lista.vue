<template>
<v-app id="inspire">
    <!-- <v-layout row v-for="anuncio in anuncios" :key="anuncio.nomecachorro">
      <v-flex lg4>
        <v-card>
          <v-card-media src="https://www.causesforanimals.com/uploads/1/0/8/3/10832582/streetdog4_1_orig.jpg" height="200px">
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{anuncio.nomeanuncio}}</h3>
              <div>{{anuncio.descricaoanuncio}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout> -->
    <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex
              v-bind="{ [`xs${anuncio.flex}`]: true }"
              v-for="anuncio in anuncios"
              :key="anuncio.nomeanuncio"
              xs6 lg6
            >
              <v-card>
                <v-card-media :src="anuncio.imageUrl" height="200px">
                </v-card-media>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0 wrapAnuncio">{{anuncio.nomeanuncio}}</h3>
                    <div class="wrapAnuncio">{{anuncio.descricaoanuncio}}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat color="orange" @click="showAnimal(anuncio['.key'])">Detalhes</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
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

<style>
.wrapAnuncio{
  width: 350px;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
