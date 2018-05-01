<template>
  <v-card v-if="currentUser && $route.params.idamigoanimal == currentUser.uid">
    
    <v-app id="inspire">
      <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex
              v-bind="{ [`xs${anuncio.flex}`]: true }"
              v-for="anuncio in meusanuncios"
              :key="anuncio.nomeanuncio"
              xs12 lg6
            >
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
                  <v-btn flat color="orange" @click="showAnimal(anuncio['.key'])">Detalhes</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </v-app>
    <v-btn @click="sair">Sair</v-btn>
  </v-card>
</template>

<script>
const { mapState } = require("vuex")
const { firebaseapp,db } = require("../components/config")
module.exports = {
  name: "Perfil",
  methods: {
    sair() {
      firebaseapp.auth().signOut()
      window.location.href = "#/"
      this.$store.commit("setUser", null)
    },
    showAnimal: function(key){ 
      this.$router.push({path: `/detalhe/${key}`})
    }
  },
  data () {
    return {
      meusanuncios : [],
    } 
  },
  beforeCreate: function() {
    firebaseapp.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.user = user
        this.$bindAsArray('meusanuncios', db.ref('anuncios/' + user.uid + '/anuncio'))
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

