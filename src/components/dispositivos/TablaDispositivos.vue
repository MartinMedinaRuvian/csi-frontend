<template>
  <div class="mt-5">
    <table class="table table-responsive-md" v-if="dispositivos.length > 0">
      <thead class="thead-light">
        <tr>
          <th scope="col">Código Serie</th>
          <th scope="col">Descripción</th>
          <th scope="col">Modelo</th>
          <th scope="col">Marca</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dispositivo in dispositivos" :key="dispositivo.codigo">
          <td :class="dispositivo.estado === '1' ? 'text-danger' : ''">
            <p>{{ dispositivo.codigo_serie }}</p>
          </td>
          <td>
            <p>{{ dispositivo.descripcion }}</p>
          </td>
          <td>
            <p>{{ dispositivo.modelo }}</p>
          </td>
          <td>
            <p>{{ dispositivo.marca }}</p>
          </td>
          <td>
            <button
              class="btn"
              :class="
                dispositivo.estado === '1'
                  ? 'btn-outline-success'
                  : 'btn-outline-danger'
              "
              @click="desactivar(dispositivo)"
            >
              <span>{{
                dispositivo.estado === "1" ? "&#10003;" : "&#x2716;"
              }}</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center" v-else>
      <h3>
        Sin dispositivos, te invitamos a registrar tu primer dispositivo 🤗
      </h3>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="modaldispositivoEditar"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modaldispositivoEditar"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Editar dispositivo
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="dispositivo = {}"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form group">
                <label for="nombrecompleto">Nombre completo:</label>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  v-model="dispositivo.nombre_completo"
                  class="form-control"
                />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="dispositivo">dispositivo:</label>
                  <input
                    type="text"
                    placeholder="dispositivo:"
                    v-model="dispositivo.dispositivo"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="identificacion">Identificación:</label>
                  <input
                    type="text"
                    placeholder="Identificación"
                    v-model="dispositivo.identificacion"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="numerotelefono">Numero telefono:</label>
                  <input
                    type="text"
                    placeholder="Numero telefono"
                    v-model="dispositivo.telefono"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="dispositivo">Ciudad:</label>
                  <input
                    type="text"
                    placeholder="Ciudad"
                    v-model="dispositivo.ciudad"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="dispositivo">Dirección:</label>
                  <input
                    type="text"
                    placeholder="Dirección"
                    v-model="dispositivo.direccion"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="dispositivo">Email:</label>
                  <input
                    type="text"
                    placeholder="Email"
                    v-model="dispositivo.email"
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
                    @click="dispositivo = {}"
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
      id="modaldispositivoEliminar"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modaldispositivoEliminar"
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
              @click="dispositivo = {}"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>{{ dispositivo.nombre_completo }}</h5>
            <div class="row">
              <div class="col-md-6 mt-3">
                <button
                  type="button"
                  class="btn btn-secondary form-control"
                  data-dismiss="modal"
                  @click="dispositivo = {}"
                >
                  Cancelar
                </button>
              </div>
              <div class="col-md-6 mt-3">
                <input
                  type="button"
                  class="btn btn-danger form-control"
                  value="Eliminar"
                  @click="eliminar(dispositivo)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Actualizar dispositivo -->
    <div
      class="modal fade"
      id="modalActualizardispositivo"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalActualizardispositivo"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              dispositivo {{ dispositivo.numero }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="cliente = {}"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form group mt-3">
              <div class="form-group">
                <label for="password">Identificación Cliente:</label>
                <div class="input-password">
                  <input
                    placeholder="Identificación Existente"
                    v-model="clientedispositivoGuardar.identificacion"
                    @keypress.enter="verClientedispositivoGuardar()"
                    class="form-control"
                  />
                  <button
                    @click="verClientedispositivoGuardar()"
                    class="btn btn-outline-success"
                  >
                    &#128269;
                  </button>
                </div>
              </div>
            </div>
            <div class="form-group">
              <h5>
                <b>{{ clientedispositivoGuardar.nombre_completo }}</b>
              </h5>
            </div>
            <div class="row">
              <div class="col-md-6 mt-3">
                <button
                  type="button"
                  class="btn btn-secondary form-control"
                  data-dismiss="modal"
                >
                  Cancelar
                </button>
              </div>
              <div class="col-md-6 mt-3">
                <input
                  type="button"
                  :disabled="
                    clientedispositivoGuardar.nombre_completo.length <= 0
                  "
                  class="btn btn-success form-control"
                  value="Actualizar"
                  @click="actualizardispositivo()"
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
export default {
  props: {
    dispositivos: [],
  },
  data() {
    return {
      dispositivo: {},
      clientedispositivoGuardar: {
        identificacion: "",
        nombre_completo: "",
      },
    };
  },
  methods: {
    verDatosModal(dispositivo) {
      this.dispositivo = { ...dispositivo };
    },
    actualizar() {
      this.axios
        .put("dispositivo", this.dispositivo)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/dispositivos";
            $("#modaldispositivoEditar").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    desactivar(dispositivo) {
      const datoEnviar = {
        estado: dispositivo.estado === "1" ? "0" : "1",
        codigo: dispositivo.codigo,
      };
      this.axios
        .post("dispositivo/cambiarestado", datoEnviar)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/dispositivos";
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    eliminar(dispositivo) {
      console.log(dispositivo);
      this.axios
        .delete("dispositivo/" + dispositivo.numero)
        .then((respuesta) => {
          window.location.href = "/dispositivos";
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verClientedispositivoGuardar() {
      const identificacionCliente =
        this.clientedispositivoGuardar.identificacion;
      if (identificacionCliente.length > 1) {
        this.axios
          .get("cliente/infoporidentificacion/" + identificacionCliente)
          .then((respuesta) => {
            const clientes = respuesta.data;
            if (clientes.length > 0) {
              this.clientedispositivoGuardar.identificacion =
                clientes[0].identificacion;
              this.clientedispositivoGuardar.nombre_completo =
                clientes[0].nombre_completo;
              this.clientedispositivoGuardar.codigo = clientes[0].codigo;
            }
          })
          .catch((error) => {
            alert(error.response.data);
            this.clientedispositivoGuardar.nombre_completo = "";
          });
      }
    },
    actualizardispositivo() {
      const datosGuardar = {
        numero: this.dispositivo.numero,
        identificacion: this.clientedispositivoGuardar.identificacion,
        cliente_codigo: this.clientedispositivoGuardar.codigo,
      };
      this.axios
        .put("dispositivo/actualizarcliente", datosGuardar)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/dispositivos";
            $("#modalActualizardispositivo").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
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
</style>