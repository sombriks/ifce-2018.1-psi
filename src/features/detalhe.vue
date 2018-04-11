<template>
  <div>
    <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <img :src="imagesRef">
            <h3 class="display-1">{{tituloAnuncio}}</h3>
              <p v-if=recompensa class="subheading">Recompensa : {{recompensa}}</p>
            <span class="body-1"> {{descricaoAnuncio}} </span>
          </v-flex>
        </v-layout>
      </v-container>
    <v-carousel>
      <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i">
      </v-carousel-item>
    </v-carousel>
  </div>
  </template>

<script>
const { firebase,firebaseapp,storage,db } = require("../components/config")
module.exports = {
  name: "Detalhe",
  firebase () {
    return {
       anuncio: db.ref("anuncios").child(this.key)
    }
  },
  created(){
    this.formatAnuncio();
    this.getImgs();
  },
  data () {
    return {
      key : this.$route.params.idanuncionanimal,
      items: [],
      tituloAnuncio : "",
      descricaoAnuncio : "",
      recompensa : null
      }
  },
  methods: {
    getImgs(){
    let storage = firebaseapp.storage();
    let storageRef = storage.ref();
    let imagesRef = storageRef.child('cachorros/pexels-photo-316776.jpeg').getDownloadURL().then((url) => {
        this.items.push({src: url})
        console.log(this.items[0].src)
      });
    },
    formatAnuncio(){
      this.tituloAnuncio = this.anuncio[1]['.value']
      this.descricaoAnuncio = this.anuncio[0]['.value']
      this.recompensa =  this.anuncio[2]['.value']
    }
  }
}
</script>

