<template>
  <nav class="navbar fixed-top navbar-expand-md" id="navegacion">
    <router-link data-toggle="collapse" data-target=".navbar-collapse.show" class="navbar-brand titulo" to="/"><span
        class="text-dark">CSI</span><span class="color-verde-principal">Control</span></router-link>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="icon-Menu"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">

        <li class="nav-item ml-4">
          <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/"
            class="text-dark">Edificios</router-link>
        </li>

        <li class="nav-item ml-4">
          <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/usuarios"
            class="text-dark">Usuarios</router-link>
        </li>

        <li class="nav-item ml-4">
          <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/parametros"
            class="text-dark">Parámetros</router-link>
        </li>


        <li class="nav-item ml-4">
          <button @click="cerrarSesion" data-toggle="collapse" data-target=".navbar-collapse.show"
            class="btn btn-outline-success">Cerrar sesión</button>
        </li>

      </ul>
    </div>
  </nav>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['cerrarSesion'])
  }
}
</script>