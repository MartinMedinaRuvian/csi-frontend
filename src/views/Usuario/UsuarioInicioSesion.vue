<template>
    <div class="background-image">  
  </div>
  <div class="text-center container-inicio-sesion">
    <Mensaje :mensaje="mensaje" />
    <div class="d-flex justify-content-center align-items-center container">
      <div class="row">
        <form @submit.prevent="iniciarSesion()" class="formulario">
          <h6>
            <span class="text-white">Iniciar Sesión</span>
          </h6>
          <div class="form group mt-3 text-white">
            <div class="form-group">
              <label for="email"><b>Email:</b></label>
              <input type="email" placeholder="Ingrese Email" v-model="usuarioLogin.email" class="form-control" />
            </div>
          </div>
          <div class="form group mt-3 text-white">
            <div class="form-group">
              <label for="password"><b>Contraseña:</b></label>
              <input type="password" placeholder="Contraseña" class="form-control" v-model="usuarioLogin.password" />
            </div>
          </div>
          <div class="form-group text-white">
            <button type="submit" class="btn btn-success mb-3">Ingresar</button>
          </div>
          <div class="container-recuperar_password mt-5">
            <a class="text-white" href="/recuperar-password"><b>Olvide mi contraseña</b></a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Mensaje from "@/components/Mensaje";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      usuarioLogin: {},
      mensaje: { ver: false },
    };
  },
  created() {
    this.verificarIngresoMenuSegunTipoUsuario();
  },
  methods: {
    ...mapActions(["guardarUsuario", "guardarInfo", "cerrarSesion"]),
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    iniciarSesion() {
      this.axios
        .post("usuario/ingresar", this.usuarioLogin)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            const usuario = respuesta.data;
            this.guardarUsuario(usuario);
            this.verificarIngresoMenuSegunTipoUsuario();
          }
        })
        .catch((error) => {
          console.log(error, error);
          this.crearMensaje(error.response.data, "danger");
        });
    },
    verificarIngresoMenuSegunTipoUsuario() {
      if (this.usuario !== null && this.usuario.rol_id == 1) {
        this.$router.push({ name: "MenuAdministrador" });
      } else if (this.usuario !== null && this.usuario.rol_id == 2) {
        this.$router.push({ name: "MenuAdministrador" });
      }
    },
  },
  components: {
    Mensaje,
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
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
.container-recuperar_password a {
  font-size: 18px;
}
</style>