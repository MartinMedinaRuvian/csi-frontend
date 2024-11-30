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

       

        <li class="nav-item ml-4">
         <h6 class="text-white mt-2">{{  usuario && usuario.rol_id === 1 ? 'Administrador' : 'Usuario' }} {{ usuario.nombre_completo }}</h6>
        </li>


        <li class="nav-item ml-4">
          <button @click="cerrarSesion" data-toggle="collapse" data-target=".navbar-collapse.show"
            class="btn btn-outline-light">Cerrar sesión</button>
        </li>

      </ul>
    </div>
  </nav>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions(['cerrarSesion'])
  },
  computed:{
    ...mapGetters(['usuario'])
  }
}
</script>