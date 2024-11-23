<template>
  <div class="text-center container-inicio-sesion">
    <h5 class="text-success">Recuperar Contraseña</h5>
    <div class="d-flex justify-content-center align-items-center container">
      <div class="row">
        <form @submit.prevent="recuperarContraseña()" class="formulario">
          <div class="form-group mt-3">
            <label for="password">Enviar un correo de recuperación al email:</label>
            <input type="email" placeholder="Ingrese el email" class="form-control" v-model="usuario.email" />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-success">{{ loading ? 'Enviando...' : 'Continuar' }}</button>
          </div>
          <div v-show="loading" class="spinner-border spinner-border text-success" role="status">
          </div>
          <div class="form-group mt-5">
            <a @click="cancelar()" class="btn btn-secondary">Cancelar</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: {},
      loading: false
    };
  },
  methods: {
    recuperarContraseña() {
      const email = this.usuario.email
      this.loading = true
      this.axios
        .get("usuario/enviar-email-password-reset/" + email)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            location.href = '/';
            this.loading = false
          }
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
        });
    },
    cancelar(){
      this.loading = false
      location.href = '/';
    }
  }
};
</script>
