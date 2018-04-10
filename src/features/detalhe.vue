<template>
  <div>
    <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <img :src="imagesRef">
            <h3 class="display-3">{{anuncio[1]['.value']}}</h3>
            <span class="subheading">{{anuncio[0]['.value']}}</span>
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
    this.getImgs();
  },
  data () {
    return {
      key : this.$route.params.idanuncionanimal,
      items: []
    }
  },
  methods: {
    getImgs(){
    let storage = firebaseapp.storage();
    let storageRef = storage.ref();
    let imagesRef = storageRef.child('cachorros/pexels-photo-316776.jpeg').getDownloadURL().then((url) => {
        this.items.push({src: url});
      });
    }
  }
}
</script>

