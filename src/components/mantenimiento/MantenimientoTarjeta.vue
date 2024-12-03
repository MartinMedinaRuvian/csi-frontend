<template>
  <div>
    <div class="container-principal mt-5">
      <h4 class="mb-5 text-danger">Mantenimientos
        <span>
          <v-btn class="ml-2 botones-icon" data-toggle="modal" data-target="#modalGuardarMantenimiento">
                <v-icon icon="mdi-note-plus"></v-icon>
                <v-tooltip activator="parent" location="top">Agregar</v-tooltip>
                </v-btn>
        </span>
      </h4>

      <div id="dialog-window">
        <div id="scrollable-content" class="containe-imagenes">


          <table class="table table-responsive-md" v-if="mantenimientos && mantenimientos.length > 0">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Código</th>
                <th scope="col" width="50%">Observación</th>
                <th scope="col">Realizado Por</th>
                <th scope="col">Fecha</th>
                <th scope="col" width="20%">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="mantenimiento in mantenimientos" :key="mantenimiento.id">
                <td>
                  <p>{{ mantenimiento.codigo }}</p>
                </td>
                <td>
                  <p>{{ mantenimiento.observacion }}</p>
                </td>
                <td>
                  <p>{{ mantenimiento.realizado_por }}</p>
                </td>
                <td>
                  <p>{{ formatearFecha(mantenimiento.fecha) }}</p>
                </td>
                <td>
                  <span>
                    <v-btn class="botones-icon mr-5" @click="verMantenimiento(mantenimiento)">
                      <v-icon icon="mdi-eye-outline"></v-icon>
                      <v-tooltip activator="parent" location="top">Ver</v-tooltip>
                    </v-btn>
                  </span>
                  <span>
                      <v-btn v-if="usuario.rol_id === 1" class="botones-icon" data-toggle="modal"
                      data-target="#modalEliminarMantenimiento" @click="verDatosModal(mantenimiento)">
                      <v-icon icon="mdi-delete"></v-icon>
                      <v-tooltip activator="parent" location="top">Quitar</v-tooltip>
                    </v-btn>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="container-no_registros">
            <span>
              <v-icon color="grey-darken-3" icon="mdi-file-remove-outline"></v-icon>
            </span>
            <span>
              <h5>Sin Registros</h5>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modalGuardarMantenimiento" tabindex="-1" role="dialog"
      aria-labelledby="modalGuardarMantenimiento" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Guardar Mantenimiento
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
              @click="agregarNuevoMantenimiento()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div>
                <v-autocomplete label="Buscar Mantenimiento Existente" v-model="mantenimiento.id"
                  :items="mantenimientosExistentes" :item-title="titulosAutocompleteMantenimientosExistentes"
                  item-value="id" :filter="filterAutocompleteMantenimientosExistentes">
                </v-autocomplete>
                <button class="btn btn-success" @click="buscarInfoMantenimientoExistente()"
                  v-if="mantenimiento.id !== null && mantenimiento.id !== undefined">Agregar mantenimiento
                  Seleccionado</button>
              </div>

              <button class="btn btn-success mt-5" @click="agregarNuevoMantenimiento()"
                v-if="mantenimiento.id !== null && mantenimiento.id !== undefined">Agregar Nuevo</button>

              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">Código:</label>
                <input :disabled="esExistente" type="text" placeholder="Ingrese Código" v-model="mantenimiento.codigo"
                  class="form-control" />
              </div>

              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">Realizado Por:</label>
                <input :disabled="esExistente" type="text" placeholder="Ingrese el Realizado Por"
                  v-model="mantenimiento.realizado_por" class="form-control" />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo" class="requerido">Observación:</label>
                  <textarea :disabled="esExistente" type="text" placeholder="Ingrese una observación"
                    v-model="mantenimiento.observacion" class="form-control" />
                </div>
              </div>


              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">Fecha:</label>
                <input :disabled="esExistente" type="date" placeholder="Fecha" v-model="mantenimiento.fecha"
                  class="form-control" />
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                    @click="agregarNuevoMantenimiento()">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-success form-control" value="Guardar" @click="guardar()" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Eliminar -->
    <div class="modal fade" id="modalEliminarMantenimiento" tabindex="-1" role="dialog"
      aria-labelledby="modalEliminarMantenimiento" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Quitar Mantenimiento
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
              @click="agregarNuevoMantenimiento()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-4">
                <p>¿ Desea <b>Quitar</b> el Mantenimiento: <br> <b>{{ mantenimiento.codigo }}</b> del {{ info_tabla.nombre_tabla }} ?</p>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                    @click="agregarNuevoMantenimiento()">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-danger form-control" value="Quitar"
                    @click="eliminarMantenimiento()" />
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
import { mapGetters } from "vuex";
import FechaUtil from "@/util/FechaUtil";
export default {
  props: {
    mantenimientos: [],
    info_tabla: {},
    info_edificio: {},
    info_centro_cableado: {},
    info_gabinete: {},
    info_elemento: {}
  },
  data() {
    return {
      mantenimiento: {},
      ruta_servidor: this.axios.defaults.baseURL,
      urlSinImagen: this.axios.defaults.baseURL + '/mantenimientos/mantenimiento_default.svg',
      urlImg: '',
      mantenimientosExistentes: [],
      esExistente: false
    };
  },
  created() {
    this.verFechaActual()
    this.verInfoPrincipalMantenimientosExistentes()
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    verFechaActual() {
      this.mantenimiento.fecha = FechaUtil.fechaActual()
    },
    titulosAutocompleteMantenimientosExistentes(item) {
      return `${item.codigo} - ${this.observacionVer(item.observacion)} - ${item.realizado_por}`;
    },
    observacionVer(observacion) {
      const limiteTexto = 50
      return observacion && observacion.length >= limiteTexto ? observacion.slice(0, limiteTexto) + '...' : observacion
    },
    filterAutocompleteMantenimientosExistentes(item, queryText, itemText) {
      return (
        item.observacion
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1
      );
    },
    verInfoPrincipalMantenimientosExistentes() {
      this.axios.get("/mantenimiento").then((respuesta) => {
        if (respuesta.status === 200) {
          this.mantenimientosExistentes = respuesta.data;
        }
      });
    },
    buscarInfoMantenimientoExistente() {
      const idMantenimiento = this.mantenimiento.id
      this.axios.get("/mantenimiento/" + idMantenimiento).then((respuesta) => {
        if (respuesta.status === 200) {
          this.mantenimiento = respuesta.data;
          this.mantenimiento.fecha = FechaUtil.formatearFecha(this.mantenimiento.fecha)
          this.esExistente = true
        }
      });
    },
    agregarNuevoMantenimiento() {
      this.mantenimiento = {}
      this.esExistente = false
      this.verFechaActual()
    },
    guardar() {
      const registroGuardar = this.mantenimiento
      const registro = {
        codigo: registroGuardar.codigo,
        realizado_por: registroGuardar.realizado_por,
        observacion: registroGuardar.observacion,
        fecha: registroGuardar.fecha
      }
      const nombreTabla = "mantenimiento"
      this.axios.post(nombreTabla + '/' + this.info_tabla.nombre_tabla + '/' + this.info_tabla.id, registro).then((respuesta) => {
        if (respuesta.status === 200) {
          location.reload()
        }
      }).catch(error => console.log(error))
    },
    eliminarMantenimiento() {
      const idMantenimiento = this.mantenimiento.id
      this.axios.delete('mantenimiento/eliminar_mantenimiento_tabla/' + this.info_tabla.nombre_tabla + '/' + this.info_tabla.id + '/' + idMantenimiento).then((respuesta) => {
        if (respuesta.status === 200) {
          location.reload()
        }
      }).catch(error => console.log(error))
    },
    verDatosModal(dato) {
      this.mantenimiento = { ...dato };
    },
    verTablaRutaVolver(nombreTabla) {
      const tabla = nombreTabla.replace('_', '-')
      return tabla
    },
    verMantenimiento(mantenimiento) {
      const datosRegistro = {
        id: mantenimiento.id,
        id_volver: this.info_tabla.id,
        ruta_volver: this.verTablaRutaVolver(this.info_tabla.nombre_tabla),
        info_edificio: this.info_edificio,
        info_centro_cableado: this.info_centro_cableado,
        info_gabinete: this.info_gabinete,
        info_elemento: this.info_elemento
      }
      this.$router.push({
        name: "Mantenimiento",
        query: { registro: JSON.stringify(datosRegistro) },
      });
    },
    formatearFecha(fecha) {
      return FechaUtil.formatearFecha(fecha);
    },
  }
};
</script>

