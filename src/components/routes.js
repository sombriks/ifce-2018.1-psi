module.exports = [
  { path: "/adm", component: require("../features/adm.vue") },
  { path: "/cadastro", component: require("../features/cadastro.vue") },
  { path: "/detalhe/:userkey/:idanuncioanimal", component: require("../features/detalhe.vue") },
  { path: "/lista", component: require("../features/lista.vue") },
  { path: "/login", component: require("../features/login.vue") },
  { path: "/novo", component: require("../features/novo.vue") },
  { path: "/perfil/:idamigoanimal", component: require("../features/perfil.vue") },
]