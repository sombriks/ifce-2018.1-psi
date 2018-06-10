<template>
  <div>
    <v-form v-model="valid">
      <v-text-field
        v-model="this.anuncio.nomeanuncio"
        value= this.anuncio.nomeanuncio
        :rules="nomeRules"
        required>
        
        </v-text-field>
        
      <v-text-field
        v-model="this.anuncio.descricaoanuncio"
        value= this.anuncio.descricaoanuncio
        :rules="descricaoRules"
        required>
        
        </v-text-field>

        <v-text-field
        v-model="this.anuncio.telefoneanuncio"
        value= this.anuncio.telefoneanuncio
        :counter="11"
        :rules="telefoneRules"
        mask="(##) # ####.####"
        required>
        
        </v-text-field>

        <!-- botao para confimar adicionar -->
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="orange" @click="updateAnuncio()">Editar</v-btn>
        </v-card-actions>
    </v-form>
      
   </div>
   
  </template>

<script>
const { mapState } = require("vuex")
const { db, firebaseapp } = require("../components/config");
module.exports = {
  name: "Editar",
  firebase: {
    anuncio: {
      source: db.ref(`anuncios/${this.userKey}/anuncio/${this.idanuncioanimal}`),
      asObject: true,
      readyCallback () {
        //this.formatPhoneNumber()
      }
      },
  },
  created() {
    this.$bindAsObject('anuncio', firebaseapp.database().ref(`anuncios/${this.userKey}/anuncio/${this.idanuncioanimal}`), null, _ => {
      this.formatPhoneNumber()
    })
    this.$store.commit("setTitle", "Find My Pet - Editar anúncio");
  },
  beforeMount (){
    
  },
  data() {
    return {
      anuncio: {
      nomeanuncio: "",
      descricaoanuncio:"",
      telefoneanuncio: ""
      },
      descricaoRules: [
      v => !!v.trim() || "Informe texto do anúncio",
      v => v.length < 600 || "O texto não deve ter mais de 600 caracteres"
      ],
      nomeRules: [
      v => !!v.trim() || "Informe texto da descrição",
      v => v.length < 31 || "O anúncio não deve ter mais de 30 caracteres"
      ],
      telefoneRules: [
      v => !!v.trim() || "Informe número para contato",
      ],
      userKey: this.$route.params.userkey,
      idanuncioanimal: this.$route.params.idanuncioanimal,
      };
  },
  methods: {
    updateAnuncio() {
        console.log(this.userKey)
        console.log(this.idanuncioanimal)
        db.ref("anuncios").child(this.userKey).child('/anuncio').child(this.idanuncioanimal).set({
            nomeanuncio: this.anuncio.nomeanuncio,
            descricaoanuncio: this.anuncio.descricaoanuncio,
            telefoneanuncio: this.anuncio.telefoneanuncio
            // nomeanuncio: "Macaco Perdido",
            // descricaoanuncio: "Macaco Perdido",
            // telefoneanuncio: "11111111111",
        })
        .then( _ => {
          console.log('Anuncio editado com sucesso');
          console.log(this.anuncio.descricaoanuncio)
          window.location.href = "#/lista";
        })
        .catch(function(error) {
          console.log("Falha: " + error.message)
        });
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
