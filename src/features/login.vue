<template>
  <div ref="authui">
    <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/2.6.3/firebaseui.css" />
  </div>
</template>
<script>
const firebase = require("firebase")
const firebaseui = require("firebaseui")
const { firebaseapp } = require("../components/config")
module.exports = {
  name: "Login",
  mounted() {
    new firebaseui.auth.AuthUI(firebaseapp.auth()).start(this.$refs["authui"], {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
    })
  }
}
</script>
    

