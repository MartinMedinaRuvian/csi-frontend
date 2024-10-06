<template>
  <div class="text-center">
    <div v-if="usuario !== null && usuario.rol_codigo === 1">
      <div class="row" v-if="buscarPor !== 1">
        <div class="form-group col-md-6">
          <label for="fecha">Fecha Inicial:</label>
          <input type="date" class="form-control" id="fecha" v-model="fechaInicial" :max="maximaFecha" />
        </div>
        <div class="form-group col-md-6">
          <label for="fecha">Fecha Final:</label>
          <input type="date" class="form-control" id="fecha" v-model="fechaFinal" :max="maximaFecha" />
        </div>
        <div class="form-group col-md-12">
          <button class="btn btn-success" @click="verTotal()">Buscar</button>
        </div>
      </div>
      <v-row>
        <v-col>
          <h1 class="text-success">Entradas</h1>
          <div class="detalles mb-5">
            <p>
              Total Reparaciones Efectivo:
              <b>{{ verFormatoMoneda(reparaciones) }}</b>
            </p>
            <p>
              Total Reparaciones Transferencias:
              <b>{{ verFormatoMoneda(reparacionesTransferencia) }}</b>
            </p>
            <p>
              Total Ventas Efectivo: <b>{{ verFormatoMoneda(ventas) }}</b>
            </p>
            <p>
              Total Ventas Transferencia:
              <b>{{ verFormatoMoneda(ventasTransferencia) }}</b>
            </p>
            <p>
              Total Ingresos de la Caja:
              <b>{{ verFormatoMoneda(ingresosCaja) }}</b>
            </p>
          </div>
          <div class="total mt-5">
            <h4 class="text-success">
              Total Entradas Efectivo:
              {{ verFormatoMoneda(reparaciones + ventas + ingresosCaja) }}
            </h4>
            <h4 class="text-success">
              Total Entradas Transferencia:
              {{
                verFormatoMoneda(
                  reparacionesTransferencia + ventasTransferencia
                )
              }}
            </h4>
            <h3 class="text-success">
              Total Entradas:
              <b>{{
                verFormatoMoneda(
                  reparaciones +
                  ventas +
                  ingresosCaja +
                  reparacionesTransferencia +
                  ventasTransferencia
                )
              }}</b>
            </h3>
          </div>
        </v-col>
        <v-col>
          <h1 class="text-danger">Salidas</h1>
          <p>
            Total Egresos de la Caja: <b>{{ verFormatoMoneda(egresosCaja) }}</b>
          </p>
          <h3 class="text-danger">
            Total Salidas: <b>{{ verFormatoMoneda(egresosCaja) }}</b>
          </h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h4>
            Diferencia Efectivo:
            {{
              verFormatoMoneda(
                reparaciones + ventas + ingresosCaja - egresosCaja
              )
            }}
          </h4>
          <h3>
            Diferencia Total:
            <b>{{
              verFormatoMoneda(
                reparaciones +
                ventas +
                ingresosCaja +
                reparacionesTransferencia +
                ventasTransferencia -
                egresosCaja
              )
            }}</b>
          </h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <button :disabled="fechaInicial !== fechaFinal" data-toggle="modal" data-target="#modalGuardarCajaMayor" class="btn btn-success" @click="verTotal()">
            Cerrar Caja del día {{ verFormatoNombreDiaFecha(fechaInicial) }}
          </button>
        </v-col>
      </v-row>
      <!-- Modal Guardar Caja mayor -->
      <div class="modal fade" id="modalGuardarCajaMayor" tabindex="-1" role="dialog"
        aria-labelledby="modalGuardarCajaMayor" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header bg-success">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Caja del día {{ verFormatoNombreDiaFecha(fechaInicial) }}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cliente = {}">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div>
                <h6>
                  Efectivo total:
                  <b>
                    {{
                      verFormatoMoneda(
                        reparaciones + ventas + ingresosCaja - egresosCaja
                      )
                    }}
                  </b>
                </h6>
                <div class="form group mb-5">
                  <label for="nombrecompleto mt-4">Valor Guardar Caja Mayor:</label>
                  <input type="text" placeholder="Ingreso Caja Mayor Guardar" v-model="cajaMayor.valor"
                    class="form-control" :disabled="(reparaciones + ventas + ingresosCaja - egresosCaja) <= 0" />
                </div>
                <h6 class="mb-4 text-success"><b>información Base de Caja para Siguiente Día</b></h6>
                <h6>
                  Valor:
                  <b>
                    {{
                      verFormatoMoneda(
                        (reparaciones + ventas + ingresosCaja - egresosCaja) - cajaMayor.valor
                      )
                    }}
                  </b>
                </h6>
                <div class="form group">
                  <h6>Fecha:</h6>
                  <input :min="proximoDiaHabil" type="date" v-model="proximoDiaHabil" class="form-control">
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                    @click="cliente = {}">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-success form-control" value="Guardar" @click="guardar()"
                    :disabled="(reparaciones + ventas + ingresosCaja - egresosCaja) <= 0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h4>Su rol no tiene permisos para ver esta información</h4>
    </div>
  </div>
