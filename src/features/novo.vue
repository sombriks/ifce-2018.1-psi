<template>
  <v-form v-model="valid" @submit.prevent="doSave">
  <v-dialog v-model="loading" persistent fullscreen content-class="loading-dialog">
        <v-container fill-height>
          <v-layout row justify-center align-center>
            <v-progress-circular indeterminate :size="100" :width="7" color="yellow"></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    <v-card>
      <v-container fluid>
        <v-text-field
          label="Digite seu anúncio aqui"
          v-model="anuncio.nomeanuncio"
          :counter="30"
          :rules="nomeRules"
          required
        ></v-text-field>
        <v-text-field
          label="Telefone para contato aqui"
          v-model="anuncio.telefoneanuncio"
          :counter="11"
          :rules="telefoneRules"
          required
          mask="(##) # ####.####"
        ></v-text-field>
        <v-text-field
          label="Descrição do seu anúncio aqui"
          v-model="anuncio.descricaoanuncio"
          :counter="600"
          :rules="descricaoRules"
          required
          multi-line
        ></v-text-field>
        <v-layout>
          <v-checkbox v-model="enabled" hide-details class="shrink mr-2"></v-checkbox>
          <v-text-field v-model="anuncio.recompensa" prefix="R$" placeholder="Valor da recompensa" :disabled="!enabled"></v-text-field>
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
        <v-btn :disabled="!valid || !this.validPhoto" flat color="orange" type="submit">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
const { mapState } = require("vuex")
 const { firebaseapp } = require("../components/config")
const { firebase,db } = require("../components/config")
module.exports = {
  name: "Novo",
  data: _ => ({

    dialog: false,
    loading: false,
    sound: true,
    widgets: false,

    enabled: false,
    valid: false,
    validPhoto: false,
    anuncio: {
      nomeanuncio: "",
      descricaoanuncio: "",
      telefoneanuncio: "",
      recompensa: null,
      fotos:[]
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
    imageUrl: "",
    image: null
  }),
  created() {
    this.$store.commit("setTitle", "Find My Pet - Novo anúncio")
  },
  methods: {
    doSave() {
      this.loading = true 
      let key = ""
      if (this.valid) {
        // https://firebase.google.com/docs/reference/js/firebase.database.Reference#push
        // https://firebase.google.com/docs/reference/js/firebase.database.Reference#set
        // https://firebase.google.com/docs/reference/js/firebase.database.Reference#remove
        db.ref("anuncios").child(this.currentUser.uid).child('anuncio').push(this.anuncio).then(data => {
          key = data.key 
          return key
        }).then(key => {
          const filename = this.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('cachorros/'+key+'.'+ext).put(this.image)
        }).then(fileData=> {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('anuncios').child(this.currentUser.uid).child('anuncio').child(key).update({imageUrl: imageUrl})
        }).then(_ => {  
           window.location.href = "#/lista"
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
      this.validPhoto = true
    }
  },
  computed: mapState(["currentUser"]),
}
</script>

