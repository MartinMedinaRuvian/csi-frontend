<template>
  <div>
    <div class="container-principal_mantenimientos mt-5" v-if="(mantenimientos != null || mantenimientos != undefined)
      && mantenimientos.length > 0">
      <h4 class="mb-5">Mantenimientos
        <span>
          <button class="btn btn-success" data-toggle="modal" data-target="#modalGuardarMantenimiento">+</button>
        </span>
      </h4>

      <div id="dialog-window">
        <div id="scrollable-content" class="containe-imagenes mb-5">
          <ul class="list-group" v-for="mantenimiento in mantenimientos" :key="mantenimiento.id">
            <li class="list-group-item d-flex justify-content-between">
              <div class="texto-mantenimientos">
                <p> <b>Código: </b> {{ mantenimiento.codigo }} - <b>Realizado Por:</b> {{ mantenimiento.realizado_por }} - <b>Fecha: </b> {{ formatearFecha(mantenimiento.fecha) }}
                </p>
              </div>
              <div class="botones-mantenimientos">
                <span>
                  <button class="btn-eliminar_item btn btn-success ml-2"
                    @click="verMantenimiento(mantenimiento)">
                    <span class="icon-Lupa"></span></button>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else class="mt-5">
      <h5>No hay Mantenimientos</h5>
      <button class="btn btn-success" data-toggle="modal" data-target="#modalGuardarMantenimiento">Agregar
        Mantenimiento</button>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modalGuardarMantenimiento" tabindex="-1" role="dialog" aria-labelledby="modalGuardarMantenimiento"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Guardar Mantenimiento
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="mantenimiento = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form group">
                <label for="nombrecompleto" class="requerido">Código:</label>
                <input type="text" placeholder="Ingrese Código" v-model="mantenimiento.codigo" class="form-control" />
              </div>

              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">Realizado Por:</label>
                <input type="text" placeholder="Ingrese el Realizado Por" v-model="mantenimiento.realizado_por"
                  class="form-control" />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo" class="requerido">Observación:</label>
                  <textarea type="text" placeholder="Ingrese una observación" v-model="mantenimiento.observacion"
                    class="form-control" />
                </div>
              </div>


              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">Fecha:</label>
                <input type="date" placeholder="Fecha" v-model="mantenimiento.fecha" class="form-control" />
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                    @click="mantenimiento = {}">
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
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Eliminar Mantenimiento
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="mantenimiento = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-4">
                <p>Mantenimiento: <br> {{ mantenimiento.codigo }}</p>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                    @click="mantenimiento = {}">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-danger form-control" value="Eliminar"
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
      urlImg: ''
    };
  },
  created() {
    this.verFechaActual()
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    verFechaActual() {
      this.mantenimiento.fecha = FechaUtil.fechaActual()
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
      const id = this.centro_cableado.id
      this.axios
        .delete("centro_cableado/" + id)
        .then((respuesta) => {
          if (respuesta.status == 200) {
            $("#modalEliminarMantenimiento").modal("hide");
            this.volver()
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
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

<style>
.container-principal_mantenimientos {
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
  height: 200px;
  margin-bottom: 40px;
}

#scrollable-content {
  height: 250px;
  overflow: auto;
  border: solid 1px #212121;
}

#imagenMantenimientoVer {
  width: 100%;
  height: 300px;
}

.texto-mantenimientos {
  width: 85%;
  word-wrap: break-word !important;
}

.texto-mantenimientos p {
  font-size: 15px;
}

.botones-mantenimientos {
  width: 15%;
}
</style>
