<template>
  <div class="mt-5">
    <table class="table table-responsive-md" v-if="usuarios.length > 0">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Nombre Completo</th>
          <th scope="col">Email</th>
          <th scope="col">Tipo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td :class="usuario.estado === 'D' ? 'text-danger' : ''">
            <p>{{ usuario.nombre_completo }}</p>
          </td>
          <td>
            <p>{{ usuario.email }}</p>
          </td>
          <td>
            <p>{{ usuario.rol_id === 1 ? "ADMIN" : "USUARIO" }}</p>
          </td>
          <td>
            <button
              data-placement="top" title="Modificar"
              data-toggle="modal"
              data-target="#modalUsuarioEditar"
              class="btn btn-outline-warning"
              @click="verDatosModal(usuario)"
            >
              <span class="icon-Lapiz"></span>
            </button>
          </td>
          <td>
            <button
              data-placement="top" title="Desactivar"
              class="btn"
              :class="
                usuario.estado === '1'
                  ? 'btn-outline-success'
                  : 'btn-outline-danger'
              "
              @click="desactivar(usuario)"
            >
              <span>{{
                usuario.estado === "1" ? "&#10003;" : "&#x2716;"
              }}</span>
            </button>
          </td>
          <td>
            <button
              data-placement="top" title="Cambiar Clave"
              data-toggle="modal"
              data-target="#modalUsuarioCambiarPassword"
              class="btn btn-outline-danger"
              @click="verDatosModal(usuario)"
            >
              <span>&#128273;</span>
            </button>
          </td>
          <td>
            <button
              data-placement="top" title="Eliminar"
              data-toggle="modal"
              data-target="#modalUsuarioEliminar"
              class="btn btn-outline-danger"
              @click="verDatosModal(usuario)"
            >
              <span class="icon-Papelera"></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center" v-else>
      <h3>Sin usuarios, te invitamos a registrar tu primer usuario 🤗</h3>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="modalUsuarioEditar"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalUsuarioEditar"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Editar Usuario
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="usuario = {}"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <label for="selectEditarUsuario" class="requerido">Seleccione Rol:</label>
              <select
                id="selectEditarUsuario"
                class="form-select form-control"
                aria-label="Default select example"
                v-model="usuario.rol_id"
              >
                <option
                  :value="rol.id"
                  v-for="rol in roles"
                  :key="rol.id"
                  class="text-success"
                >
                  {{ rol.descripcion }}
                </option>
              </select>
              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">Nombre Completo:</label>
                <input
                  type="text"
                  placeholder="Nombre Completo"
                  v-model="usuario.nombre_completo"
                  class="form-control"
                />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="email" class="requerido">Email:</label>
                  <input
                    type="text"
                    placeholder="Email"
                    v-model="usuario.email"
                    class="form-control"
                  />
                </div>
              </div>


              <div class="row">
                <div class="col-md-6 mt-3">
                  <button
                    type="button"
                    class="btn btn-secondary form-control"
                    data-dismiss="modal"
                    @click="usuario = {}"
                  >
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input
                    type="button"
                    class="btn btn-success form-control"
                    value="Actualizar"
                    @click="actualizar()"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Confirmar Eliminar -->
    <div
      class="modal fade"
      id="modalUsuarioEliminar"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalUsuarioEliminar"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              ¿Estás seguro de que deseas eliminar este registro?
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="usuario = {}"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>{{ usuario.nombre_completo }}</h5>
            <div class="row">
              <div class="col-md-6 mt-3">
                <button
                  type="button"
                  class="btn btn-secondary form-control"
                  data-dismiss="modal"
                  @click="usuario = {}"
                >
                  Cancelar
                </button>
              </div>
              <div class="col-md-6 mt-3">
                <input
                  type="button"
                  class="btn btn-danger form-control"
                  value="Eliminar"
                  @click="eliminar(usuario)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Confirmar Cambiar contrasenia -->
    <div
      class="modal fade"
      id="modalUsuarioCambiarPassword"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalUsuarioCambiarPassword"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              ¿Estás seguro de que deseas cambiar la contraseña?
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="usuario = {}"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form group mt-5">
                <div class="form-group">
                  <label for="passwordactual">Contraseña del Super Admin:</label>
                  <div class="input-password">
                    <input
                      id="passwordactual"
                      type="password"
                      placeholder="Contraseña"
                      v-model="usuario.password_super_admin"
                      class="form-control"
                    />
                    <button @click="verContraseniaSuperAdmin()" class="btn btn-outline-success">{{!verPasswordActual ? '&#128065;' : '&#x1F576;'}}</button>
                  </div>
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="nuevapassword">Nueva Contraseña para {{ usuario.nombre_completo }}:</label>
                  <div class="input-password">
                    <input
                      id="nuevapassword"
                      type="password"
                      placeholder="Contraseña"
                      v-model="usuario.password"
                      class="form-control"
                    />
                    <button @click="verContrasenia()" class="btn btn-outline-success">{{!verPassword ? '&#128065;' : '&#x1F576;'}}</button>
                  </div>
                </div>
              </div>
            <div class="row">
              <div class="col-md-6 mt-3">
                <button
                  type="button"
                  class="btn btn-secondary form-control"
                  data-dismiss="modal"
                  @click="usuario = {}"
                >
                  Cancelar
                </button>
              </div>
              <div class="col-md-6 mt-3">
                <input
                  type="button"
                  class="btn btn-success form-control"
                  value="Cambiar"
                  @click="cambiarPassword()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import Mensaje from "@/components/Mensaje.vue";
