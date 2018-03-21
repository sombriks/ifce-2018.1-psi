<template>
  <v-form v-model="valid" @submit.prevent="doSave">
    <v-card>
      <v-container fluid>
        <v-text-field
          label="Digite seu anúncio aqui"
          v-model="anuncio.nomeanuncio"
          :counter="600"
          :rules="nomeRules"
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
</template>

<script>
const { db } = require("../components/config")
module.exports = {
  name: "Novo",
  data: _ => ({
    valid: false,
    anuncio: {
      nomeanuncio: ""
    },
    nomeRules: [
      v => !!v.trim() || "Informe texto do anúncio",
      v => v.length < 600 || "O texto não deve ter mais de 600 caracteres"
    ]
  }),
  created() {
    this.$store.commit("setTitle", "Find My Pet - Novo anúncio")
  },
  methods: {
    doSave() {
      if (this.valid) {
        // https://firebase.google.com/docs/reference/js/firebase.database.Reference#push
        // https://firebase.google.com/docs/reference/js/firebase.database.Reference#set
        // https://firebase.google.com/docs/reference/js/firebase.database.Reference#remove
        db.ref("anuncios").push(this.anuncio).then(_ => {
          console.log(_)
          alert("Anúncio salvo com sucesso!")
          window.location.href = "#/lista"
        })
      }
    }
  }
}
</script>

