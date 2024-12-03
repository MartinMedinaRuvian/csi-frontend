<template>
  <nav class="navbar fixed-top navbar-expand-md" id="navegacion">
    <router-link data-toggle="collapse" data-target=".navbar-collapse.show" class="navbar-brand titulo" to="/"><span
        class="text-white">CSI</span><span class="text-dark">Control</span>
    </router-link>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="icon-Menu"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">

        <li class="nav-item mr-4">
          <h6 class="text-white mt-2">{{ usuario && usuario.rol_id === 1 ? 'Administrador' : 'Usuario' }} {{
            usuario.nombre_completo }}</h6>
        </li>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="grey-darken-3" v-bind="props">
              <v-icon icon="mdi-menu"></v-icon>
              <v-tooltip activator="parent" location="top">Configuración</v-tooltip>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(configuracion, index) in configuraciones" :key="index" :value="index" @click="accionMenu(configuracion)">
              <v-list-item-title>{{ configuracion }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>


      </ul>
    </div>
  </nav>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      configuraciones: ['Usuarios', 'Parámetros', 'Ver Histórico', 'Ver Mapa', 'Cerrar Sesión']
    }
  },
  methods: {
    ...mapActions(['cerrarSesion']),
    accionMenu(opcion) {
      if (opcion === "Usuarios") {
        this.$router.push('/usuarios')
      } else if (opcion === "Parámetros") {
        this.$router.push('/parametros')
      } else if (opcion === "Ver Mapa") {
        this.$router.push('/')
      } else if (opcion === "Ver Histórico") {
        this.$router.push('/logs')
      }else if (opcion === "Cerrar Sesión") {
        this.cerrarSesion()
      }
    }
  },
  computed: {
    ...mapGetters(['usuario'])
  }
}
</script>