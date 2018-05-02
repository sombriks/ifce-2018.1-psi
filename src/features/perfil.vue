<template>
  <v-card v-if="currentUser && $route.params.idamigoanimal == currentUser.uid">
    
    <v-app id="inspire">
      <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex
              v-bind="{ [`xs${anuncio.flex}`]: true }"
              v-for="(anuncio,anuncioKey) in meusanuncios"
              :key="anuncio.nomeanuncio"
              xs12 lg6
            >
            <!-- aqui é pura gambiarra, pra evitar o .key aparecer nos cards -->
            <div v-if=" anuncio != 'anuncio' ">
                <v-card>
                  <v-card-media :src="anuncio.imageUrl" height="200px">
                  </v-card-media>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0 wrapAnuncio">{{anuncio.nomeanuncio}}</h3>
                      <div class="wrapAnuncio">{{anuncio.descricaoanuncio}}</div>
                      <div>{{`(${anuncio.telefoneanuncio.split('')[0]}${anuncio.telefoneanuncio.split('')[1]}) ${anuncio.telefoneanuncio.split('')[2]} ${anuncio.telefoneanuncio.split('')[3]}${anuncio.telefoneanuncio.split('')[4]}${anuncio.telefoneanuncio.split('')[5]}${anuncio.telefoneanuncio.split('')[6]}-${anuncio.telefoneanuncio.split('')[7]}${anuncio.telefoneanuncio.split('')[8]}${anuncio.telefoneanuncio.split('')[9]}${anuncio.telefoneanuncio.split('')[10]}`
                      }}</div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="orange" @click="showAnimal(userKey,anuncioKey)">Detalhes</v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
    </v-app>
  </v-card>
</template>

<script>
const { mapState } = require("vuex")
const { firebaseapp,db } = require("../components/config")
module.exports = {
  name: "Perfil",
  methods: {
    showAnimal: function(userKey,anuncioKey){
      this.$router.push({path: `/detalhe/${userKey}/${anuncioKey}`})
    }
  },
  data () {
    return {
      userKey : this.$route.params.idamigoanimal,
      meusanuncios : {},
    } 
  },
  beforeCreate () {
    firebaseapp.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.user = user
        this.$bindAsObject('meusanuncios', db.ref('anuncios/' + user.uid + '/anuncio'))
      } else {
        firebase.auth().signInAnonymously().catch(console.error)
      }
    }.bind(this))
  },
  created() {
    this.$store.commit("setTitle", "Find My Pet - Perfil")
  },
  computed: mapState(["currentUser"]), 
}
</script>

