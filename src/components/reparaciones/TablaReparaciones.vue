<template>
  <div class="mt-5">
    <table class="table table-responsive-md" v-if="reparaciones.length > 0">
      <thead class="thead-light">
        <tr>
          <th scope="col">Número</th>
          <th scope="col">Reporte Técnico</th>
          <th scope="col">Reporte Final</th>
          <th scope="col">Cliente</th>
          <th scope="col">Dispositivo</th>
          <th scope="col">Fecha</th>
          <th scope="col">Hora</th>
          <th scope="col">Forma de Pago</th>
          <th scope="col">Valor</th>
          <th scope="col">Usuario</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reparacion in reparaciones" :key="reparacion.codigo">
          <td :class="reparacion.estado === '1' ? 'text-danger' : ''">
            <p>{{ reparacion.codigo }}</p>
          </td>
          <td>
            <p>{{ reparacion.reporte_tecnico }}</p>
          </td>
          <td>
            <p>{{ reparacion.reporte_final }}</p>
          </td>
          <td>
            <p>{{ reparacion.cliente }}</p>
          </td>
          <td>
            <p>{{ reparacion.dispositivo }}</p>
          </td>
          <td>
            <p>{{ formatearFecha(reparacion.fecha) }}</p>
          </td>
          <td>
            <p>{{ reparacion.hora }}</p>
          </td>
          <td>
            <p>{{ (reparacion.forma_pago === 'TRANSFERENCIA') ? 'TRANSFER' : reparacion.forma_pago }}</p>
          </td>
          <td :class="reparacion.pago_completo === '1' ? 'text-danger' : ''">
            <p>{{ verFormatoMoneda(reparacion.valor) }}</p>
          </td>
          <td>
            <p>{{ reparacion.usuario }}</p>
          </td>
          <td>
            <button
              class="btn btn-outline-success"
              @click="
                enviarMensajeWhatsapp(
                  reparacion.cliente,
                  reparacion.telefono_cliente,
                  reparacion.dispositivo,
                  reparacion.codigo_serie_dispositivo,
                  reparacion.codigo,
                  reparacion.fecha,
                  reparacion.hora,
                  reparacion.reporte_final,
                  reparacion.valor
                )
              "
            >
              <span class="icon-whatsapp">&#x1F4F1;</span>
            </button>
          </td>
          <td>
            <button
              class="btn btn-outline-success"
              @click="generarReporte(reparacion)"
            >
              <span>&#128196;</span>
            </button>
          </td>
          <td>
            <button
              data-toggle="modal"
              data-target="#modalreparacionreparacion"
              class="btn btn-outline-warning"
              @click="verDatosModal(reparacion)"
            >
              <span class="icon-Lapiz"></span>
            </button>
          </td>
          <td>
            <button
              class="btn"
              :class="
                reparacion.estado === '1'
                  ? 'btn-outline-success'
                  : 'btn-outline-danger'
              "
              @click="desactivar(reparacion)"
            >
              <span>{{
                reparacion.estado === "1" ? "&#10003;" : "&#x2716;"
              }}</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center" v-else>
      <h3>
        Sin reparaciones, te invitamos a registrar tu primer reparacion 🤗
      </h3>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="modalreparacionreparacion"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalreparacionreparacion"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Editar reparacion
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="reparacion = {}"
            >
              <span aria-hidden="true">&times;</span>
            </button>
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

              <v-autocomplete
                label="Cliente"
                v-model="reparacion.cliente_codigo"
                :items="clientes"
                :item-title="titulosAutocompleteClientes"
                item-value="codigo"
                :filter="filterAutocompleteClientes"
              ></v-autocomplete>

              <v-autocomplete
                label="Dispositivo"
                v-model="reparacion.dispositivo_codigo"
                :items="dispositivos"
                :item-title="titulosAutocompleteDispositivos"
                item-value="codigo"
                :filter="filterAutocompleteDispositivos"
              ></v-autocomplete>

              <v-col>
              <div class="form-group mt-2">
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

              <v-row>
                <v-col>
                  <div class="form group mt-2">
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
                  <div class="form-group mt-2">
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

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button
                    type="button"
                    class="btn btn-secondary form-control"
                    data-dismiss="modal"
                    @click="reparacion = {}"
                  >
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input
                    type="button"
                    class="btn btn-success form-control"
                    value="Actualizar"
                    @click="actualizarreparacion()"
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
      id="modalreparacionEliminar"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalreparacionEliminar"
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
              @click="reparacion = {}"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>{{ reparacion.nombre_completo }}</h5>
            <div class="row">
              <div class="col-md-6 mt-3">
                <button
                  type="button"
                  class="btn btn-secondary form-control"
                  data-dismiss="modal"
                  @click="reparacion = {}"
                >
                  Cancelar
                </button>
              </div>
              <div class="col-md-6 mt-3">
                <input
                  type="button"
                  class="btn btn-danger form-control"
                  value="Eliminar"
                  @click="eliminar(reparacion)"
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
    reparaciones: [],
  },
  data() {
    return {
      reparacion: {},
      clientereparacionGuardar: {
        identificacion: "",
        nombre_completo: "",
      },
      clientes: [],
      dispositivos: [],
      opcionesPagoCompleto: [
        { descripcion: "SI", valor: "0" },
        { descripcion: "NO", valor: "1" },
      ],
      formasPago: ['EFECTIVO', 'TRANSFERENCIA']
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
    generarReporte(item) {
      item.tipo_reporte = "Reparación";
      item.tipo = "Dispositivo";
      item.ruta_volver = "/reparaciones";
      (item.tipoDescripcion = "Reparación"), (item.tieneProducto = false);
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
      codigoreparacion,
      fecha,
      hora,
      reporteFinal,
      valor
    ) {
      if (
        telefonoCliente !== undefined &&
        telefonoCliente !== null &&
        telefonoCliente.length > 0
      ) {
        const mensaje =
          "Apreciad@ " +
          nombreCliente +
          "\n\n" +
          "*Sv prestamos Electrónicas* le informa que se ha registrado la *reparación* del dispositivo " +
          descripcionDispositivo +
          " con el *Código de Serie: " +
          codigoSerieDispositivo +
          "*. A continuación, los detalles correspondientes:\n\n" +
          "Código de la reparación: *" +
          codigoreparacion +
          "*\n" +
          "Fecha: " +
          this.formatearFecha(fecha) +
          "\n" +
          "Hora: " +
          hora +
          "\n" +
          "*Valor: " +
          this.verFormatoMoneda(valor) +
          "*\n\n" +
          "Reporte: " +
          reporteFinal +
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
    verFormatoMoneda(numero) {
      return MonedaUtil.verFormatoMoneda(numero);
    },
    verDatosModal(reparacion) {
      this.reparacion = { ...reparacion };
    },
    async actualizarreparacion() {
      const reparacionActualizar = {
        reporte_tecnico: this.reparacion.reporte_tecnico,
        reporte_final: this.reparacion.reporte_final,
        dispositivo_codigo: this.reparacion.dispositivo_codigo,
        cliente_codigo: this.reparacion.cliente_codigo,
        fecha: this.reparacion.fecha,
        hora: this.reparacion.hora,
        usuario_codigo: this.usuario.codigo,
        codigo: this.reparacion.codigo,
        valor: this.reparacion.valor,
        pago_completo: this.reparacion.pago_completo,
        forma_pago: this.reparacion.forma_pago
      };

      try {
        const respuesta = await this.axios.put(
          "reparacion",
          reparacionActualizar
        );
        if (respuesta.status === 200) {
          if (reparacionActualizar.pago_completo === "0" && reparacionActualizar.forma_pago === "EFECTIVO" && this.pagoCompletoReparacionOtraFecha()) {
            await this.guardarMovimientoCaja();
          } else {
            window.location.href = "/reparaciones";
            $("#modalreparacionEditar").modal("hide");
          }
        }
      } catch (error) {
        alert(error.response.data);
      }
    },
    pagoCompletoReparacionOtraFecha(){
      return this.formatearFecha(this.reparacion.fecha) !== this.fechaActual()
    },
    formatearFecha(fecha) {
      return FechaUtil.formatearFecha(fecha);
    },
    async guardarMovimientoCaja() {
      const movimientoCaja = {
        concepto:
          "Pago de reparación realizada a " +
          this.reparacion.cliente +
          ". En la fecha: " +
          this.formatearFecha(this.reparacion.fecha),
        tipo: "0",
        valor: this.reparacion.valor,
        usuario_codigo: this.usuario.codigo,
      };
      try {
        const respuesta = await this.axios.post(
          "movimiento_caja",
          movimientoCaja
        );
        if (respuesta.status === 200) {
          window.location.href = "/reparaciones";
          $("#modalreparacionEditar").modal("hide");
        }
      } catch (error) {
        alert(error.response.data);
      }
    },
    fechaActual() {
      let date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const dia = day < 10 ? "0" + day : day;
      const mes = month < 10 ? "0" + month : month;

      return year + "-" + mes + "-" + dia;
    },
    desactivar(reparacion) {
      const datoEnviar = {
        estado: reparacion.estado === "1" ? "0" : "1",
        codigo: reparacion.codigo,
      };
      this.axios
        .post("reparacion/cambiarestado", datoEnviar)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/reparaciones";
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    eliminar(reparacion) {
      console.log(reparacion);
      this.axios
        .delete("reparacion/" + reparacion.numero)
        .then((respuesta) => {
          window.location.href = "/reparaciones";
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verClientereparacionGuardar() {
      const identificacionCliente =
        this.clientereparacionGuardar.identificacion;
      if (identificacionCliente.length > 1) {
        this.axios
          .get("cliente/infoporidentificacion/" + identificacionCliente)
          .then((respuesta) => {
            const clientes = respuesta.data;
            if (clientes.length > 0) {
              this.clientereparacionGuardar.identificacion =
                clientes[0].identificacion;
              this.clientereparacionGuardar.nombre_completo =
                clientes[0].nombre_completo;
              this.clientereparacionGuardar.codigo = clientes[0].codigo;
            }
          })
          .catch((error) => {
            alert(error.response.data);
            this.clientereparacionGuardar.nombre_completo = "";
          });
      }
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