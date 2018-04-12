<template>
  <div>
    <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <h3 class="display-1">{{this.anuncios[this.key].nomeanuncio}}</h3>
            <p v-if="this.anuncios[this.key].recompensa" class="subheading">Recompensa : {{this.anuncios[this.key].recompensa}}</p>
            <span class="body-1"> {{this.anuncios[this.key].descricaoanuncio}} </span>
            <v-list two-line>
              <template  v-for="(value,key) in this.anuncios[this.key].comentario">
              <v-list-tile avatar :key="key">
                <v-list-tile-content>
                  <v-list-tile-title v-html="key"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="value"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>
   </div>
  </template>

<script>
const { db } = require("../components/config")
module.exports = {
  name: "Detalhe",
  firebase:{
      anuncios: { 
        source: db.ref(`anuncios`),
        asObject:true
      }
    },
  created() {
    this.$store.commit("setTitle", "Find My Pet - Últimos anúncios")
  },
  data () {
    return {
      key : this.$route.params.idanuncionanimal,
      items: [],
      nomeanuncio:{}
      }
  },
  methods: {
    // getImgs(){
    // let storage = firebaseapp.storage();
    // let storageRef = storage.ref();
    // let imagesRef = storageRef.child('cachorros/pexels-photo-316776.jpeg').getDownloadURL().then((url) => {
    //     this.items.push({src: url})
    //     console.log(this.items[0].src)
    //   });
    // }
  }
}
</script>

