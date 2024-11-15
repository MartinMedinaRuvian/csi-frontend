<template>
  <div>
    <div class="container-principal_proyectos mt-5" v-if="(proyectos != null || proyectos != undefined)
      && proyectos.length > 0">
      <h4 class="mb-5">Proyectos
        <span>
          <button class="btn btn-success" data-toggle="modal" data-target="#modalGuardarProyecto">+</button>
        </span>
      </h4>

      <div id="dialog-window">
        <div id="scrollable-content" class="containe-imagenes mb-5">
          <ul class="list-group" v-for="proyecto in proyectos" :key="proyecto.id">
            <li class="list-group-item d-flex justify-content-between">
              <div class="texto-proyectos">
                <p> <b>Código: </b> {{ proyecto.codigo }} - <b>Empresa: {{ proyecto.nombre_empresa }}</b>
                </p>
              </div>
              <div class="botones-proyectos">
                <span>
                  <button v-if="usuario.rol_id === 1" class="btn-eliminar_item btn btn-success ml-2"
                    @click="verProyecto(proyecto)">
                    <span class="icon-Lupa"></span></button>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else class="mt-5">
      <h5>No hay Proyectos</h5>
      <button class="btn btn-success" data-toggle="modal" data-target="#modalGuardarProyecto">Agregar
        Proyecto</button>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modalGuardarProyecto" tabindex="-1" role="dialog" aria-labelledby="modalGuardarProyecto"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Guardar Proyecto
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="proyecto = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form group">
                <label for="nombrecompleto" class="requerido">Código:</label>
                <input type="text" placeholder="Ingrese Código" v-model="proyecto.codigo" class="form-control" />
              </div>

              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">Descripción:</label>
                <input type="text" placeholder="Ingrese la Descripción" v-model="proyecto.descripcion" class="form-control" />
              </div>

              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">Nombre de la Empresa:</label>
                <input type="text" placeholder="Ingrese el Nombre de la Empresa" v-model="proyecto.nombre_empresa"
                  class="form-control" />
              </div>

              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">NIT de la Empresa:</label>
                <input type="text" placeholder="Ingrese el NIT de la Empresa" v-model="proyecto.nit_empresa"
                  class="form-control" />
              </div>

              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">Fecha:</label>
                <input type="date" placeholder="Fecha" v-model="proyecto.fecha" class="form-control" />
              </div>

              <div class="form group mt-3">
                <label for="nombrecompleto">Certificación:</label>
                <input type="text" placeholder="Certificación" v-model="proyecto.certificacion" class="form-control" />
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
        <div class="modal-content">
          <div class="modal-header bg-success">
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
      this.proyecto.fecha = FechaUtil.fechaActual()
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
      var formData = new FormData();
      var file = document.querySelector("#proyecto");
      formData.append("proyecto", file.files[0]);
      this.axios
        .delete("proyecto/" + nombreTabla + "/" + id + "/" + idProyecto, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
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
    }
  }
};
</script>

<style>
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
  height: 200px;
  margin-bottom: 40px;
}

#scrollable-content {
  height: 250px;
  overflow: auto;
  border: solid 1px #212121;
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
</style>
