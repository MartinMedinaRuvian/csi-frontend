<template>
  <div class="text-center">
    <div v-if="usuario !== null">
      <h3 class="text-success mb-4 titulo-principal">Reparaciones</h3>

      <button type="button" class="btn btn-success" @click="nuevareparacion()">
        Guardar una nueva reparación
      </button>

      <!-- Modal -->
      <div
        class="modal fade"
        id="modalGuardarreparacion"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modalGuardarreparacion"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header bg-success">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Guardar reparacion
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
                    <label for="Reportefinal">Reporte Final:</label>
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
                      value="Guardar"
                      @click="guardarreparacion()"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
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
            <button class="btn btn-success" @click="verReparaciones()">
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
                @keypress.enter="verReparaciones()"
              />
              <button class="btn btn-success" @click="verReparaciones()">
                &#128269;
              </button>
            </div>
          </div>
        </div>
      </div>
      <TablaReparaciones :reparaciones="reparaciones" />
    </div>
    <div v-else>
      <h4>Su rol no tiene permisos para ver esta información</h4>
    </div>
  </div>
</template>
<script>
import TablaReparaciones from "@/components/reparaciones/TablaReparaciones";
import { mapGetters } from "vuex";
import Mensaje from "@/components/Mensaje.vue";
export default {
  components: { Mensaje, TablaReparaciones },
  data() {
    return {
      reparacion: {},
      reparaciones: [],
      mensaje: { ver: false },
      condiciones: [
        { descripcion: "NÚMERO", valor: "r.codigo" },
        { descripcion: "REPORTE TÉCNICO", valor: "r.reporte_tecnico" },
        { descripcion: "REPORTE FINAL", valor: "r.reporte_final" },
        { descripcion: "CLIENTE", valor: "c.nombre_completo" },
        { descripcion: "C.C CLIENTE", valor: "c.identificacion" },
        { descripcion: "DISPOSITIVO", valor: "d.descripcion" },
        { descripcion: "S/N DISPOSITIVO", valor: "d.codigo_serie" },
        { descripcion: "MODELO DISPOSITIVO", valor: "d.modelo" },
        { descripcion: "MARCA DISPOSITIVO", valor: "d.marca" },
        { descripcion: "USUARIO", valor: "u.nombre_completo" },
      ],
      tipoBusqueda: [
        { descripcion: "BUSCAR POR CONDICIÓN", valor: 1 },
        { descripcion: "BUSCAR ENTRE FECHAS", valor: 2 },
        { descripcion: "BUSCAR ENTRE FECHAS MÁS CONDICIÓN", valor: 3 },
      ],
      buscarPor: 1,
      condicion: "r.codigo",
      buscar: "",
      clientes: [],
      dispositivos: [],
    };
  },
  created() {
    this.cargarFechaActual();
    this.verReparaciones();
    this.verClientes();
    this.verDispositivos();
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    nuevareparacion() {
      this.$router.push({ name: "NuevaReparacion" });
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
            this.$router.push('/reparaciones')
            //window.location.href = "/reparaciones";
            $("#modalGuardarreparacion").modal("hide");
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
    verReparaciones() {
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
        .post("reparacion/buscarporcondicion", buscarPor)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.reparaciones = respuesta.data;
          }
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
<style>
.input-buscar {
  display: flex;
  align-content: center;
  align-items: center;
}
</style>