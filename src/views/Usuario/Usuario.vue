<template>
  <div class="text-center">
    <h3 class="text-success mb-4 titulo-principal">Usuarios</h3>
    <button type="button" class="btn btn-success text-white" data-toggle="modal" data-target="#modalUsuario">
      Guardar un nuevo Usuario
    </button>

    <!-- Modal -->
    <div class="modal fade" id="modalUsuario" tabindex="-1" role="dialog" aria-labelledby="modalUsuario"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Guardar Usuario
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
              @click="usuario = { rol_id: 1 }">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <label for="select" class="requerido">Seleccione Rol:</label>
              <select id="select" class="form-select form-control" aria-label="Default select example"
                v-model="usuario.rol_id">
                <option :value="rol.id" v-for="rol in roles" :key="rol.id" class="text-success">
                  {{ rol.descripcion }}
                </option>
              </select>
              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">Nombre Completo:</label>
                <input type="text" placeholder="Nombre Completo" v-model="usuario.nombre_completo"
                  class="form-control" />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="email" class="requerido">Email:</label>
                  <input type="text" placeholder="Email" v-model="usuario.email" class="form-control" />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="password" class="requerido">Contraseña:</label>
                  <div class="input-password">
                    <input id="password" type="password" placeholder="Contraseña" v-model="usuario.password"
                      class="form-control" />
                    <button @click="verContrasenia()" class="btn btn-outline-success">
                      {{ !verPassword ? "&#128065;" : "&#x1F576;" }}
                    </button>
                  </div>
                </div>
              </div>

              <div class="form group mt-3"></div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                    @click="usuario = { rol_id: 1 }">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-success form-control" value="Guardar" @click="guardarUsuario()" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="form-group col-md-6">
        <label for="select">Filtro:</label>
        <select id="select" class="form-select form-control" aria-label="Default select example" v-model="condicion">
          <option :value="condicion.valor" v-for="condicion in condiciones" :key="condicion.valor" class="text-success">
            {{ condicion.descripcion }}
          </option>
        </select>
      </div>
      <div class="form-group col-md-6">
        <label for="select">Buscar:</label>
        <div class="input-buscar">
          <input placeholder="Ingrese el dato a buscar" class="form-control" type="text" v-model="buscar"
            @keypress.enter="verUsuarios()" />
          <button class="btn btn-success" @click="verUsuarios()">
            &#128269;
            <v-tooltip activator="parent" location="top">Ver</v-tooltip>
          </button>
        </div>
      </div>
    </div>
    <TablaUsuarios :usuarios="usuarios" />
  </div>
</template>
<script>
import TablaUsuarios from "@/components/usuarios/TablaUsuario";
import Mensaje from "@/components/Mensaje.vue";
export default {
  components: { Mensaje },
  data() {
    return {
      usuario: { rol_id: 1 },
      usuarios: [],
      mensaje: { ver: false },
      roles: [],
      verPassword: false,
      condiciones: [
        { descripcion: "NOMBRE", valor: "nombre_completo" },
        { descripcion: "EMAIL", valor: "email" },
        { descripcion: "ESTADO", valor: "estado" },
        { descripcion: "ID ROL", valor: "rol_id" }
      ],
      condicion: "nombre_completo",
      buscar: "",
    };
  },
  created() {
    this.verRoles();
    this.verUsuarios();
  },
  methods: {
    verContrasenia() {
      this.verPassword = !this.verPassword;
      this.verPassword
        ? (document.getElementById("password").type = "text")
        : (document.getElementById("password").type = "password");
    },
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    guardarUsuario() {
      this.axios
        .post("usuario", this.usuario)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.$router.push('/usuarios')
            window.location.href = "/usuarios";
            $("#modalUsuario").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verUsuarios() {
      const buscarPor = {
        condicion: this.condicion,
        buscar: this.buscar,
      };
      this.axios.post("usuario/buscarfiltrado", buscarPor).then((respuesta) => {
        if (respuesta.status === 200) {
          this.usuarios = respuesta.data;
        }
      });
    },
    verRoles() {
      this.axios.get("rol").then((respuesta) => {
        this.roles = respuesta.data;
      });
    },
  },
  components: {
    TablaUsuarios,
  },
};
</script>
<style>
.input-password,
.input-buscar {
  display: flex;
  align-content: center;
  align-items: center;
}

.requerido::before {
  content: "* ";
  /* Agrega el asterisco */
  color: red;
  /* Asterisco de color rojo */
  font-weight: bold;
  /* Opcional, para darle más énfasis */
}
</style>