<template>
  <div class="text-center">
    <div v-if="usuario !== null">
      <h3 class="text-success mb-4 titulo-principal">Ventas</h3>
      <button type="button" class="btn btn-success" @click="nuevaVenta()">
        Guardar una nueva Venta
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
            <button class="btn btn-success" @click="verventas()">Buscar</button>
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
                @keypress.enter="verventas()"
                :disabled="usuario.rol_codigo === 2"
              />
              <button class="btn btn-success" @click="verventas()">
                &#128269;
              </button>
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-success mt-2" @click="verTotal()">
        Ver Total
      </button>
      <div class="mt-4">
        <h5>
          Total Ventas: <b> {{ verFormatoMoneda(total) }}</b>
        </h5>
      </div>
      <TablaVentas :ventas="ventas" />
    </div>
    <div v-else>
      <h4>Su rol no tiene permisos para ver esta información</h4>
    </div>
  </div>
</template>
<script>
import MonedaUtil from "@/util/MonedaUtil";
import TablaVentas from "@/components/ventas/TablaVentas";
import { mapGetters } from "vuex";
import Mensaje from "@/components/Mensaje.vue";
export default {
  components: { Mensaje, TablaVentas },
  data() {
    return {
      venta: {},
      ventas: [],
      mensaje: { ver: false },
      condiciones: [
        { descripcion: "NÚMERO", valor: "v.codigo" },
        { descripcion: "CLIENTE", valor: "c.nombre_completo" },
        { descripcion: "C.C CLIENTE", valor: "c.identificacion" },
        { descripcion: "USUARIO", valor: "u.nombre_completo" },
      ],
      tipoBusqueda: [
        { descripcion: "BUSCAR POR CONDICIÓN", valor: 1 },
        { descripcion: "BUSCAR ENTRE FECHAS", valor: 2 },
        { descripcion: "BUSCAR ENTRE FECHAS MÁS CONDICIÓN", valor: 3 },
      ],
      buscarPor: 1,
      condicion: "v.codigo",
      buscar: "",
      total: 0,
    };
  },
  created() {
    this.cargarFechaActual();
    this.validacionesParaUsuario();
    this.verventas();
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
    verFormatoMoneda(numero) {
      return MonedaUtil.verFormatoMoneda(numero);
    },
    nuevaVenta() {
      this.$router.push({ name: "NuevaVenta" });
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
    verventas() {
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
        .post("venta/buscarporcondicion", buscarPor)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.ventas = respuesta.data;
          }
        });
    },
    verTotal() {
      const ventas = this.ventas;
      let total = 0;
      for (const venta of ventas) {
        if (venta.estado === "0") {
          total += venta.total;
        }
      }
      this.total = total;
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