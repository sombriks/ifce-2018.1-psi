<template>
  <div>
    Lista
  </div>
  
</template>

<script>
const { db } = require("../components/config")
module.exports = {
  name: "Lista",
  firebase: {
    anuncios: db.ref("anuncios")
  }
}
</script>

