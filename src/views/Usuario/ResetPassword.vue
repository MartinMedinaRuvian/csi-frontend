<template>
  <div class="background-image"></div>
  <div class="text-center container-inicio-sesion">
    <Mensaje :mensaje="mensaje" />
    <h5 class="text-white">Cambiar Contraseña</h5>
    <div class="d-flex justify-content-center align-items-center container">
      <div class="row">
        <form @submit.prevent="cambiarContraseña()" class="formulario">
          <div class="form-group mt-3 text-white">
            <label for="password"><b>Nueva Contraseña:</b></label>
            <input type="password" placeholder="Contraseña" class="form-control" v-model="usuario.password" />
          </div>
          <div class="form-group mt-3 text-white">
            <label for="confirmar_password"><b>Confirmar Nueva Contraseña:</b></label>
            <input type="password" placeholder="Contraseña" class="form-control" v-model="usuario.confirmar_password" />
          </div>
          <div class="form-group text-white">
            <button type="submit" class="btn btn-success">Continuar</button>
          </div>
          <div class="form-group text-white">
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
    },
    cancelar() {
      location.href = '/';
    }
  }
};
</script>
<style scoped>
.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/fondo_ufps.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
}
</style>