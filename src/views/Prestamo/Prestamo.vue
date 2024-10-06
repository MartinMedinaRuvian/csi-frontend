<template>
  <div class="text-center">
    <div v-if="usuario !== null">
      <h3 class="text-success mb-4 titulo-principal">Prestamos</h3>

      <button type="button" class="btn btn-success" @click="nuevoprestamo()">
        Guardar un nuevo Prestamo
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
            />
          </div>
          <div class="form-group col-md-12" v-if="buscarPor === 2">
            <button class="btn btn-success" @click="verprestamos()">
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
                @keypress.enter="verprestamos()"
              />
              <button class="btn btn-success" @click="verprestamos()">
                &#128269;
              </button>
            </div>
          </div>
        </div>
      </div>
      <TablaPrestamos :prestamos="prestamos" />
    </div>
    <div v-else>
      <h4>Su rol no tiene permisos para ver esta información</h4>
    </div>
  </div>
</template>
<script>
import TablaPrestamos from "@/components/prestamos/TablaPrestamos";
import { mapGetters } from "vuex";
import Mensaje from "@/components/Mensaje.vue";
export default {
  components: { Mensaje, TablaPrestamos },
  data() {
    return {
      prestamo: {},
      prestamos: [],
      mensaje: { ver: false },
      condiciones: [
        { descripcion: "NÚMERO", valor: "p.codigo" },
        { descripcion: "OBSERVACIÓN", valor: "p.observacion" },
        { descripcion: "CLIENTE", valor: "c.nombre_completo" },
        { descripcion: "C.C CLIENTE", valor: "c.identificacion" },
        { descripcion: "PRODUCTO", valor: "p.descripcion" },
        { descripcion: "S/N PRODUCTO", valor: "p.codigo_serie" },
        { descripcion: "USUARIO", valor: "u.nombre_completo" },
      ],
      tipoBusqueda: [
        { descripcion: "BUSCAR POR CONDICIÓN", valor: 1 },
        { descripcion: "BUSCAR ENTRE FECHAS", valor: 2 },
        { descripcion: "BUSCAR ENTRE FECHAS MÁS CONDICIÓN", valor: 3 },
      ],
      buscarPor: 1,
      condicion: "p.codigo",
      buscar: "",
    };
  },
  created() {
    this.cargarFechaActual();
    this.verprestamos();
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    nuevoprestamo() {
      this.$router.push({ name: "NuevoPrestamo" });
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
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    guardarprestamo() {
      this.prestamo.usuario_codigo = this.usuario.codigo;
      this.axios
        .post("prestamo", this.prestamo)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.$router.push('/prestamos')
            //window.location.href = "/prestamos";
            $("#modalGuardarprestamo").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
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
    verprestamos() {
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
        .post("prestamo/buscarporcondicion", buscarPor)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.prestamos = respuesta.data;
          }
        });
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