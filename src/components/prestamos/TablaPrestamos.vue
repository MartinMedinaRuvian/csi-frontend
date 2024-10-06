<template>
  <div class="mt-5">
    <table class="table table-responsive-md" v-if="prestamos.length > 0">
      <thead class="thead-light">
        <tr>
          <th scope="col">Número</th>
          <th scope="col">Recibido por - Observación</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Cliente</th>
          <th scope="col">Producto</th>
          <th scope="col">Precio</th>
          <th scope="col">Precio Técnico</th>
          <th scope="col">Fecha</th>
          <th scope="col">Hora</th>
          <th scope="col">Usuario</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prestamo in prestamos" :key="prestamo.codigo">
          <td :class="prestamo.estado === '1' ? 'text-danger' : ''">
            <p>{{ prestamo.codigo }}</p>
          </td>
          <td>
            <p>
              {{
                prestamo.observacion === null
                  ? "Sin observación"
                  : prestamo.observacion
              }}
            </p>
          </td>
          <td>
            <p>{{ prestamo.cantidad }}</p>
          </td>
          <td>
            <p>{{ prestamo.cliente }}</p>
          </td>
          <td>
            <p>{{ prestamo.producto }}</p>
          </td>
          <td>
            <p>{{ verFormatoMoneda(prestamo.precio_producto) }}</p>
          </td>
          <td>
            <p>{{ verFormatoMoneda(prestamo.costo_producto) }}</p>
          </td>
          <td>
            <p>{{ formatearFecha(prestamo.fecha) }}</p>
          </td>
          <td>
            <p>{{ prestamo.hora }}</p>
          </td>
          <td>
            <p>{{ prestamo.usuario }}</p>
          </td>
          <td>
            <button
              class="btn btn-outline-info"
              data-toggle="modal"
              data-target="#modalConfirmacionPrecio"
              @click="verDatosModal(prestamo, 'whatsapp')"
            >
              <span class="icon-whatsapp">&#x1F4F1;</span>
            </button>
          </td>
          <td>
            <button
              class="btn btn-outline-success"
              data-toggle="modal"
              data-target="#modalConfirmacionPrecio"
              @click="verDatosModal(prestamo, 'reporte')"
            >
              <span>&#128196;</span>
            </button>
          </td>
          <td>
            <button
              data-toggle="modal"
              data-target="#modalprestamoprestamo"
              class="btn btn-outline-warning"
              @click="verDatosModal(prestamo)"
            >
              <span class="icon-Lapiz"></span>
            </button>
          </td>
          <!--
          <td>
            <button
              class="btn"
              :class="
                prestamo.estado === '1'
                  ? 'btn-outline-success'
                  : 'btn-outline-danger'
              "
              @click="desactivar(prestamo)"
            >
              <span>{{
                prestamo.estado === "1" ? "&#10003;" : "&#x2716;"
              }}</span>
            </button>
          </td>
          -->
          <td>
            <button
              data-toggle="modal"
              data-target="#modalDevolucion"
              class="btn btn-outline-primary"
              @click="verDatosModal(prestamo)"
            >
              <span>&#x21A9;</span>
            </button>
          </td>
          <td>
            <button
              data-toggle="modal"
              data-target="#modalVenta"
              class="btn btn-outline-success"
              @click="verDatosModal(prestamo)"
            >
              <span>&#36;</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center" v-else>
      <h3>Sin prestamos, te invitamos a registrar tu primer prestamo 🤗</h3>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="modalprestamoprestamo"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalprestamoprestamo"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Editar prestamo
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="prestamo = {}"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form group">
                <label for="nombrecompleto">Recibido por:</label>
                <textarea
                  type="text"
                  placeholder="Recibido por:"
                  v-model="prestamo.observacion"
                  class="form-control"
                />
              </div>

              <v-autocomplete
                class="mt-4"
                label="Cliente"
                v-model="prestamo.cliente_codigo"
                :items="clientes"
                :item-title="titulosAutocompleteClientes"
                item-value="codigo"
                :filter="filterAutocompleteClientes"
              ></v-autocomplete>

              <v-autocomplete
                class="mt-4"
                label="Producto"
                v-model="prestamo.producto_codigo"
                :items="productos"
                :item-title="titulosAutocompleteProductos"
                item-value="codigo"
                :filter="filterAutocompleteproductos"
              ></v-autocomplete>

              <div class="form group mt-4">
                <label for="stock">Cantidad:</label>
                <input
                  type="text"
                  placeholder="valor $"
                  v-model="prestamo.cantidad"
                  class="form-control"
                />
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button
                    type="button"
                    class="btn btn-secondary form-control"
                    data-dismiss="modal"
                    @click="prestamo = {}"
                  >
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input
                    type="button"
                    class="btn btn-success form-control"
                    value="Actualizar"
                    @click="actualizarprestamo()"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Devolucion -->
    <div
      class="modal fade"
      id="modalDevolucion"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalDevolucion"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              ¿Estás seguro de realizar la devolución?
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="devolucion = {}"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>
              <b>{{ prestamo.cantidad }}</b> {{ prestamo.producto }}
            </h5>
            <v-textarea
              label="Observación"
              class="mt-4"
              v-model="devolucion.observacion"
            ></v-textarea>
            <div class="row">
              <div class="col-md-6 mt-3">
                <button
                  type="button"
                  class="btn btn-secondary form-control"
                  data-dismiss="modal"
                  @click="devolucion = {}"
                >
                  Cancelar
                </button>
              </div>
              <div class="col-md-6 mt-3">
                <input
                  type="button"
                  class="btn btn-success form-control"
                  value="Devolver"
                  @click="devolver(prestamo)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="modalVenta"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalVenta"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              ¿Estás seguro de realizar la venta?
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="devolucion = {}"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>
              <b>{{ prestamo.cantidad }}</b> {{ prestamo.producto }}
            </h5>
            <p>
              Total
              {{
                verFormatoMoneda(
                  parseFloat(prestamo.precio_producto) *
                    parseInt(prestamo.cantidad)
                )
              }}
            </p>
            <div>
              <v-col cols="12">
                <div class="form-group col-md-12 mt-5">
                  <label for="select">Forma de Pago:</label>
                  <select
                    id="select"
                    class="form-select form-control"
                    aria-label="Default select example"
                    v-model="formaPago"
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

              <v-col cols="12">
                <div class="form-group col-md-12">
                  <label for="select">Tipo Precio:</label>
                  <select
                    id="select"
                    class="form-select form-control"
                    aria-label="Default select example"
                    v-model="opcionPrecio"
                  >
                    <option
                      :value="opcionPrecio"
                      v-for="opcionPrecio in opcionesPrecios"
                      :key="opcionPrecio"
                      class="text-success"
                    >
                      {{ opcionPrecio }}
                    </option>
                  </select>
                </div>
              </v-col>
            </div>

            <div class="row">
              <div class="col-md-6 mt-3">
                <button
                  type="button"
                  class="btn btn-secondary form-control"
                  data-dismiss="modal"
                  @click="venta = {}"
                >
                  Cancelar
                </button>
              </div>
              <div class="col-md-6 mt-3">
                <input
                  type="button"
                  class="btn btn-success form-control"
                  value="Vender"
                  @click="vender(prestamo)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal confirmacion -->
    <div
      class="modal fade"
      id="modalConfirmacionPrecio"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalConfirmacionPrecio"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              ¿Con que Precio?
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6 mt-3">
                <button
                  type="button"
                  class="btn btn-outline-danger form-control"
                  data-dismiss="modal"
                  @click="confirmacionPrecio(1)"
                >
                  Precio Técnico
                </button>
              </div>
              <div class="col-md-6 mt-3">
                <input
                  type="button"
                  class="btn btn-outline-success form-control"
                  value="Precio"
                  @click="confirmacionPrecio(0)"
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
import FechaUtil from "@/util/FechaUtil";
import MonedaUtil from "@/util/MonedaUtil";
import { mapGetters } from "vuex";
export default {
  props: {
    prestamos: [],
  },
  data() {
    return {
      prestamo: {},
      clienteprestamoGuardar: {
        identificacion: "",
        nombre_completo: "",
      },
      clientes: [],
      productos: [],
      devolucion: {},
      formasPago: ["EFECTIVO", "TRANSFERENCIA"],
      formaPago: "EFECTIVO",
      opcionesPrecios: ["PRECIO FINAL", "PRECIO TÉCNICO"],
      opcionPrecio: 'PRECIO FINAL'
    };
  },
  created() {
    this.verClientes();
    this.verProductos();
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    confirmacionPrecio(tipoPrecio){
      const accion = this.prestamo.accion
      const precioMostrar = tipoPrecio === 0 ? this.prestamo.precio_producto : this.prestamo.costo_producto
      if (accion === 'whatsapp'){
        this.enviarMensajeWhatsapp(precioMostrar)
      } else if (accion === 'reporte') {
        this.generarReporte(precioMostrar)
      }
      $("#modalConfirmacionPrecio").modal("hide");
    },
    generarReporte(precioMostrar) {
      const item = this.prestamo
      item.tipo_reporte = "Prestamo";
      item.tipo = "Producto";
      (item.ruta_volver = "/prestamos"),
        (item.tipoDescripcion = "Observación"),
        (item.tituloObservacion = "Recibido por");
      (item.tieneProducto = true),
      item.precio_producto = precioMostrar * item.cantidad
        //item.descripcion = 'Cantidad: ' + item.cantidad + '. Precio Unidad: ' + this.verFormatoMoneda(item.precio_producto)
        this.$router.push({
          name: "Reporte",
          query: { registro: JSON.stringify(item) },
        });
    },
    enviarMensajeWhatsapp(precioMostrar
    ) {
      const nombreCliente = this.prestamo.cliente;
      const telefonoCliente = this.prestamo.telefono_cliente;
      const descripcionProducto = this.prestamo.producto;
      const codigoSerieProducto = this.prestamo.codigo_serie_producto;
      const codigoprestamo = this.prestamo.codigo;
      const fecha = this.prestamo.fecha;
      const hora = this.prestamo.hora;
      const observacion = this.prestamo.observacion;
      const cantidad = this.prestamo.cantidad;
      const precioProducto = precioMostrar
        observacion === null ? "Sin observación" : observacion;
      if (
        telefonoCliente !== undefined &&
        telefonoCliente !== null &&
        telefonoCliente.length > 0
      ) {
        const mensaje =
          "Apreciad@ " +
          nombreCliente +
          "\n\n" +
          "*Sv prestamos Electrónicas* le informa que se ha registrado el *prestamo* del producto " +
          descripcionProducto +
          " con el *Código de Serie: " +
          codigoSerieProducto +
          "*. A continuación, los detalles correspondientes:\n\n" +
          "Código del prestamo: *" +
          codigoprestamo +
          "*\n" +
          "Fecha: " +
          this.formatearFecha(fecha) +
          "\n" +
          "Hora: " +
          hora +
          "\n" +
          "Precio unidad: " +
          this.verFormatoMoneda(precioProducto) +
          "\n" +
          "Cantidad: *" +
          cantidad +
          "*\n" +
          "Total: *" +
          this.verFormatoMoneda(precioProducto * cantidad) +
          "*\n\n" +
          "Recibido por: " +
          observacion +
          "\n";

        const url =
          "https://api.whatsapp.com/send?phone=+57" +
          telefonoCliente +
          "&text=" +
          encodeURIComponent(mensaje);
        window.open(url);
      } else {
        alert("El Cliente no tiene un número de teléfono");
      }
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
    titulosAutocompleteProductos(item) {
      return `${item.descripcion} - S/N: ${item.codigo_serie}`;
    },
    filterAutocompleteproductos(item, queryText, itemText) {
      return (
        item.descripcion
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1 ||
        item.codigo_serie
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1
      );
    },
    verClientes() {
      this.axios.get("cliente").then((respuesta) => {
        this.clientes = respuesta.data;
      });
    },
    verProductos() {
      this.axios.get("producto").then((respuesta) => {
        this.productos = respuesta.data;
      });
    },
    formatearFecha(fecha) {
      return FechaUtil.formatearFecha(fecha);
    },
    verFormatoMoneda(numero) {
      return MonedaUtil.verFormatoMoneda(numero);
    },
    verDatosModal(prestamo, accion) {
      this.prestamo = { ...prestamo };
      if(accion === 'whatsapp'){
        this.prestamo.accion = 'whatsapp'
      } else if(accion === 'reporte'){
        this.prestamo.accion = 'reporte'
      } else {
        this.prestamo.accion = 'actualizar'
      }
    },
    actualizarprestamo() {
      const prestamoActualizar = {
        observacion: this.prestamo.observacion,
        producto_codigo: this.prestamo.producto_codigo,
        cliente_codigo: this.prestamo.cliente_codigo,
        fecha: this.prestamo.fecha,
        hora: this.prestamo.hora,
        usuario_codigo: this.usuario.codigo,
        codigo: this.prestamo.codigo,
        cantidad: this.prestamo.cantidad,
      };
      this.axios
        .put("prestamo", prestamoActualizar)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/prestamos";
            $("#modalprestamoEditar").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    desactivar(prestamo) {
      const datoEnviar = {
        estado: prestamo.estado === "1" ? "0" : "1",
        codigo: prestamo.codigo,
      };
      this.axios
        .post("prestamo/cambiarestado", datoEnviar)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/prestamos";
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    eliminar(prestamo) {
      console.log(prestamo);
      this.axios
        .delete("prestamo/" + prestamo.numero)
        .then((respuesta) => {
          window.location.href = "/prestamos";
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verClienteprestamoGuardar() {
      const identificacionCliente = this.clienteprestamoGuardar.identificacion;
      if (identificacionCliente.length > 1) {
        this.axios
          .get("cliente/infoporidentificacion/" + identificacionCliente)
          .then((respuesta) => {
            const clientes = respuesta.data;
            if (clientes.length > 0) {
              this.clienteprestamoGuardar.identificacion =
                clientes[0].identificacion;
              this.clienteprestamoGuardar.nombre_completo =
                clientes[0].nombre_completo;
              this.clienteprestamoGuardar.codigo = clientes[0].codigo;
            }
          })
          .catch((error) => {
            alert(error.response.data);
            this.clienteprestamoGuardar.nombre_completo = "";
          });
      }
    },
    devolver(prestamo) {
      const devolucion = {
        producto_codigo: prestamo.producto_codigo,
        cantidad: prestamo.cantidad,
        usuario_codigo: this.usuario.codigo,
        cliente_codigo: prestamo.cliente_codigo,
        observacion: this.devolucion.observacion,
      };
      this.axios
        .post("devolucion_prestamo", devolucion)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.desactivar(prestamo);
            this.devolucion.observacion = "";
            window.location.href = "/prestamos";
            $("#modalDevolucion").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    async vender(prestamoDatos) {
      const prestamo = prestamoDatos
      prestamo.precio_producto = (this.opcionPrecio === 'PRECIO FINAL') ? prestamo.precio_producto : prestamo.costo_producto
      const codigo_venta = await this.guardarVenta(prestamo);
      if (codigo_venta !== -1) {
        if (await this.guardarRegistroVenta(prestamo, codigo_venta)) {
          this.desactivar(prestamo);
          window.location.href = "/prestamos";
          $("#modalVenta").modal("hide");
        }
      }
    },
    async guardarVenta(prestamo) {
      const venta = {
        cliente_codigo: prestamo.cliente_codigo,
        usuario_codigo: this.usuario.codigo,
        total:
          parseFloat(prestamo.precio_producto) * parseInt(prestamo.cantidad),
        forma_pago: this.formaPago,
      };
      try {
        const response = await this.axios.post("venta", venta);
        if (response.status === 200) {
          return response.data.codigo;
        }
      } catch (error) {
        console.log(error);
      }
      return -1;
    },
    async guardarRegistroVenta(prestamo, codigo_venta) {
      const registroVenta = {
        producto_codigo: prestamo.producto_codigo,
        cantidad: prestamo.cantidad,
        total: (prestamo.precio_producto * prestamo.cantidad),
        venta_codigo: codigo_venta,
        desdeprestamo: "S",
      };
      try {
        const response = await this.axios.post("registro_venta", registroVenta);
        if (response.status === 200) {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
      return false;
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