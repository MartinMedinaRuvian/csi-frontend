<template>
  <div class="text-center">
    <h3>Tu sesión ha expirado o no cuentas con los permisos necesarios.</h3>
    <h3>Por favor inicia sesión</h3>
    <button class="btn btn-success mt-3" @click="volverIngresar()">Iniciar sesión</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['cerrarSesion']),
    volverIngresar() {
      this.cerrarSesion()
      location.href = '/'
    }
  }
}
</script>