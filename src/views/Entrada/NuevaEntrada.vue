<template>
  <div>
    <div class="modal-content">
      <div class="modal-header bg-success">
        <h5 class="modal-title" id="exampleModalLongTitle">Guardar Entrada</h5>
      </div>
      <div class="modal-body">
        <form @submit.prevent>
          <div class="form group">
            <label for="nombrecompleto">Descripción / Daño:</label>
            <textarea
              type="text"
              placeholder="Descripción / Daño"
              v-model="entrada.descripcion"
              class="form-control"
            />
          </div>

          <div class="form group mt-3">
            <div class="form-group">
              <label for="identificacion">Observación / Nota:</label>
              <textarea
                type="text"
                placeholder="Observación / Nota"
                v-model="entrada.observacion"
                class="form-control"
              />
            </div>
          </div>

          <v-row>
            <v-col>
              <v-autocomplete
                label="Cliente"
                v-model="entrada.cliente_codigo"
                :items="clientes"
                :item-title="titulosAutocompleteClientes"
                item-value="codigo"
                :filter="filterAutocompleteClientes"
              ></v-autocomplete>
              <div class="float-left">
                <v-btn
                  color="success"
                  data-toggle="modal"
                  data-target="#modalGuardarCliente"
                >
                  Nuevo Cliente
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-autocomplete
                label="Dispositivo"
                v-model="entrada.dispositivo_codigo"
                :items="dispositivos"
                :item-title="titulosAutocompleteDispositivos"
                item-value="codigo"
                :filter="filterAutocompleteDispositivos"
              ></v-autocomplete>
              <div class="float-left">
                <v-btn
                  color="success"
                  data-toggle="modal"
                  data-target="#modalGuardarDispositivo"
                >
                  Nuevo Dispositivo
                </v-btn>
              </div>
            </v-col>
          </v-row>

          <div class="mt-5 float-right">
            <v-btn color="success" @click="guardarentrada()"> Guardar </v-btn>
          </div>
        </form>
      </div>
    </div>
    <div
      class="modal fade"
      id="modalGuardarCliente"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalGuardarCliente"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Guardar Cliente
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
            <form @submit.prevent>
              <div class="form group">
                <label for="nombrecompleto">Nombre completo:</label>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  v-model="cliente.nombre_completo"
                  class="form-control"
                />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="identificacion">Identificación:</label>
                  <input
                    type="text"
                    placeholder="Identificación"
                    v-model="cliente.identificacion"
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
                    v-model="cliente.telefono"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="placa">Dirección:</label>
                  <input
                    type="text"
                    placeholder="Dirección"
                    v-model="cliente.direccion"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="placa">Email:</label>
                  <input
                    type="text"
                    placeholder="Email"
                    v-model="cliente.email"
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
                    @click="cliente = {}"
                  >
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input
                    type="button"
                    class="btn btn-success form-control"
                    value="Guardar"
                    @click="guardarCliente()"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="modalGuardarDispositivo"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalGuardarDispositivo"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Guardar Dispositivo
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
            <form @submit.prevent>
              <div class="form group">
                <label for="numero_serie">Códito Serie:</label>
                <input
                  type="text"
                  placeholder="Código Serie"
                  v-model="dispositivo.codigo_serie"
                  class="form-control"
                />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="descripcion">Artículo / Descripción:</label>
                  <input
                    type="text"
                    placeholder="Artículo / Descripción"
                    v-model="dispositivo.descripcion"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="descripcion">Modelo:</label>
                  <input
                    type="text"
                    placeholder="Modelo"
                    v-model="dispositivo.modelo"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="Marca">Marca:</label>
                  <input
                    type="text"
                    placeholder="Descripción"
                    v-model="dispositivo.marca"
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
                    value="Guardar"
                    @click="guardardispositivo()"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Mensaje from "@/components/Mensaje.vue";
export default {
  components: { Mensaje },
  data() {
    return {
      entrada: {},
      mensaje: { ver: false },
      clientes: [],
      dispositivos: [],
      cliente: {},
      dispositivo: {},
    };
  },
  created() {
    this.verClientes();
    this.verDispositivos();
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    guardardispositivo() {
      this.axios
        .post("dispositivo", this.dispositivo)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.verDispositivos();
            this.entrada.dispositivo_codigo = respuesta.data.codigo;
            $("#modalGuardarDispositivo").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    guardarCliente() {
      this.axios
        .post("cliente", this.cliente)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.verClientes();
            this.entrada.cliente_codigo = respuesta.data.codigo;
            $("#modalGuardarCliente").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    titulosAutocompleteClientes(item) {
      return `${item.nombre_completo} - C.C. ${item.identificacion}`;
    },
    filterAutocompleteClientes(item, queryText, itemText) {
      return (
        item.nombre_completo
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1 ||
        item.identificacion
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1
      );
    },
    titulosAutocompleteDispositivos(item) {
      return `${item.descripcion} - S/N: ${item.codigo_serie} - ${item.modelo}`;
    },
    filterAutocompleteDispositivos(item, queryText, itemText) {
      return (
        item.descripcion
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1 ||
        item.codigo_serie
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1 ||
        item.modelo.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
          -1
      );
    },
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    guardarentrada() {
      this.axios
        .post("entrada", this.entrada)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.$router.push('/entradas')
            //window.location.href = "/entradas";
            $("#modalGuardarentrada").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verClientes() {
      this.axios.get("cliente").then((respuesta) => {
        this.clientes = respuesta.data;
      });
    },
    verDispositivos() {
      this.entrada.usuario_codigo = this.usuario.codigo;
      this.axios.get("dispositivo").then((respuesta) => {
        this.dispositivos = respuesta.data;
      });
    },
  },
};
</script>