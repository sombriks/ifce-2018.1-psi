<template>
  <div>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12 lg6>

            <!-- descrição do anúncio  -->
            <h3 class="display-1">{{this.anuncios[this.key].nomeanuncio}}</h3>
            <p v-if="this.anuncios[this.key].recompensa" class="subheading">Recompensa : {{this.anuncios[this.key].recompensa}}</p>
            <span class="body-1">Descrição: {{this.anuncios[this.key].descricaoanuncio}} </span>
             </v-flex>

            <!-- carousel  -->
          <v-flex xs12 lg6>
              <!-- <v-carousel hide-controls>
                <v-carousel-item v-for="(item,i) in items" :src="this.anuncios[this.key].imageUrl" :key="i"></v-carousel-item>
              </v-carousel> -->
              <img class="imgDetalhe" :src="this.anuncios[this.key].imageUrl" alt="">
          </v-flex>
          <hr>
          <!-- comentarios -->
           <v-flex xs12 lg12>  
            <v-list three-line>
              <template  v-for="(comentario) in this.anuncios[this.key].comentario">
                <v-list-tile avatar :key="comentario.nomeNovoComentario">
                  <v-list-tile-content>
                    <v-list-tile-title> {{comentario.nomeNovoComentario}} </v-list-tile-title>
                    <v-list-tile-sub-title aria-multiline> {{comentario.novoComentario}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-flex>

          <!-- adicionar comentário  -->
          <v-flex xs12 lg12>
          <v-form v-model="valid" @submit.prevent="doSave">
            <v-card>
              <v-container fluid>
                 <v-text-field
                  label="Digite seu nome aqui"
                  v-model="comentario.nomeNovoComentario"
                  :counter="20"
                  :rules="comentarioRules"
                  required
                ></v-text-field>   
                <v-text-field
                  label="Digite seu anúncio aqui"
                  v-model="comentario.novoComentario"
                  :counter="600"
                  :rules="comentarioRules"
                  required
                  multi-line
                ></v-text-field>            
                </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" flat color="orange" type="submit">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>

          </v-flex>
        </v-layout>
      </v-container>
   </div>
  </template>

<script>
const { db, firebaseapp } = require("../components/config");
module.exports = {
  name: "Detalhe",
  firebase: {
    anuncios: {
      source: db.ref(`anuncios`),
      asObject: true,
    }
  },
  created() {
    this.$store.commit("setTitle", "Find My Pet - Últimos anúncios");
  },
  data() {
    return {
      comentario: {
        novoComentario:"",
        nomeNovoComentario: "",
      },
      valid: false,
      key: this.$route.params.idanuncionanimal,
      comentarioRules: [
      v => !!v.trim() || "Informe texto do comentário",
      v => v.length < 600 || "O anúncio não deve ter mais de 600 caracteres"
    ],
    nomeRules: [
      v => !!v.trim() || "Informe texto do comentário",
      v => v.length < 20 || "O anúncio não deve ter mais de 20 caracteres"
    ]
    };
  },
  methods: {
     doSave() {
      if (this.valid) {
        db.ref("anuncios").child(this.key).child("comentario").push(this.comentario)
      }
    }
  }
};
</script>

<style>
.imgDetalhe{
  width: 100%
}
</style>
