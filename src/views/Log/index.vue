<template>
  <div class="text-center">
    <h3 class="text-success mb-4 titulo-principal">Logs - Históricos</h3>
    <div class="container">
      <div class="row">
        <div class="form-group col-md-12">
          <label for="select">Forma de busqueda:</label>
          <select id="select" class="form-select form-control" aria-label="Default select example" v-model="buscarPor">
            <option :value="buscar.valor" v-for="buscar in tipoBusqueda" :key="buscar.valor" class="text-success">
              {{ buscar.descripcion }}
            </option>
          </select>
        </div>
      </div>
      <div class="row" v-if="buscarPor !== 1">
        <div class="form-group col-md-6">
          <label for="fecha">Fecha Inicial:</label>
          <input type="date" class="form-control" id="fecha" v-model="fechaInicial" :max="maximaFecha" />
        </div>
        <div class="form-group col-md-6">
          <label for="fecha">Fecha Final:</label>
          <input type="date" class="form-control" id="fecha" v-model="fechaFinal" :max="maximaFecha" />
        </div>
        <div class="form-group col-md-12" v-if="buscarPor === 2">
          <button class="btn btn-success" @click="verLogs()">Buscar</button>
        </div>
      </div>
      <div class="row" v-if="buscarPor !== 2">
        <div class="form-group col-md-6">
          <label for="select">Condicion:</label>
          <select id="select" class="form-select form-control" aria-label="Default select example" v-model="condicion">
            <option :value="condicion.valor" v-for="condicion in condiciones" :key="condicion.valor"
              class="text-success">
              {{ condicion.descripcion }}
            </option>
          </select>
        </div>
        <div class="form-group col-md-6">
          <label for="select">Buscar:</label>
          <div class="input-buscar">
            <input class="form-control" type="text" v-model="buscar" @keypress.enter="verLogs()" />
            <button class="btn btn-success" @click="verLogs()">
              &#128269;
            </button>
          </div>
        </div>
      </div>
    </div>
    <TablaLogs :logs="logs" />
  </div>
</template>
<script>
import TablaLogs from "@/components/logs/TablaLog";
export default {
  data() {
    return {
      logs: [],
      condiciones: [
        { descripcion: "EMAIL USUARIO", valor: "email_usuario" },
        { descripcion: "ID USUARIO", valor: "id_usuario" },
        { descripcion: "ACCIÓN", valor: "accion" },
        { descripcion: "OBSERVACIÓN", valor: "observacion" }
      ],
      tipoBusqueda: [
        { descripcion: "BUSCAR POR CONDICIÓN", valor: 1 },
        { descripcion: "BUSCAR ENTRE FECHAS", valor: 2 },
        { descripcion: "BUSCAR ENTRE FECHAS MÁS CONDICIÓN", valor: 3 },
      ],
      buscarPor: 1,
      condicion: "email_usuario",
      buscar: "",
      fechaInicial: null,
      fechaFinal: null,
    };
  },
  created() {
    this.cargarFechaActual()
    this.verLogs();
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
    verLogs() {
      let buscarPor = {
        condicion: this.condicion,
        buscar: this.buscar,
      };
      if (this.buscarPor === 2) {
        buscarPor = {
          fechaInicial: this.convertirDateaTimestamp(this.fechaInicial, 'INICIAL'),
          fechaFinal: this.convertirDateaTimestamp(this.fechaFinal, 'FINAL'),
        };
      } else if (this.buscarPor === 3) {
        buscarPor = {
          condicion: this.condicion,
          buscar: this.buscar,
          fechaInicial: this.convertirDateaTimestamp(this.fechaInicial, 'INICIAL'),
          fechaFinal: this.convertirDateaTimestamp(this.fechaFinal, 'FINAL'),
        };
      }
      buscarPor.buscarPor = this.buscarPor;
      buscarPor.limite = this.limite;

      this.axios
        .post("/log/buscarporcondicion", buscarPor)
        .then((respuesta) => {
          this.logs = respuesta.data;
        });
    },
    convertirDateaTimestamp(fecha, tipo){
      const fechaMostrar = tipo === 'INICIAL' ? fecha + ' 00:00:00' : fecha + ' 23:59:59'
      return fechaMostrar
    }
  },
  components: {
    TablaLogs,
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

.requerido::before {
  content: "* ";
  /* Agrega el asterisco */
  color: red;
  /* Asterisco de color rojo */
  font-weight: bold;
  /* Opcional, para darle más énfasis */
}
</style>