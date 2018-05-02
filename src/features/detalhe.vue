<template>
  <div>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap><v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
              <v-card-title class="headline">Você não está logado!</v-card-title>
              <v-card-text>Por favor, logue-se para poder comentar.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="yellow darken-1" flat @click="goToAuth">Logar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-flex xs12 lg6>
            {{anuncios}}
            
            <!-- descrição do anúncio  -->
            <h1 class="display-1">{{this.anuncio.nomeanuncio}}</h1>
            <h2 class="headline">{{this.phoneNumber}}</h2>
            <p v-if="this.anuncio.recompensa" class="subheading">Recompensa : R$ {{this.anuncio.recompensa}}</p>
            <span class="body-1">Descrição: {{this.anuncio.descricaoanuncio}} </span>
             </v-flex>

            <!-- img  -->
          <v-flex xs12 lg6>
              <div class="imgDiv">    
                <img class="imgDetalhe" :src="this.anuncio.imageUrl" alt="">
              </div>
          </v-flex>
          
          <!-- comentarios -->
           <v-flex xs12 lg12>  
          
          <h2 class="headline">comentários</h2>
            <v-list three-line>
              <div v-if="this.anuncio.comentario">
                <template v-for="(comentario) in this.anuncio.comentario">
                  <v-list-tile avatar :key="`comentario - ${comentario.novoComentario}`">
                    <v-list-tile-content>
                      <v-list-tile-title> {{comentario.nomeNovoComentario}} </v-list-tile-title>
                      <v-list-tile-sub-title aria-multiline> {{comentario.novoComentario}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider :key="`divider - ${comentario.nomeNovoComentario}`"></v-divider>
                </template>
              </div>
              <div v-else>
                ninguém comentou ainda :(
              </div>
            </v-list>
          </v-flex>
          <v-flex xs12 lg12>
            <div v-if="this.currentUser != null">
          <!-- adicionar comentário  -->
              <h2 class="headline">novo comentário</h2>
                <v-form v-model="valid" @submit.prevent="doSave">
                  <v-card>
                      <v-container fluid>
                      <v-text-field
                          :placeholder='this.currentUser.displayName'
                          v-model="comentario.nomeNovoComentario"
                          disabled
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
            </div>
          </v-flex>
        </v-layout>
      </v-container>
   </div>
  </template>

<script>
const { mapState } = require("vuex")
const { db, firebaseapp } = require("../components/config");
module.exports = {
  name: "Detalhe",
  created() {
    this.$bindAsObject('anuncio', firebaseapp.database().ref(`anuncios/${this.userKey}/anuncio/${this.idanuncioanimal}`), null, _ => {
      this.formatPhoneNumber()
    })
    this.$store.commit("setTitle", "Find My Pet - Últimos anúncios");
  },
  beforeMount (){
    
  },
  data() {
    return {
      anuncio: {},
      dialog: false,
      comentario: {
        novoComentario:"",
        nomeNovoComentario: "",
      },  
      phoneNumber : "",
      valid: false,
      userKey: this.$route.params.userkey,
      idanuncioanimal: this.$route.params.idanuncioanimal,
      comentarioRules: [
      v => v.length < 600 || "O anúncio não deve ter mais de 600 caracteres"
    ]};
  },
  methods: {
     doSave() {
      this.comentario.nomeNovoComentario = this.currentUser.displayName
      if (this.valid && this.currentUser != null) {
        db.ref("anuncios").child(this.userKey).child('/anuncio').child(this.idanuncioanimal).child("comentario").push(this.comentario)
        this.comentario.novoComentario = ''
      }else{
        this.dialog = false
      }
    },
    formatPhoneNumber(){
      let phoneNumber = this.anuncio.telefoneanuncio;
      phoneNumber = phoneNumber.slice('')
      this.phoneNumber = `(${phoneNumber[0]}${phoneNumber[1]}) ${phoneNumber[2]} ${phoneNumber[3]}${phoneNumber[4]}${phoneNumber[5]}${phoneNumber[6]}-${phoneNumber[7]}${phoneNumber[8]}${phoneNumber[9]}${phoneNumber[10]}`
    },
    goToAuth: function(){ 
      window.location.href = "#/login"
    }
  },
  computed: mapState(["currentUser"]), 

  };
</script>

<style>
.imgDiv{
  overflow: hidden;
  display: block;
  background: white;
}

.imgDetalhe{
  max-width: 100%;
  max-height: 400px;
}

</style>
