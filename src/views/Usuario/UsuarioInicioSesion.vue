<template>
  <div class="text-center container-inicio-sesion">
    <Mensaje :mensaje="mensaje" />
    <h5>
      <span class="color-verde-principal">Iniciar Sesión</span>
    </h5>
    <div class="d-flex justify-content-center align-items-center container">
      <div class="row">
        <form @submit.prevent="iniciarSesion()" class="formulario">
          <div class="form group mt-3">
            <div class="form-group">
              <label for="email">Email:</label>
              <input
                type="email"
                placeholder="Ingrese Email"
                v-model="usuarioLogin.email"
                class="form-control"
              />
            </div>
          </div>
          <div class="form group mt-3">
            <div class="form-group">
              <label for="password">Contraseña:</label>
              <input
                type="password"
                placeholder="Contraseña"
                class="form-control"
                v-model="usuarioLogin.password"
              />
            </div>
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