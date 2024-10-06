<template>
  <div class="text-center">
    <div v-if="usuario !== null">
      <h3 class="text-success mb-4 titulo-principal">Movimientos de la Caja</h3>
      <button
        type="button"
        class="btn btn-success"
        data-toggle="modal"
        data-target="#modalGuardarMovimientoCaja"
      >
        Guardar un nuevo Movimiento
      </button>
      <div class="contenedor-filtro mt-4">
        <div class="row">
          <div class="form-group col-md-12">
            <label for="select">Forma de busqueda:</label>
            <select
              id="select"
              class="form-select form-control"
              aria-label="Default select example"
              v-model="buscarPor"
              :disabled="usuario.rol_codigo === 2"
            >
              <option
                :value="buscar.valor"
                v-for="buscar in tipoBusqueda"
                :key="buscar.valor"
                class="text-success"
              >
                {{ buscar.descripcion }}
              </option>
            </select>
          </div>
        </div>
        <div class="row" v-if="buscarPor !== 1">
          <div class="form-group col-md-6">
            <label for="fecha">Fecha Inicial:</label>
            <input
              type="date"
              class="form-control"
              id="fecha"
              v-model="fechaInicial"
              :max="maximaFecha"
              :disabled="usuario.rol_codigo === 2"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="fecha">Fecha Final:</label>
            <input
              type="date"
              class="form-control"
              id="fecha"
              v-model="fechaFinal"
              :max="maximaFecha"
              :disabled="usuario.rol_codigo === 2"
            />
          </div>
          <div class="form-group col-md-12" v-if="buscarPor === 2">
            <button class="btn btn-success" @click="verMovimientoCaja()">
              Buscar
            </button>
          </div>
        </div>
        <div class="row" v-if="buscarPor !== 2">
          <div class="form-group col-md-6">
            <label for="select">Condicion:</label>
            <select
              id="select"
              class="form-select form-control"
              aria-label="Default select example"
              v-model="condicion"
              :disabled="usuario.rol_codigo === 2"
            >
              <option
                :value="condicion.valor"
                v-for="condicion in condiciones"
                :key="condicion.valor"
                class="text-success"
              >
                {{ condicion.descripcion }}
              </option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="select">Buscar:</label>
            <div class="input-buscar">
              <input
                class="form-control"
                type="text"
                v-model="buscar"
                @keypress.enter="verMovimientoCaja()"
                :disabled="usuario.rol_codigo === 2"
              />
              <button class="btn btn-success" @click="verMovimientoCaja()">
                &#128269;
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <h5>
          Total Ingresos:
          <b>
            <span class="text-success">
              {{ verFormatoMoneda(verTotalMovimientosPorTipo("0")) }}
            </span></b
          >
        </h5>
        <h5>
          Total Egresos:
          <b>
            <span class="text-danger">
              {{ verFormatoMoneda(verTotalMovimientosPorTipo("1")) }}
            </span></b
          >
        </h5>
        <h5>
          Total Diferencia:
          <b>
            <span class="text-dark">
              {{ verFormatoMoneda(verTotalMovimientosPorTipo("0") - verTotalMovimientosPorTipo("1")) }}
            </span></b
          >
        </h5>
      </div>
      <TablaMovimientosCaja :movimientosCaja="movimientosCaja" />
    </div>
    <div v-else>
      <h4>Su rol no tiene permisos para ver esta información</h4>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="modalGuardarMovimientoCaja"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalGuardarMovimientoCaja"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Guardar Movimiento de Caja
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="movimientoCaja = {}"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form-group col-md-12">
                <label for="select">Tipo:</label>
                <select
                  id="select"
                  class="form-select form-control"
                  aria-label="Default select example"
                  v-model="movimientoCaja.tipo"
                >
                  <option
                    :value="tipo.valor"
                    v-for="tipo in tiposMovimientos"
                    :key="tipo.valor"
                    class="text-success"
                  >
                    {{ tipo.descripcion }}
                  </option>
                </select>
              </div>
              <div class="form group">
                <label for="nombrecompleto">Concepto:</label>
                <textarea
                  type="text"
                  placeholder="Concepto"
                  v-model="movimientoCaja.concepto"
                  class="form-control"
                />
              </div>

              <div class="form-group mt-2">
                <label for="precioUnidad">Valor $:</label>
                <input
                  type="number"
                  placeholder="Valor $"
                  v-model="movimientoCaja.valor"
                  class="form-control"
                />
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button
                    type="button"
                    class="btn btn-secondary form-control"
                    data-dismiss="modal"
                    @click="movimientoCaja = {}"
                  >
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input
                    type="button"
                    class="btn btn-success form-control"
                    value="Guardar"
                    @click="guardarMovimientoCaja()"
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
import TablaMovimientosCaja from "@/components/MovimientosCaja/TablaMovimientosCaja";
import { mapGetters } from "vuex";
import Mensaje from "@/components/Mensaje.vue";
import MonedaUtil from "@/util/MonedaUtil";
export default {
  components: { Mensaje, TablaMovimientosCaja },
  data() {
    return {
      movimientoCaja: { tipo: 1 },
      movimientosCaja: [],
      mensaje: { ver: false },
      condiciones: [
        { descripcion: "NÚMERO", valor: "mc.codigo" },
        { descripcion: "CONCEPTO", valor: "mc.concepto" },
        { descripcion: "USUARIO", valor: "u.nombre_completo" },
      ],
      tipoBusqueda: [
        { descripcion: "BUSCAR POR CONDICIÓN", valor: 1 },
        { descripcion: "BUSCAR ENTRE FECHAS", valor: 2 },
        { descripcion: "BUSCAR ENTRE FECHAS MÁS CONDICIÓN", valor: 3 },
      ],
      tiposMovimientos: [
        { descripcion: "EGRESO", valor: 1 },
        { descripcion: "INGRESO", valor: 0 },
      ],
      buscarPor: 1,
      condicion: "mc.codigo",
      buscar: "",
    };
  },
  created() {
    this.cargarFechaActual();
    this.validacionesParaUsuario();
    this.verMovimientoCaja();
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    validacionesParaUsuario() {
      const rolUsuario = this.usuario.rol_codigo;
      if (rolUsuario === 2) {
        this.condicion = "u.nombre_completo";
        this.buscarPor = 3;
        this.buscar = this.usuario.nombre_completo;
      }
    },
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
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
    verMovimientoCaja() {
      let buscarPor = {
        condicion: this.condicion,
        buscar: this.buscar,
      };
      if (this.buscarPor === 2) {
        buscarPor = {
          fechaInicial: this.fechaInicial,
          fechaFinal: this.fechaFinal,
        };
      } else if (this.buscarPor === 3) {
        buscarPor = {
          condicion: this.condicion,
          buscar: this.buscar,
          fechaInicial: this.fechaInicial,
          fechaFinal: this.fechaFinal,
        };
      }
      buscarPor.buscarPor = this.buscarPor;
      console.log(buscarPor, "buscar");
      this.axios
        .post("movimiento_caja/buscarporcondicion", buscarPor)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.movimientosCaja = respuesta.data;
          }
        });
    },
    guardarMovimientoCaja() {
      const movimientoCaja = this.movimientoCaja;
      movimientoCaja.usuario_codigo = this.usuario.codigo;
      this.axios
        .post("movimiento_caja", movimientoCaja)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.$router.push('/movimiento_caja')
            //window.location.href = "/movimiento_caja";
            $("#modalGuardarMovimientoCaja").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    async guardarMovimientoCaja2() {
      const movimientoCaja = this.movimientoCaja;
      movimientoCaja.usuario_codigo = this.usuario.codigo;
      try {
        const respuesta = await this.axios.post(
          "movimiento_caja",
          movimientoCaja
        );
        if (respuesta.status === 200) {
          this.$router.push('/movimiento_caja')
          //window.location.href = "/movimiento_caja";
          $("#modalGuardarMovimientoCaja").modal("hide");
        }
      } catch (error) {
        alert(error.response.data);
      }
    },
    verTotalMovimientosPorTipo(tipo) {
      const movimientosCaja = this.movimientosCaja;
      let total = 0;
      for (const movimiento of movimientosCaja) {
        if (movimiento.estado === "0" && movimiento.tipo === tipo) {
          total += movimiento.valor;
        }
      }
      return total;
    },
    verFormatoMoneda(numero) {
      return MonedaUtil.verFormatoMoneda(numero);
    },
  },
};
</script>
<style>
.input-buscar {
  display: flex;
  align-content: center;
  align-items: center;
}
</style>