<template>
  <div class="text-center">
    <h3 class="text-success mb-4 titulo-principal">Logs - Históricos</h3>
    <div class="container">
      <div class="row">
        <div class="form-group col-md-12">
          <label for="select">Forma de busqueda:</label>
          <select id="select" class="form-select form-control" aria-label="Default select example" v-model="buscarPor"
            @change="paginaActual = 1">
            <option :value="buscar.valor" v-for="buscar in tipoBusqueda" :key="buscar.valor" class="text-success">
              {{ buscar.descripcion }}
            </option>
          </select>
        </div>
      </div>
      <div class="row" v-if="buscarPor !== 1">
        <div class="form-group col-md-6">
          <label for="fecha">Fecha Inicial:</label>
          <input type="date" class="form-control" id="fecha" v-model="fechaInicial" :max="maximaFecha"
            @change="paginaActual = 1" />
        </div>
        <div class="form-group col-md-6">
          <label for="fecha">Fecha Final:</label>
          <input type="date" class="form-control" id="fecha" v-model="fechaFinal" :max="maximaFecha"
            @change="paginaActual = 1" />
        </div>
        <div class="form-group col-md-12" v-if="buscarPor === 2">
          <button class="btn btn-success" @click="verLogs()">Buscar</button>
        </div>
      </div>
      <div class="row" v-if="buscarPor !== 2">
        <div class="form-group col-md-6">
          <label for="select">Condicion:</label>
          <select id="select" class="form-select form-control" aria-label="Default select example" v-model="condicion"
            @change="paginaActual = 1">
            <option :value="condicion.valor" v-for="condicion in condiciones" :key="condicion.valor"
              class="text-success">
              {{ condicion.descripcion }}
            </option>
          </select>
        </div>
        <div class="form-group col-md-6">
          <label for="select">Buscar:</label>
          <div class="input-buscar">
            <input class="form-control" type="text" v-model="buscar" @keypress.enter="verLogs()"
              @keyup="paginaActual = 1" />
            <button class="btn btn-success" @click="verLogs()">
              &#128269;
            </button>
          </div>
        </div>
      </div>
    </div>
    <TablaLogs :logs="logs" />
    <div class="paginacion">
      <button :disabled="paginaActual === 1" @click="cambiarPagina(paginaActual - 1)" class="btn btn-success mr-2">
        &laquo;
      </button>

      <button v-for="pagina in paginasVisibles" :key="pagina" @click="cambiarPagina(pagina)"
        :class="['mr-2 btn', pagina === paginaActual ? 'btn-success' : 'btn-outline-success']">
        {{ pagina }}
      </button>

      <button :disabled="paginaActual === Math.ceil(totalRegistros / registrosPorPagina)"
        @click="cambiarPagina(paginaActual + 1)" class="btn btn-success">
        &raquo;
      </button>
    </div>


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
      totalRegistros: 0,
      paginaActual: 1,
      registrosPorPagina: 10
    };
  },
  computed: {
    totalPaginas() {
      return Math.ceil(this.totalRegistros / this.registrosPorPagina);
    },
    paginasVisibles() {
      const totalPaginas = Math.ceil(this.totalRegistros / this.registrosPorPagina);
      const paginasPorMostrar = 5; // Número de páginas visibles
      const inicio = Math.max(1, this.paginaActual - Math.floor(paginasPorMostrar / 2));
      const fin = Math.min(totalPaginas, inicio + paginasPorMostrar - 1);

      // Asegurarnos de que el rango sea fijo
      const paginas = [];
      for (let i = inicio; i <= fin; i++) {
        paginas.push(i);
      }
      return paginas;
    },
  },
  created() {
    this.cargarFechaActual()
    this.verLogs();
  },
  methods: {
    cambiarPagina(pagina) {
      if (pagina > 0 && pagina <= this.totalPaginas) {
        this.paginaActual = pagina;
        this.verLogs();
      }
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
    verLogs() {
      let buscarPor = {
        limite: this.registrosPorPagina,
        pagina: this.paginaActual,
      };

      if (this.buscarPor === 1) {
        // Buscar por condición
        buscarPor = {
          ...buscarPor,
          condicion: this.condicion,
          buscar: this.buscar,
          buscarPor: this.buscarPor
        };
      } else if (this.buscarPor === 2) {
        // Buscar entre fechas
        buscarPor = {
          ...buscarPor,
          fechaInicial: this.convertirDateaTimestamp(this.fechaInicial, 'INICIAL'),
          fechaFinal: this.convertirDateaTimestamp(this.fechaFinal, 'FINAL'),
          buscarPor: this.buscarPor
        };
      } else if (this.buscarPor === 3) {
        // Buscar entre fechas más condición
        buscarPor = {
          ...buscarPor,
          condicion: this.condicion,
          buscar: this.buscar,
          fechaInicial: this.convertirDateaTimestamp(this.fechaInicial, 'INICIAL'),
          fechaFinal: this.convertirDateaTimestamp(this.fechaFinal, 'FINAL'),
          buscarPor: this.buscarPor
        };
      }

      // Realiza la llamada al endpoint correspondiente
      this.axios
        .post("/log/buscarporcondicion", buscarPor)
        .then((respuesta) => {
          this.logs = respuesta.data.datos;
          this.totalRegistros = respuesta.data.total;
        })
        .catch((error) => {
          console.error("Error al obtener logs:", error);
        });
    },
    convertirDateaTimestamp(fecha, tipo) {
      const fechaMostrar = tipo === 'INICIAL' ? fecha + ' 00:00:00' : fecha + ' 23:59:59'
      return fechaMostrar
    },
    reiniciarPaginacion() {
      this.paginaActual = 1
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
</style>