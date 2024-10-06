<template>
  <div>
    <div class="modal-content">
      <div class="modal-header bg-success">
        <h5 class="modal-title" id="exampleModalLongTitle">
          Guardar Reparación
        </h5>
      </div>
      <div class="modal-body">
        <form @submit.prevent>
          <div class="form group">
            <label for="nombrecompleto">Reporte Técnico:</label>
            <textarea
              type="text"
              placeholder="Reporte Técnico"
              v-model="reparacion.reporte_tecnico"
              class="form-control"
            />
          </div>

          <div class="form group mt-3">
            <div class="form-group">
              <label for="identificacion">Reporte Final:</label>
              <textarea
                type="text"
                placeholder="Reporte Final"
                v-model="reparacion.reporte_final"
                class="form-control"
              />
            </div>
          </div>

          <v-row>
            <v-col>
              <v-autocomplete
                label="Cliente"
                v-model="reparacion.cliente_codigo"
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
                v-model="reparacion.dispositivo_codigo"
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

          <v-row>
            <v-col>
              <div class="form group mt-5">
                <label for="stock">Valor $:</label>
                <input
                  type="text"
                  placeholder="valor $"
                  v-model="reparacion.valor"
                  class="form-control"
                />
              </div>
            </v-col>

            <v-col>
              <div class="form-group col-md-12 mt-5">
                <label for="select">Forma de Pago:</label>
                <select
                  id="select"
                  class="form-select form-control"
                  aria-label="Default select example"
                  v-model="reparacion.forma_pago"
                >
                  <option
                    :value="forma"
                    v-for="forma in formasPago"
                    :key="forma"
                    class="text-success"
                  >
                    {{ forma }}
                  </option>
                </select>
              </div>
            </v-col>

            <v-col>
              <div class="form-group mt-5">
                <label for="select">¿Pago Completo?</label>
                <select
                  id="select"
                  class="form-select form-control"
                  aria-label="Default select example"
                  v-model="reparacion.pago_completo"
                >
                  <option
                    :value="buscar.valor"
                    v-for="buscar in opcionesPagoCompleto"
                    :key="buscar.valor"
                    class="text-success"
                  >
                    {{ buscar.descripcion }}
                  </option>
                </select>
              </div>
            </v-col>
          </v-row>

          <div class="mt-5 float-right">
            <v-btn color="success" @click="guardarreparacion()">
              Guardar
            </v-btn>
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
    <div
      class="modal fade"
      id="modalGuardarProducto"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalGuardarProducto"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Guardar Producto
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="producto = {}"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form group">
                <label for="descripcion">Descripción:</label>
                <input
                  type="text"
                  placeholder="Descripción"
                  v-model="producto.descripcion"
                  class="form-control"
                />
              </div>

              <div class="form group mt-3">
                <label for="descripcion">Código Serie:</label>
                <input
                  type="text"
                  placeholder="Código Serie"
                  v-model="producto.codigo_serie"
                  class="form-control"
                />
              </div>

              <div class="form group mt-3">
                <label for="stock">Stock:</label>
                <input
                  type="text"
                  placeholder="Stock"
                  v-model="producto.stock"
                  class="form-control"
                />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="precioUnidad">Precio:</label>
                  <input
                    type="number"
                    placeholder="Precio"
                    v-model="producto.precio"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="costo">Costo:</label>
                  <input
                    type="number"
                    placeholder="Costo"
                    v-model="producto.costo"
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
                    @click="producto = {}"
                  >
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input
                    type="button"
                    class="btn btn-success form-control"
                    value="Guardar"
                    @click="guardarProducto()"
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
      reparacion: { pago_completo: "0", forma_pago: "EFECTIVO" },
      mensaje: { ver: false },
      clientes: [],
      dispositivos: [],
      cliente: {},
      dispositivo: {},
      producto: {},
      opcionesPagoCompleto: [
        { descripcion: "SI", valor: "0" },
        { descripcion: "NO", valor: "1" },
      ],
      formasPago: ["EFECTIVO", "TRANSFERENCIA"],
    };
  },
  created() {
    this.verClientes();
    this.verDispositivos();
    this.verificarReparacionDesdeEntrada();
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    verificarReparacionDesdeEntrada() {
      const registroString = this.$route.query.registro;
      if (registroString !== null && registroString !== undefined) {
        const registroObjeto = JSON.parse(registroString);
        console.log(registroObjeto);
        this.reparacion = registroObjeto;
      }
    },
    guardardispositivo() {
      this.axios
        .post("dispositivo", this.dispositivo)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.verDispositivos();
            this.reparacion.dispositivo_codigo = respuesta.data.codigo;
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
            this.reparacion.cliente_codigo = respuesta.data.codigo;
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
    guardarreparacion() {
      this.reparacion.usuario_codigo = this.usuario.codigo;
      this.axios
        .post("reparacion", this.reparacion)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            //window.location.href = "/reparaciones";
            this.$router.push('/reparaciones')
            $("#modalGuardarreparacion").modal("hide");
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
      this.axios.get("dispositivo").then((respuesta) => {
        this.dispositivos = respuesta.data;
      });
    },
  },
};
</script>