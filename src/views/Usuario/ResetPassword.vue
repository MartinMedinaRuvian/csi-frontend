<template>
  <div class="text-center container-inicio-sesion">
    <Mensaje :mensaje="mensaje" />
    <h5 class="text-success">Cambiar Contraseña</h5>
    <div class="d-flex justify-content-center align-items-center container">
      <div class="row">
        <form @submit.prevent="cambiarContraseña()" class="formulario">
          <div class="form-group mt-3">
            <label for="password">Nueva Contraseña:</label>
            <input
              type="password"
              placeholder="Contraseña"
              class="form-control"
              v-model="usuario.password"
            />
          </div>
          <div class="form-group mt-3">
            <label for="confirmar_password">Confirmar Nueva Contraseña:</label>
            <input
              type="password"
              placeholder="Contraseña"
              class="form-control"
              v-model="usuario.confirmar_password"
            />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-success">Continuar</button>
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
      usuario: {
        password: '',
        confirmar_password: ''
      },
      mensaje: { ver: false },
      token: ''
    };
  },
  mounted() {
    // Obtener el token directamente del query string
    this.token = this.$route.query.token;
  },
  methods: {
    cambiarContraseña() {
      if (this.usuario.password === this.usuario.confirmar_password) {
        const infoEnviar = {
          newPassword: this.usuario.password,
          token: this.token
        };
        console.log(infoEnviar.token)
        // Enviar solicitud POST
        this.axios
          .post("usuario/reset-password", infoEnviar)
          .then((respuesta) => {
            if (respuesta.status === 200) {
              location.href = '/';
            }
          })
          .catch((error) => {
            console.error('Error al enviar el formulario:', error);
          });
      } else {
        alert('Las contraseñas no coinciden.');
      }
    }
  }
};
</script>