export default {
  components: {
    Mensaje,
  },
  props: {
    usuarios: [],
  },
  data() {
    return {
      usuario: { rol_id: 1 },
      mensaje: { ver: false },
      roles: [],
      verPassword: false,
      verPasswordActual: false
    };
  },
  created() {
    this.verRoles();
  },
  methods: {
    verContrasenia() {
      this.verPassword = !this.verPassword;
      this.verPassword ? document.getElementById('nuevapassword').type = 'text' : document.getElementById('nuevapassword').type = 'password'
    },
    verContraseniaSuperAdmin() {
      this.verPasswordActual = !this.verPasswordActual;
      this.verPasswordActual ? document.getElementById('passwordactual').type = 'text' : document.getElementById('passwordactual').type = 'password'
    },
    verDatosModal(usuario) {
      this.usuario = { ...usuario };
    },
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    actualizar() {
      this.axios
        .put("usuario", this.usuario)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/usuarios";
            $("#modalUsuarioEditar").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    cambiarPassword() {
      const usuarioAministradorLocalStorage = localStorage.getItem("usuario") || null
      if(usuarioAministradorLocalStorage !== null && usuarioAministradorLocalStorage !== undefined){
        const usuarioAministrador = JSON.parse(usuarioAministradorLocalStorage)
        console.log(usuarioAministrador, 'administrador')
        this.usuario.codigoadministrador = usuarioAministrador.codigo
        console.log(this.usuario, 'usuario')
        this.axios
        .put("usuario/cambiarpassword", this.usuario)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/usuarios";
            $("#modalUsuarioEditar").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
      }
    },
    verRoles() {
      this.axios.get("rol").then((respuesta) => {
        this.roles = respuesta.data;
      });
    },
    desactivar(usuario) {
      const datoEnviar = {
        estado: usuario.estado === "A" ? "D" : "A",
        id: usuario.id,
      };
      this.axios
        .post("usuario/cambiarestado", datoEnviar)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/usuarios";
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    eliminar(usuario) {
      console.log(usuario);
      this.axios
        .delete("usuario/" + usuario.id)
        .then((respuesta) => {
          window.location.href = "/usuarios";
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
  },
};
</script>
<style>
.input-password {
  display: flex;
  align-content: center;
  align-items: center;
}
</style>