<template>
  <v-form v-model="valid" @submit.prevent="doSave">
    <v-card>
      <v-container fluid>
        <v-text-field
          label="Digite seu anúncio aqui"
          v-model="anuncio.nomeanuncio"
          :counter="20"
          :rules="nomeRules"
          required
          multi-line
        ></v-text-field>
         <v-text-field
          label="Descrição do seu anúncio aqui"
          v-model="anuncio.descricaoanuncio"
          :counter="600"
          :rules="descricaoRules"
          required
          multi-line
        ></v-text-field>
        <v-layout align-center>
          <v-checkbox v-model="enabled" hide-details class="shrink mr-2"></v-checkbox>
          <v-text-field v-model="anuncio.recompensa" :mask="mask" label="Valor da recompensa" :disabled="!enabled"></v-text-field>
        </v-layout>
        </v-container>
        <!-- input para carregar files -->
        <v-btn raised class="warning" @click="onPickFile">Carregar uma foto</v-btn>
          <input 
            type="file" 
            style="display:none" 
            ref="fileInput" 
            accept="image/*"
            @change="onFilePicked"
            >
        <v-flex lg12>
          <img :src="imageUrl" height="150">
        </v-flex>
        <!-- botao para confimar adicionar -->
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!valid" flat color="orange" type="submit">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
const { firebase,db } = require("../components/config")
module.exports = {
  name: "Novo",
  data: _ => ({
    mask: 'R$ ###,##',
    value: '100',
    enabled: false,
    valid: false,
    anuncio: {
      nomeanuncio: "",
      descricaoanuncio: "",
      recompensa: null,
      fotos:[]
    },
    descricaoRules: [
      v => !!v.trim() || "Informe texto do anúncio",
      v => v.length < 600 || "O texto não deve ter mais de 600 caracteres"
    ],
    nomeRules: [
      v => !!v.trim() || "Informe texto da descrição",
      v => v.length < 20 || "O anúncio não deve ter mais de 20 caracteres"
    ],
    imageUrl: "",
    image: null
  }),
  created() {
    this.$store.commit("setTitle", "Find My Pet - Novo anúncio")
  },
  methods: {
    doSave() {
      let key = ""
      if (this.valid) {
        // https://firebase.google.com/docs/reference/js/firebase.database.Reference#push
        // https://firebase.google.com/docs/reference/js/firebase.database.Reference#set
        // https://firebase.google.com/docs/reference/js/firebase.database.Reference#remove
        db.ref("anuncios").push(this.anuncio).then(data => {
          key = data.key 
          return key
        }).then(key => {
          const filename = this.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('anuncios/'+key+'.'+ext).put(this.image)
        }).then(fileData=> {
          console.log(fileData)
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('anuncios').child(key).child('fotos').update({image: imageUrl})
        })
      }
    },
    onPickFile(){
      this.$refs.fileInput.click()
    },
    onFilePicked(event){
      const files = event.target.files
      let filename = files[0].name
      if(filename.lastIndexOf('.') <= 0){
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load',()=>{
        console.log(fileReader.result)
        this.imageUrl = fileReader.result;
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>