<style scoped>
.container-principal {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  /* Para que el contenido dentro de .container-principal esté en una columna */
}

.card {
  margin-bottom: 20px;
  border-radius: 10px;
}

.card-header {
  position: relative;
  text-align: center;
}

.card-header img {
  width: 120px;
  /* Ancho fijo */
  height: 120px;
  /* Alto fijo */
  border-top-left-radius: .25rem;
  border-top-right-radius: .25rem;
  object-fit: cover;
  /* Asegura que la imagen se ajuste bien al contenedor */
}

.card-header .numero {
  position: absolute;
  top: 0px;
  /* Mueve el número hacia la parte superior */
  left: 0px;
  /* Mueve el número hacia la izquierda */
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-top-left-radius: 10px;
  font-size: 20px;
}

.card-body {
  background-color: #f8f9fa;
}

#imagenPrevisualizacion {
  width: 80px;
  height: 80px;
}

#imagenInfo {
  width: 80px;
  height: 80px;
}

.requerido::before {
  content: "* ";
  /* Agrega el asterisco */
  color: red;
  /* Asterisco de color rojo */
  font-weight: bold;
  /* Opcional, para darle más énfasis */
}

.card-body p {
  font-size: 15px;
}

.icono {
  font-size: 80px;
}

.btn-eliminar_item {
  font-size: 10px;
}

.texto-mediano {
  font-size: 15px;
}

.pointer-hand {
  cursor: pointer;
}

#dialog-window {
  width: 100%;
  height: 250px;
  margin-bottom: 40px;
}

#scrollable-content {
  height: 250px;
  overflow: auto;
  border: solid 0.5px #212121;
  border-radius: 10px;
  background-color: #fff;
}

#imagenProyectoVer {
  width: 100%;
  height: 300px;
}

.texto-proyectos {
  width: 85%;
  word-wrap: break-word !important;
}

.texto-proyectos p {
  font-size: 15px;
}

.botones-proyectos {
  width: 15%;
}

.input-password,
.input-buscar {
  display: flex;
  align-content: center;
  align-items: center;
}

#scrollable-content li {
  background-color: #FFF59D;
  color: #000 ;
}

.container-no_registros {
  margin-top: 40px;
}
.container-no_registros span {
  font-size: 60px;
}

.botones-icon {
  font-size: 25px;
  color: #00B0FF;
  background-color: #fff;
  border: solid #fff;
}
</style>
