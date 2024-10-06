<template>
  <div>
    <h3>No tiene acceso, vuelva a ingresar</h3>
    <button class="btn btn-success mt-5" @click="volverIngresar()">Volver a ingresar</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    volverIngresar() {
      this.cerrarSesion()
      location.href = '/'
    },
    methods: {
      ...mapActions(['cerrarSesion'])
    }
  }
}
</script>