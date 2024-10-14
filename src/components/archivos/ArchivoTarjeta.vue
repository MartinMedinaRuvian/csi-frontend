<template>
  <div>
    <div class="container-principal_archivos" v-if="(archivos != null || archivos != undefined)
      && archivos.length > 0">
      <h4 class="mb-5">Archivos
        <span>
          <button class="btn btn-success" data-toggle="modal" data-target="#modalGuardarArchivo">+</button>
        </span>
      </h4>

      <div id="dialog-window">
        <div id="scrollable-content" class="containe-imagenes mb-5">
          <ul class="list-group" v-for="archivo in archivos" :key="archivo.id">
            <li class="list-group-item d-flex justify-content-between">
              <div class="texto-archivos">
                <span v-if="elArchivoEsUnaImagen(archivo.nombre)" class="texto-mediano text-success pointer-hand"
                  data-toggle="modal" data-target="#modalVerImagen" @click="verDatosModal(archivo)">{{ archivo.nombre }}
                </span>
                <span v-else class="texto-mediano text-success pointer-hand" @click="descargarArchivo(archivo.ruta)">{{
                  archivo.nombre }}
                </span>
              </div>
              <div class="botones-archivos">
                <span>
                  <button v-if="usuario.rol_id === 1" class="btn-eliminar_item btn btn-danger ml-2" @click="verDatosModal(archivo)"
                    data-toggle="modal" data-target="#modalEliminarArchivo">&#10006;</button>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      <h5>No hay Archivos</h5>
      <button class="btn btn-success" data-toggle="modal" data-target="#modalGuardarArchivo">Agregar
        Archivo</button>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modalGuardarArchivo" tabindex="-1" role="dialog" aria-labelledby="modalGuardarArchivo"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Guardar Archivo
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="archivo = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-4">
                <h5>Archivo:</h5>
                <div class="row">
                  <div class="col-md-12 col-lg-12">
                    <input type="file" class="form-control" name="archivo" id="archivo" accept="*" ref="inputArchivo"
                      required>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                    @click="Archivo = {}">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-success form-control" value="Guardar" @click="subirArchivo()" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Eliminar -->
    <div class="modal fade" id="modalEliminarArchivo" tabindex="-1" role="dialog" aria-labelledby="modalEliminarArchivo"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Eliminar Archivo
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="archivo = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-4">
                <h5>¿ Eliminar Archivo: {{ archivo.nombre }} ?</h5>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                    @click="Archivo = {}">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-danger form-control" value="Eliminar"
                    @click="eliminarArchivo()" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <ImagenPrevia :archivo="archivo" />

  </div>
</template>

<script>
import ImagenPrevia from "@/components/archivos/ImagenPrevia";
import { mapGetters } from "vuex";
export default {
  props: {
    archivos: [],
    info_tabla: {}
  },
  components:{ ImagenPrevia },
  data() {
    return {
      archivo: {},
      ruta_servidor: this.axios.defaults.baseURL,
      urlSinImagen: this.axios.defaults.baseURL + '/archivos/archivo_default.svg',
      urlImg: ''
    };
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    guardarNuevoArchivo() {
      const registroGuardar = this.archivo
      const registro = {
        numero: registroGuardar.numero,
        ubicacion: registroGuardar.ubicacion,
        observacion: registroGuardar.observacion,
        id_Archivo: this.id_Archivo
      }
      const nombreTabla = "archivo"
      this.axios.post(nombreTabla, registro).then((respuesta) => {
        if (respuesta.status === 200) {
          const idGuardado = respuesta.data.id
          this.actualizarImagen(nombreTabla, idGuardado)
          location.reload()
          //location.href = '/'
        }
      }).catch(error => console.log(error))
    },
    obtenerExtencionArchivo(nombreArchivo) {
      if (!nombreArchivo) return null
      return nombreArchivo.split('.')[1].toLowerCase()
    },
    elArchivoEsUnaImagen(nombreArchivo) {
      const extencionesTipoImagen = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
      const extension = this.obtenerExtencionArchivo(nombreArchivo);
      return extencionesTipoImagen.includes(extension);
    },
    subirArchivo() {
      const nombreTabla = this.info_tabla.nombre_tabla
      const id = this.info_tabla.id
      var formData = new FormData();
      var file = document.querySelector("#archivo");
      formData.append("archivo", file.files[0]);
      this.axios
        .post("archivo/" + nombreTabla + "/" + id, formData, {
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
    eliminarArchivo() {
      const nombreTabla = this.info_tabla.nombre_tabla
      const id = this.info_tabla.id
      const idArchivo = this.archivo.id
      var formData = new FormData();
      var file = document.querySelector("#archivo");
      formData.append("archivo", file.files[0]);
      this.axios
        .delete("archivo/" + nombreTabla + "/" + id + "/" + idArchivo, formData, {
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
      this.archivo = { ...dato };
    },
    rutaArchivoServidor(ruta_archivo) {
      return this.ruta_servidor + '/' + ruta_archivo
    },
    descargarArchivo(ruta_archivo) {
      const url = this.rutaArchivoServidor(ruta_archivo)
      window.open(url, '_blank');
    }
  },
};
</script>

<style>
.container-principal_archivos {
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
  max-width: 90%;
  height: 200px;
  margin-bottom: 40px;
}

#scrollable-content {
  height: 250px;
  overflow: auto;
  border: solid 1px #212121;
}

#imagenArchivoVer {
  width: 100%;
  height: 300px;
}

.texto-archivos{
  width: 85%;
  word-wrap: break-word !important;
}
.botones-archivos{
  width: 15%;
}
</style>
