<template>
  <div>
    <div class="container-principal_proyectos">
      <h5 class="mb-1 mt-3 text-danger mb-5">Proyectos
        <v-btn class="ml-2 botones-icon" data-toggle="modal" data-target="#modalGuardarProyecto">
                <v-icon icon="mdi-note-plus"></v-icon>
                <v-tooltip activator="parent" location="top">Agregar</v-tooltip>
                </v-btn>
      </h5>

      <div id="dialog-window">
        <div class="row mt-2">
          <div class="form-group col-md-6">
            <label for="select"><v-icon icon="mdi-filter"></v-icon> Filtro:</label>
            <select id="select" class="form-select form-control" aria-label="Default select example"
              v-model="condicion">
              <option :value="condicion.valor" v-for="condicion in condiciones" :key="condicion.valor"
                class="text-success">
                {{ condicion.descripcion }}
              </option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="select">Buscar:</label>
            <div class="input-buscar">
              <input class="form-control" type="text" v-model="buscar" @keypress.enter="filtrar()" />
              <v-btn class="ml-2 botones-icon" @click="filtrar()">
                <v-icon icon="mdi-card-search"></v-icon>
                <v-tooltip activator="parent" location="top">Buscar</v-tooltip>
                </v-btn>
            </div>
          </div>
        </div>
        <div id="scrollable-content" class="containe-imagenes mb-5">

          <table class="table text-center table-responsive-md" v-if="(proyectos != null || proyectos != undefined)
            && proyectos.length > 0">
            <thead class="thead-dark">
              <tr>
                <th scope="col"># Contrato</th>
                <th scope="col" width="70%">Objeto</th>
                <th scope="col" width="20%">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="proyecto in proyectos" :key="proyecto.id">
                <td>
                  <p>{{ proyecto.codigo }}</p>
                </td>
                <td>
                  <p>{{ proyecto.descripcion }}</p>
                </td>
                <td>
                  <span>
                    <v-btn class="botones-icon mr-5" @click="verProyecto(proyecto)">
                      <v-icon icon="mdi-eye-outline"></v-icon>
                      <v-tooltip activator="parent" location="top">Ver</v-tooltip>
                    </v-btn>
                  </span>
                  <span>
                    <v-btn v-if="usuario.rol_id === 1" class="botones-icon" data-toggle="modal"
                    data-target="#modalEliminarProyectoTabla" @click="verDatosModal(proyecto)">
                      <v-icon icon="mdi-delete"></v-icon>
                      <v-tooltip activator="parent" location="top">Eliminar</v-tooltip>
                    </v-btn>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="container-no_registros text-center">
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
    <div class="modal fade" id="modalGuardarProyecto" tabindex="-1" role="dialog" aria-labelledby="modalGuardarProyecto"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content text-center">
          <div class="modal-header bg-danger">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Guardar Proyecto
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="proyecto = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div>
                <v-autocomplete label="Buscar Proyecto Existente" v-model="proyecto.id" :items="proyectosExistentes"
                  :item-title="titulosAutocompleteProyectosExistentes" item-value="id"
                  :filter="filterAutocompleteTipotitulosAutocompleteProyectosExistentes">
                </v-autocomplete>
                <button class="btn btn-success" @click="buscarInfoProyectoExistente()"
                  v-if="proyecto.id !== null && proyecto.id !== undefined">Agregar Proyecto Seleccionado</button>
              </div>

              <button class="btn btn-success mt-5" @click="agregarNuevoProyecto()"
                v-if="proyecto.id !== null && proyecto.id !== undefined">Agregar Nuevo</button>

              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">Número Contrato:</label>
                <input :disabled="esProyectoExistente" type="text" placeholder="Ingrese Código"
                  v-model="proyecto.codigo" class="form-control" />
              </div>

              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">Objeto:</label>
                <input :disabled="esProyectoExistente" type="text" placeholder="Ingrese la Descripción"
                  v-model="proyecto.descripcion" class="form-control" />
              </div>

              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">Nombre del Contratista:</label>
                <input :disabled="esProyectoExistente" type="text" placeholder="Ingrese el Nombre de la Empresa"
                  v-model="proyecto.nombre_empresa" class="form-control" />
              </div>

              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">NIT del Contratista:</label>
                <input :disabled="esProyectoExistente" type="text" placeholder="Ingrese el NIT de la Empresa"
                  v-model="proyecto.nit_empresa" class="form-control" />
              </div>

              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">Fecha Ejecución:</label>
                <input :disabled="esProyectoExistente" type="date" placeholder="Fecha" v-model="proyecto.fecha"
                  class="form-control" />
              </div>

              <div class="form group mt-3">
                <label for="nombrecompleto">Código Certificación:</label>
                <input :disabled="esProyectoExistente" type="text" placeholder="Certificación"
                  v-model="proyecto.certificacion" class="form-control" />
              </div>


              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                    @click="proyecto = {}">
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
    <div class="modal fade" id="modalEliminarProyecto" tabindex="-1" role="dialog"
      aria-labelledby="modalEliminarProyecto" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content text-center">
          <div class="modal-header bg-danger">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Eliminar Proyecto
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="proyecto = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-4">
                <p>Proyecto: <br> {{ proyecto.codigo }}</p>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                    @click="proyecto = {}">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-danger form-control" value="Eliminar"
                    @click="eliminarProyecto()" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Eliminar Proyecto Tabla -->
    <div class="modal fade" id="modalEliminarProyectoTabla" tabindex="-1" role="dialog"
      aria-labelledby="modalEliminarProyectoTabla" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content text-center">
          <div class="modal-header bg-danger">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Quitar Proyecto
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="proyecto = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-4">
                <p>¿ Desea <b>Quitar</b> el Proyecto: <br> <b>{{ proyecto.codigo }}</b> del {{ info_tabla.nombre_tabla }} ?</p>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                    @click="proyecto = {}">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-danger form-control" value="Quitar"
                    @click="eliminarSoloProyectoTabla()" />
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
    proyectos: [],
    info_tabla: {},
    info_edificio: {},
    info_centro_cableado: {},
    info_gabinete: {},
    info_elemento: {}
  },
  data() {
    return {
      proyecto: {},
      ruta_servidor: this.axios.defaults.baseURL,
      urlSinImagen: this.axios.defaults.baseURL + '/proyectos/proyecto_default.svg',
      urlImg: '',
      proyectosExistentes: [],
      esProyectoExistente: false,
      condiciones: [
        { descripcion: "CÓDIGO", valor: "p.codigo" },
        { descripcion: "DESCRIPCIÓN", valor: "p.descripcion" }
      ],
      condicion: 'p.codigo',
      buscar: '',
    };
  },
  created() {
    this.verFechaActual(),
      this.verInfoPrincipalProyectosExistentes()
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    filtrar() {
      const datosEnviar = {
        condicion: this.condicion,
        buscar: this.buscar
      }
      console.log(datosEnviar)
      this.$emit('filtrar', datosEnviar)
    },
    verFechaActual() {
      this.proyecto.fecha = FechaUtil.fechaActual()
    },
    titulosAutocompleteProyectosExistentes(item) {
      return `${item.codigo} - ${item.descripcion}`;
    },
    filterAutocompleteProyectosExistentes(item, queryText, itemText) {
      return (
        item.descripcion
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1
      );
    },
    guardar() {
      const registroGuardar = this.proyecto
      const registro = {
        codigo: registroGuardar.codigo,
        descripcion: registroGuardar.descripcion,
        nombre_empresa: registroGuardar.nombre_empresa,
        nit_empresa: registroGuardar.nit_empresa,
        certificacion: registroGuardar.certificacion,
        fecha: registroGuardar.fecha
      }
      const nombreTabla = "proyecto"
      this.axios.post(nombreTabla + '/' + this.info_tabla.nombre_tabla + '/' + this.info_tabla.id, registro).then((respuesta) => {
        if (respuesta.status === 200) {
          location.reload()
        }
      }).catch(error => console.log(error))
    },
    eliminarProyecto() {
      const nombreTabla = this.info_tabla.nombre_tabla
      const id = this.info_tabla.id
      const idProyecto = this.proyecto.id
      this.axios
        .delete("proyecto/" + nombreTabla + "/" + id + "/" + idProyecto)
        .then((respuesta) => {
          if (respuesta.status == 200) {
            location.reload()
          }
        });
    },
    verDatosModal(dato) {
      this.proyecto = { ...dato };
    },
    verTablaRutaVolver(nombreTabla) {
      const tabla = nombreTabla.replace('_', '-')
      return tabla
    },
    verProyecto(proyecto) {
      const datosRegistro = {
        id: proyecto.id,
        id_volver: this.info_tabla.id,
        ruta_volver: this.verTablaRutaVolver(this.info_tabla.nombre_tabla),
        info_edificio: this.info_edificio,
        info_centro_cableado: this.info_centro_cableado,
        info_gabinete: this.info_gabinete,
        info_elemento: this.info_elemento
      }
      this.$router.push({
        name: "Proyecto",
        query: { registro: JSON.stringify(datosRegistro) },
      });
    },
    verInfoPrincipalProyectosExistentes() {
      this.axios.get("/proyecto").then((respuesta) => {
        if (respuesta.status === 200) {
          this.proyectosExistentes = respuesta.data;
        }
      });
    },
    buscarInfoProyectoExistente() {
      const idProyecto = this.proyecto.id
      this.axios.get("/proyecto/" + idProyecto).then((respuesta) => {
        if (respuesta.status === 200) {
          this.proyecto = respuesta.data;
          this.proyecto.fecha = FechaUtil.formatearFecha(this.proyecto.fecha)
          this.esProyectoExistente = true
        }
      });
    },
    agregarNuevoProyecto() {
      this.proyecto = {}
      this.esProyectoExistente = false
      this.verFechaActual()
    },
    eliminarSoloProyectoTabla() {
      const idProyecto = this.proyecto.id
      this.axios.delete('proyecto/eliminar_proyecto_tabla/' + this.info_tabla.nombre_tabla + '/' + this.info_tabla.id + '/' + idProyecto).then((respuesta) => {
        if (respuesta.status === 200) {
          location.reload()
        }
      }).catch(error => console.log(error))
    },
    verDatosModal(proyecto) {
      this.proyecto = proyecto
    },
  }
};
</script>

<style scoped>
.container-principal_proyectos {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  width: 90%;
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