</template>
<script>
import FechaUtil from "@/util/FechaUtil";
import MonedaUtil from "@/util/MonedaUtil";
import TablaClientes from "@/components/clientes/TablaClientes";
import { mapGetters } from "vuex";
import Mensaje from "@/components/Mensaje.vue";
export default {
  components: { Mensaje },
  data() {
    return {
      reparaciones: 0,
      ventas: 0,
      ingresosCaja: 0,
      egresosCaja: 0,
      fechaInicial: "",
      fechaFinal: "",
      reparacionesTransferencia: 0,
      ventasTransferencia: 0,
      proximoDiaHabil: null,
      proximoDiaHabilMostrar: null,
      cajaMayor: { valor: 0 }
    };
  },
  created() {
    this.cargarFechaActual();
    this.verTotal()
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    cargarFechaActual() {
      let date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const dia = day < 10 ? "0" + day : day;
      const mes = month < 10 ? "0" + month : month;

      const fechaActual = year + "-" + mes + "-" + dia;

      this.fechaInicial = fechaActual;
      this.fechaFinal = fechaActual;
      this.maximaFecha = fechaActual;
    },
    verTotal() {
      this.verReparaciones("EFECTIVO");
      this.verReparaciones("TRANSFERENCIA");
      this.verVentas("EFECTIVO");
      this.verVentas("TRANSFERENCIA");
      this.verIngresosCaja();
      this.verEgresosCaja();
      this.verProximoDiaHabil()
    },
    verFormatoMoneda(numero) {
      return MonedaUtil.verFormatoMoneda(numero);
    },
    verFormatoNombreDiaFecha(fecha){
			const [year, month, day] = fecha.split('-').map(Number);
      const fechaSele = new Date(year, month - 1, day);
      return fechaSele.toDateString()
    },
    verProximoDiaHabil() {
      const fecha = this.fechaInicial;
			const [year, month, day] = fecha.split('-').map(Number);
      const fechaSele = new Date(year, month - 1, day);

      const proximoDia = FechaUtil.proximoDiaHabil(fechaSele)
      this.proximoDiaHabilMostrar = proximoDia.toDateString()
      const fechaMostrarProximoDia = FechaUtil.verFormatoYYMMDD(proximoDia)
      this.proximoDiaHabil = fechaMostrarProximoDia
    },
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    verReparaciones(formaPago) {
      const buscarPor = {
        fechaInicial: this.fechaInicial,
        fechaFinal: this.fechaFinal,
        formaPago: formaPago,
      };
      this.axios.post("reparacion/total", buscarPor).then((respuesta) => {
        if (respuesta.status === 200) {
          if (formaPago === "EFECTIVO") {
            this.reparaciones = respuesta.data[0].TOTAL;
          } else {
            this.reparacionesTransferencia = respuesta.data[0].TOTAL;
          }
        }
      });
    },
    verVentas(formaPago) {
      const buscarPor = {
        fechaInicial: this.fechaInicial,
        fechaFinal: this.fechaFinal,
        formaPago: formaPago,
      };
      this.axios.post("venta/total", buscarPor).then((respuesta) => {
        if (respuesta.status === 200) {
          if (formaPago === "EFECTIVO") {
            this.ventas = respuesta.data[0].TOTAL;
          } else {
            this.ventasTransferencia = respuesta.data[0].TOTAL;
          }
        }
      });
    },
    verIngresosCaja() {
      const buscarPor = {
        fechaInicial: this.fechaInicial,
        fechaFinal: this.fechaFinal,
        tipo: "0",
      };
      this.axios.post("movimiento_caja/total", buscarPor).then((respuesta) => {
        if (respuesta.status === 200) {
          this.ingresosCaja = respuesta.data[0].TOTAL;
        }
      });
    },
    verEgresosCaja() {
      const buscarPor = {
        fechaInicial: this.fechaInicial,
        fechaFinal: this.fechaFinal,
        tipo: "1",
      };
      this.axios.post("movimiento_caja/total", buscarPor).then((respuesta) => {
        if (respuesta.status === 200) {
          this.egresosCaja = respuesta.data[0].TOTAL;
        }
      });
    },
    guardar() {
      this.guardarCajaMayor()
      this.guardarIngresoCaja()
    },
    guardarCajaMayor() {
      const movimientoCaja = {
        valor: this.cajaMayor.valor,
        concepto: 'CIERRE CAJA',
        tipo: '0',
        fecha: this.fechaInicial,
        hora: this.fechaInicial === FechaUtil.fechaActual() ? FechaUtil.horaActual() : '18:00'
      };
      movimientoCaja.usuario_codigo = this.usuario.codigo;
      this.axios
        .post("movimiento_caja_mayor", movimientoCaja)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            $("#modalGuardarCajaMayor").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    guardarIngresoCaja() {
      const movimientoCaja = {
        valor: (this.reparaciones + this.ventas + this.ingresosCaja - this.egresosCaja) -this.cajaMayor.valor,
        concepto: 'BASE CAJA',
        tipo: '0',
        fecha: this.proximoDiaHabil,
        hora: '7:00'
      };
      movimientoCaja.usuario_codigo = this.usuario.codigo;
      this.axios
        .post("movimiento_caja", movimientoCaja)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.$router.push('/movimiento_caja_mayor')
            $("#modalGuardarCajaMayor").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
  },
  components: {
    TablaClientes,
  },
};
</script>
<style scoped>
p {
  text-align: left;
}
</style>