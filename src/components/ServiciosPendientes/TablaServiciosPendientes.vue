<template>
  <div class="mt-5">
    <table class="table table-responsive-md" v-if="ServiciosPendientes.length > 0">
      <thead class="thead-light">
        <tr>
          <th scope="col">Concepto</th>
          <th scope="col">Fecha</th>
          <th scope="col">Hora</th>
          <th scope="col">Responsable</th>
          <th scope="col">Valor</th>
          <th scope="col">Usuario</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ServicioPendiente in ServiciosPendientes" :key="ServicioPendiente.codigo">
          <td>
            <p>{{ ServicioPendiente.concepto }}</p>
          </td>
          <td>
            <p>{{ formatearFecha(ServicioPendiente.fecha) }}</p>
          </td>
          <td>
            <p>{{ ServicioPendiente.hora }}</p>
          </td>
          <td>
            <p>{{ ServicioPendiente.responsable }}</p>
          </td>
          <td>
            <p>{{ verFormatoMoneda(ServicioPendiente.valor) }}</p>
          </td>
          <td>
            <p>{{ ServicioPendiente.usuario }}</p>
          </td>
          <td>
            <button data-toggle="modal" data-target="#modalGuardarMovimientoCaja" class="btn btn-outline-success"
              @click="verDatosModal(ServicioPendiente)">
              <span>&#36;</span>
            </button>
          </td>
          <td>
            <button data-toggle="modal" data-target="#modalEditarServicioPendiente" class="btn btn-outline-warning"
              @click="verDatosModal(ServicioPendiente)">
              <span class="icon-Lapiz"></span>
            </button>
          </td>
          <td>
            <button class="btn" :class="ServicioPendiente.estado === '1'
                ? 'btn-outline-success'
                : 'btn-outline-danger'
              " @click="desactivar(ServicioPendiente)">
              <span>{{
                ServicioPendiente.estado === "1" ? "&#10003;" : "&#x2716;"
              }}</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center" v-else>
      <h3>
        Sin ServicioPendientes, te invitamos a registrar tu primera ServicioPendiente
        🤗
      </h3>
    </div>
    <div class="modal fade" id="modalEditarServicioPendiente" tabindex="-1" role="dialog" aria-labelledby="modalEditarServicioPendiente"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Actualizar ServicioPendiente
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="ServicioPendiente = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form group">
                <label for="nombrecompleto">Concepto:</label>
                <textarea type="text" placeholder="Concepto" v-model="ServicioPendiente.concepto" class="form-control" />
              </div>
              <div class="form group">
                <label for="nombrecompleto">Responsable:</label>
                <textarea type="text" placeholder="Responsable" v-model="ServicioPendiente.responsable" class="form-control" />
              </div>
              <div class="form-group mt-2">
                <label for="precioUnidad">Valor $:</label>
                <input type="number" placeholder="Valor $" v-model="ServicioPendiente.valor" class="form-control" />
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal" @click="ServicioPendiente = {}">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-success form-control" value="Guardar" @click="guardarServicioPendiente()" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Confirmar Guardar Movimiento Caja -->
    <div class="modal fade" id="modalGuardarMovimientoCaja" tabindex="-1" role="dialog"
      aria-labelledby="modalGuardarMovimientoCaja" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              ¿Pasar como un Ingreso de Caja?
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="ServicioPendiente = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5><b>Concepto:</b> {{ ServicioPendiente.concepto }}</h5> <br>
            <h5><b>Total:</b> {{ verFormatoMoneda(ServicioPendiente.valor) }}</h5>
            <div class="row">
              <div class="col-md-6 mt-3">
                <button type="button" class="btn btn-secondary form-control" data-dismiss="modal" @click="ServicioPendiente = {}">
                  Cancelar
                </button>
              </div>
              <div class="col-md-6 mt-3">
                <input type="button" class="btn btn-success form-control" value="Guardar"
                  @click="guardarMovimientoCaja(ServicioPendiente)" />
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
    ServiciosPendientes: [],
  },
  data() {
    return {
      ServicioPendiente: {}
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
    verDatosModal(ServicioPendiente) {
      this.ServicioPendiente = { ...ServicioPendiente };
    },
    desactivar(ServicioPendiente) {
      const datoEnviar = {
        estado: ServicioPendiente.estado === "1" ? "0" : "1",
        codigo: ServicioPendiente.codigo,
      };
      this.axios
        .post("servicio_pendiente/cambiarestado", datoEnviar)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/servicios_pendientes";
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    async guardarServicioPendiente() {
      const ServicioPendiente = {
        codigo: this.ServicioPendiente.codigo,
        concepto: this.ServicioPendiente.concepto,
        responsable: this.ServicioPendiente.responsable,
        valor: this.ServicioPendiente.valor,
        fecha: this.ServicioPendiente.fecha,
        hora: this.ServicioPendiente.hora,
      };
      try {
        ServicioPendiente.usuario_codigo = this.usuario.codigo;
        const respuesta = await this.axios.put(
          "servicio_pendiente",
          ServicioPendiente
        );
        if (respuesta.status === 200) {
          window.location.href = "/servicios_pendientes";
          $("#modalEditarServicioPendiente").modal("hide");
        }
      } catch (error) {
        alert(error.response.data);
      }
    },
    guardarMovimientoCaja(ServicioPendiente) {
      const movimientoCaja = {
        tipo: 0,
        codigo: ServicioPendiente.codigo,
        concepto: 'Pago del Pendiente: ' + ServicioPendiente.concepto + '. De ' + ServicioPendiente.responsable + ' en la Fecha: ' + FechaUtil.formatearFecha(ServicioPendiente.fecha),
        valor: ServicioPendiente.valor,
        fecha: FechaUtil.fechaActual(),
        hora: FechaUtil.horaActual(),
      };
      movimientoCaja.usuario_codigo = this.usuario.codigo;
      this.axios
        .post("movimiento_caja", movimientoCaja)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.desactivar(ServicioPendiente)
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