<template >
  <div v-if="this.anuncio.nomeanuncio">
     <v-form>
     <div v-if="this.anuncio.nomeanuncio">
			  <v-text-field
				v-model="anuncio['nomeanuncio']"
				:rules="nomeRules"
        required>
        </v-text-field>
		 </div>
		    
      <v-text-field
        v-model="anuncio['descricaoanuncio']"
        :rules="descricaoRules"
        required>
        
        </v-text-field>

        <v-text-field
        v-model="anuncio['telefoneanuncio']"
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
const { mapState } = require("vuex");
const { db, firebaseapp } = require("../components/config");
module.exports = {
  name: "Editar",
  mounted() {
    this.$bindAsObject(
      "anuncio",
      firebaseapp
        .database()
        .ref(`anuncios/${this.userKey}/anuncio/${this.idanuncioanimal}`),
      null,
      _ => {
				this.$set(this.anuncio,{})
				}
    );

    this.$store.commit("setTitle", "Find My Pet - Editar anúncio");
  },
  data() {
    return {
      copy: {},
      anuncio:  {},
      descricaoRules: [
        v => !!v.trim() || "Informe texto do anúncio",
        v => v.length < 600 || "O texto não deve ter mais de 600 caracteres"
      ],
      nomeRules: [
        v => !!v.trim() || "Informe texto da descrição",
        v => v.length < 31 || "O anúncio não deve ter mais de 30 caracteres"
      ],
      telefoneRules: [v => !!v.trim() || "Informe número para contato"],
      userKey: this.$route.params.userkey,
      idanuncioanimal: this.$route.params.idanuncioanimal
    };
  },
  methods: {
    updateAnuncio() {
      this.copy = { ...this.anuncio };
      delete this.copy[".key"];
			console.log(this.copy.descricaoanuncio);
			console.log(this.anuncioNomeAnuncio)
      db
        .ref("anuncios")
        .child(this.userKey)
        .child("/anuncio")
        .child(this.idanuncioanimal)
        .set({
          descricaoanuncio: this.copy.descricaoanuncio,
          imageUrl: this.copy.imageUrl,
          nomeanuncio: this.copy.nomeanuncio,
          telefoneanuncio: this.copy.telefoneanuncio
        })
        .then(_ => {
          console.log("Anuncio editado com sucesso");
          window.location.href = "#/lista";
        })
        .catch(function(error) {
          console.log("Falha: " + error.message);
        });
    },
    formatPhoneNumber() {
      let phoneNumber = this.anuncio.telefoneanuncio;
      phoneNumber = phoneNumber.slice("");
      this.phoneNumber = `(${phoneNumber[0]}${phoneNumber[1]}) ${
        phoneNumber[2]
      } ${phoneNumber[3]}${phoneNumber[4]}${phoneNumber[5]}${phoneNumber[6]}-${
        phoneNumber[7]
      }${phoneNumber[8]}${phoneNumber[9]}${phoneNumber[10]}`;
    },
    goToAuth: function() {
      window.location.href = "#/login";
    }
  },
  computed: mapState(["currentUser"])
};
</script>

<style>
.imgDiv {
  overflow: hidden;
  display: block;
  background: white;
}
.imgDetalhe {
  max-width: 100%;
  max-height: 400px;
}
</style>