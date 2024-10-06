<template>
  <div class="mt-5">
    <table class="table table-responsive-md" v-if="entradas.length > 0">
      <thead class="thead-light">
        <tr>
          <th scope="col">Número</th>
          <th scope="col">Descripción - Daño</th>
          <th scope="col">Observación - Nota</th>
          <th scope="col">Cliente</th>
          <th scope="col">Dispositivo</th>
          <th scope="col">Fecha</th>
          <th scope="col">Hora</th>
          <th scope="col">Marca</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entrada in entradas" :key="entrada.codigo">
          <td :class="entrada.estado === '1' ? 'text-danger' : ''">
            <p>{{ entrada.codigo }}</p>
          </td>
          <td>
            <p>{{ entrada.descripcion }}</p>
          </td>
          <td>
            <p>
              {{
                entrada.observacion === null
                  ? "Sin observación"
                  : entrada.observacion
              }}
            </p>
          </td>
          <td>
            <p>{{ entrada.cliente }}</p>
          </td>
          <td>
            <p>{{ entrada.dispositivo }} - {{ entrada.modelo_dispositivo }}</p>
          </td>
          <td>
            <p>{{ formatearFecha(entrada.fecha) }}</p>
          </td>
          <td>
            <p>{{ entrada.hora }}</p>
          </td>
          <td>
            <p>{{ entrada.marca_dispositivo }}</p>
          </td>
          <td>
            <button
              class="btn btn-outline-success"
              @click="
                enviarMensajeWhatsapp(
                  entrada.cliente,
                  entrada.telefono_cliente,
                  entrada.dispositivo,
                  entrada.codigo_serie_dispositivo,
                  entrada.codigo,
                  entrada.fecha,
                  entrada.hora,
                  entrada.descripcion,
                  entrada.observacion,
                  entrada.modelo_dispositivo,
                  entrada.marca_dispositivo
                )
              "
            >
              <span class="icon-whatsapp">&#x1F4F1;</span>
            </button>
          </td>
          <td>
            <button
              class="btn btn-outline-success"
              @click="realizarReparacion(entrada)"
            >
              <span>&#x1F527;</span>
            </button>
          </td>
          <td>
            <button
              class="btn btn-outline-success"
              @click="generarReporte(entrada)"
            >
              <span>&#128196;</span>
            </button>
          </td>
          <td>
            <button
              data-toggle="modal"
              data-target="#modalEntradaentrada"
              class="btn btn-outline-warning"
              @click="verDatosModal(entrada)"
            >
              <span class="icon-Lapiz"></span>
            </button>
          </td>
          <td>
            <button
              class="btn"
              :class="
                entrada.estado === '1'
                  ? 'btn-outline-success'
                  : 'btn-outline-danger'
              "
              @click="desactivar(entrada)"
            >
              <span>{{
                entrada.estado === "1" ? "&#10003;" : "&#x2716;"
              }}</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center" v-else>
      <h3>Sin entradas, te invitamos a registrar tu primer entrada 🤗</h3>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="modalEntradaentrada"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalEntradaentrada"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Editar entrada
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="entrada = {}"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form group">
                <label for="nombrecompleto">Descripción:</label>
                <textarea
                  type="text"
                  placeholder="Descripción"
                  v-model="entrada.descripcion"
                  class="form-control"
                />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="identificacion">Observación:</label>
                  <textarea
                    type="text"
                    placeholder="Observación"
                    v-model="entrada.observacion"
                    class="form-control"
                  />
                </div>
              </div>

              <v-autocomplete
                label="Cliente"
                v-model="entrada.cliente_codigo"
                :items="clientes"
                :item-title="titulosAutocompleteClientes"
                item-value="codigo"
                :filter="filterAutocompleteClientes"
              ></v-autocomplete>

              <v-autocomplete
                label="Dispositivo"
                v-model="entrada.dispositivo_codigo"
                :items="dispositivos"
                :item-title="titulosAutocompleteDispositivos"
                item-value="codigo"
                :filter="filterAutocompleteDispositivos"
              ></v-autocomplete>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button
                    type="button"
                    class="btn btn-secondary form-control"
                    data-dismiss="modal"
                    @click="entrada = {}"
                  >
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input
                    type="button"
                    class="btn btn-success form-control"
                    value="Actualizar"
                    @click="actualizarEntrada()"
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
      id="modalentradaEliminar"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalentradaEliminar"
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
              @click="entrada = {}"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>{{ entrada.nombre_completo }}</h5>
            <div class="row">
              <div class="col-md-6 mt-3">
                <button
                  type="button"
                  class="btn btn-secondary form-control"
                  data-dismiss="modal"
                  @click="entrada = {}"
                >
                  Cancelar
                </button>
              </div>
              <div class="col-md-6 mt-3">
                <input
                  type="button"
                  class="btn btn-danger form-control"
                  value="Eliminar"
                  @click="eliminar(entrada)"
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
import { mapGetters } from "vuex";
export default {
  props: {
    entradas: [],
  },
  data() {
    return {
      entrada: {},
      clienteentradaGuardar: {
        identificacion: "",
        nombre_completo: "",
      },
      clientes: [],
      dispositivos: [],
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
    realizarReparacion(item) {
      item.forma_pago = "EFECTIVO"
      item.pago_completo = "0"
      this.$router.push({
        name: "NuevaReparacion",
        query: { registro: JSON.stringify(item) },
      });
    },
    generarReporte(item) {
      item.tipo_reporte = "Entrada";
      item.tipo = "Dispositivo";
      (item.ruta_volver = "/entradas"),
        (item.tipoDescripcion = "Daño"),
        (item.tieneProducto = false);
      this.$router.push({
        name: "Reporte",
        query: { registro: JSON.stringify(item) },
      });
    },
    enviarMensajeWhatsapp(
      nombreCliente,
      telefonoCliente,
      descripcionDispositivo,
      codigoSerieDispositivo,
      codigoEntrada,
      fecha,
      hora,
      descripcion,
      observacion,
      modeloDispositivo,
      marcaDispositivo
    ) {
      if (
        telefonoCliente !== undefined &&
        telefonoCliente !== null &&
        telefonoCliente.length > 0
      ) {
        const observacionEnviar =
          observacion === null ? "Sin observación" : observacion;
        const mensaje =
          "Apreciad@ " +
          nombreCliente +
          "\n\n" +
          "*Sv prestamos Electrónicas* le informa que se ha registrado la *entrada* del dispositivo " +
          descripcionDispositivo +
          ". *Marca:* " +
          marcaDispositivo +
          ". *Modelo: " +
          modeloDispositivo +
          "* con el *Código de Serie: " +
          codigoSerieDispositivo +
          "*. A continuación, los detalles correspondientes:\n\n" +
          "Código de la Entrada: *" +
          codigoEntrada +
          "*\n" +
          "Fecha: " +
          this.formatearFecha(fecha) +
          "\n" +
          "Hora: " +
          hora +
          "\n" +
          "Descripción: " +
          descripcion +
          "\n" +
          "Observación: " +
          observacionEnviar;

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
    titulosAutocompleteDispositivos(item) {
      return `${item.descripcion} - S/N: ${item.codigo_serie}`;
    },
    filterAutocompleteDispositivos(item, queryText, itemText) {
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
    verDispositivos() {
      this.axios.get("dispositivo").then((respuesta) => {
        this.dispositivos = respuesta.data;
      });
    },
    formatearFecha(fecha) {
      return FechaUtil.formatearFecha(fecha);
    },
    verDatosModal(entrada) {
      this.entrada = { ...entrada };
    },
    actualizarEntrada() {
      const entradaActualizar = {
        descripcion: this.entrada.descripcion,
        observacion: this.entrada.observacion,
        dispositivo_codigo: this.entrada.dispositivo_codigo,
        cliente_codigo: this.entrada.cliente_codigo,
        fecha: this.entrada.fecha,
        hora: this.entrada.hora,
        usuario_codigo: this.usuario.codigo,
        codigo: this.entrada.codigo,
      };
      this.axios
        .put("entrada", entradaActualizar)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/entradas";
            $("#modalentradaEditar").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    desactivar(entrada) {
      const datoEnviar = {
        estado: entrada.estado === "1" ? "0" : "1",
        codigo: entrada.codigo,
      };
      this.axios
        .post("entrada/cambiarestado", datoEnviar)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/entradas";
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    eliminar(entrada) {
      console.log(entrada);
      this.axios
        .delete("entrada/" + entrada.numero)
        .then((respuesta) => {
          window.location.href = "/entradas";
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verClienteentradaGuardar() {
      const identificacionCliente = this.clienteentradaGuardar.identificacion;
      if (identificacionCliente.length > 1) {
        this.axios
          .get("cliente/infoporidentificacion/" + identificacionCliente)
          .then((respuesta) => {
            const clientes = respuesta.data;
            if (clientes.length > 0) {
              this.clienteentradaGuardar.identificacion =
                clientes[0].identificacion;
              this.clienteentradaGuardar.nombre_completo =
                clientes[0].nombre_completo;
              this.clienteentradaGuardar.codigo = clientes[0].codigo;
            }
          })
          .catch((error) => {
            alert(error.response.data);
            this.clienteentradaGuardar.nombre_completo = "";
          });
      }
    },
    actualizarentrada() {
      const datosGuardar = {
        numero: this.entrada.numero,
        identificacion: this.clienteentradaGuardar.identificacion,
        cliente_codigo: this.clienteentradaGuardar.codigo,
      };
      this.axios
        .put("entrada/actualizarcliente", datosGuardar)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/entradas";
            $("#modalActualizarentrada").modal("hide");
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