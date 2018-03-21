<template>
  <v-form v-model="valid" @submit.prevent="doSave">
    <v-card>
      <v-container fluid>
        <v-text-field
          label="Digite seu anúncio aqui"
          v-model="anuncio.nomeanuncio"
          :counter="300"
          required
          multi-line
        ></v-text-field>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="orange" type="submit">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
const { db } = require("../components/config")
module.exports = {
  name: "Novo",
  data: _ => ({
    anuncio: {
      nomeanuncio: ""
    }
  }),
  created() {
    this.$store.commit("setTitle", "Find My Pet - Novo anúncio")
  },
  methods: {
    doSave() {
      db.ref("anuncios").push(this.anuncio).then(_ => {
        console.log(_)
        alert("Anúncio salvo com sucesso!")
        window.location.href = "#/lista"
      })
    }
  }
}
</script>

