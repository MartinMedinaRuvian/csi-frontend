<template>
  <div class="mt-5">
    <table class="table table-responsive-md" v-if="movimientosCaja.length > 0">
      <thead class="thead-light">
        <tr>
          <th scope="col">Número</th>
          <th scope="col">Concepto</th>
          <th scope="col">Fecha</th>
          <th scope="col">Hora</th>
          <th scope="col">Valor</th>
          <th scope="col">Usuario</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="movimientoCaja in movimientosCaja"
          :key="movimientoCaja.codigo"
        >
          <td :class="movimientoCaja.estado === '1' ? 'text-danger' : ''">
            <p>{{ movimientoCaja.codigo }}</p>
          </td>
          <td>
            <p>{{ movimientoCaja.concepto }}</p>
          </td>
          <td>
            <p>{{ formatearFecha(movimientoCaja.fecha) }}</p>
          </td>
          <td>
            <p>{{ movimientoCaja.hora }}</p>
          </td>
          <td
            :class="
              movimientoCaja.tipo === '1' ? 'text-danger' : 'text-success'
            "
          >
            <p>{{ verFormatoMoneda(movimientoCaja.valor) }}</p>
          </td>
          <td>
            <p>{{ movimientoCaja.usuario }}</p>
          </td>
          <td>
            <button
              data-toggle="modal"
              data-target="#modalEditarMovimientoCaja"
              class="btn btn-outline-warning"
              @click="verDatosModal(movimientoCaja)"
            >
              <span class="icon-Lapiz"></span>
            </button>
          </td>
          <td>
            <button
              class="btn"
              :class="
                movimientoCaja.estado === '1'
                  ? 'btn-outline-success'
                  : 'btn-outline-danger'
              "
              @click="desactivar(movimientoCaja)"
            >
              <span>{{
                movimientoCaja.estado === "1" ? "&#10003;" : "&#x2716;"
              }}</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center" v-else>
      <h3>
        Sin Movimientos de caja, te invitamos a registrar tu primer Movimiento
        🤗
      </h3>
    </div>
    <div
      class="modal fade"
      id="modalEditarMovimientoCaja"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalEditarMovimientoCaja"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Guardar Movimiento de Caja Mayor
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
import FechaUtil from "@/util/FechaUtil";
import MonedaUtil from "@/util/MonedaUtil";
import { mapGetters } from "vuex";
export default {
  props: {
    movimientosCaja: [],
  },
  data() {
    return {
      movimientoCaja: {},
      clientemovimientoCajaGuardar: {
        identificacion: "",
        nombre_completo: "",
      },
      tiposMovimientos: [
        { descripcion: "EGRESO", valor: 1 },
        { descripcion: "INGRESO", valor: 0 },
      ],
    };
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    verFormatoMoneda(numero) {
      return MonedaUtil.verFormatoMoneda(numero);
    },
    formatearFecha(fecha) {
      return FechaUtil.formatearFecha(fecha);
    },
    verDatosModal(movimientoCaja) {
      this.movimientoCaja = { ...movimientoCaja };
    },
    desactivar(movimientoCaja) {
      const datoEnviar = {
        estado: movimientoCaja.estado === "1" ? "0" : "1",
        codigo: movimientoCaja.codigo,
      };
      this.axios
        .post("movimiento_caja_mayor/cambiarestado", datoEnviar)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/movimiento_caja_mayor";
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    async guardarMovimientoCaja() {
      const movimientoCaja = {
        codigo: this.movimientoCaja.codigo,
        concepto: this.movimientoCaja.concepto,
        tipo: this.movimientoCaja.tipo,
        valor: this.movimientoCaja.valor,
        fecha: this.movimientoCaja.fecha,
        hora: this.movimientoCaja.hora,
      };
      try {
        movimientoCaja.usuario_codigo = this.usuario.codigo;
        const respuesta = await this.axios.put(
          "movimiento_caja_mayor",
          movimientoCaja
        );
        if (respuesta.status === 200) {
          window.location.href = "/movimiento_caja_mayor";
          $("#modalEditarMovimientoCaja").modal("hide");
        }
      } catch (error) {
        alert(error.response.data);
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