<template>
  <div>
    <div class="container-principal_archivos mt-5">
      <h5 class="mb-5">Archivos
        <v-btn class="ml-2 botones-icon" data-toggle="modal" data-target="#modalGuardarArchivo">
                <v-icon icon="mdi-note-plus"></v-icon>
                <v-tooltip activator="parent" location="top">Agregar</v-tooltip>
                </v-btn>
      </h5>

      <div id="dialog-window">
        <div id="scrollable-content" class="containe-imagenes mb-5">

          <table class="table table-responsive-md" v-if="archivos && archivos.length > 0">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="archivo in archivos" :key="archivo.id">
                <td class="text-wrap" style="max-width: 260px;">
                  <p>{{ archivo.nombre }}</p>
                </td>
                <td>
                  <span v-if="elArchivoEsUnaImagen(archivo.nombre)">
                    <v-btn class="botones-icon mr-5" data-toggle="modal" data-target="#modalVerImagen" @click="verDatosModal(archivo)">
                      <v-icon icon="mdi-file-search-outline"></v-icon>
                      <v-tooltip activator="parent" location="top">Ver</v-tooltip>
                    </v-btn>
                  </span>
                  <span v-else>
                    <v-btn class="botones-icon mr-5" @click="descargarArchivo(archivo.ruta)">
                      <v-icon icon="mdi-file-download-outline"></v-icon>
                      <v-tooltip activator="parent" location="top">Descargar</v-tooltip>
                    </v-btn>
                  </span>
                  <span>
                    <v-btn v-if="usuario.rol_id === 1" class="botones-icon" data-toggle="modal" data-target="#modalEliminarArchivo" @click="verDatosModal(archivo)">
                      <v-icon icon="mdi-delete"></v-icon>
                      <v-tooltip activator="parent" location="top">Eliminar</v-tooltip>
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
    <div class="modal fade" id="modalGuardarArchivo" tabindex="-1" role="dialog" aria-labelledby="modalGuardarArchivo"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger">
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
                <h5> Seleccione un Archivo:</h5>
                <div class="row">
                  <div class="col-md-12 col-lg-12">
                    <label for="file">Tamaño Máximo: {{ tamanioMaximoArchivo }} Mb</label>
                    <input type="file" class="form-control" name="archivo" id="archivo" :accept="fileAccept"
                      ref="inputArchivo" required>
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
          <div class="modal-header bg-danger">
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
                <p>Archivo: <br> {{ archivo.nombre }}</p>
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
  components: { ImagenPrevia },
  data() {
    return {
      archivo: {},
      ruta_servidor: this.axios.defaults.baseURL,
      urlSinImagen: this.axios.defaults.baseURL + '/archivos/archivo_default.svg',
      urlImg: '',
      fileAccept: [
        // Extensiones de documentos de Office y PDF
        ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf",

        // Extensiones de imágenes
        ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".svg",
        ".tiff", ".ico", ".avif",

        // Extensiones de configuración de switches y routers
        ".cfg", ".config", ".cnf", ".conf", ".txt", // .txt para configuraciones simples
      ].join(",") // Convertimos el arreglo en una cadena separada por comas
    };
  },
  computed: {
    ...mapGetters(["usuario", "tamanioMaximoArchivo", "tamanioMaximoArchivoEnBytes"]),
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
      const archivo = file.files[0]
      console.log(archivo)
      if (archivo && archivo.size <= this.tamanioMaximoArchivoEnBytes) {
        formData.append("archivo", archivo);
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
      } else {
        file.value = ''
        alert('El tamaño del archivo es mayor al permitido')
      }
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

<style scoped>
.container-principal_archivos {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
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


.texto-mediano {
  font-size: 15px;
}

.pointer-hand {
  cursor: pointer;
}

#dialog-window {
  width: 100%;
  height: 200px;
  margin-bottom: 40px;
}

#scrollable-content {
  height: 250px;
  overflow: auto;
  border: solid 0.5px #212121;
  border-radius: 15px;
  background-color: #fff;
}

#imagenArchivoVer {
  width: 100%;
  height: 300px;
}

.texto-archivos {
  width: 85%;
  word-wrap: break-word !important;
}

.texto-archivos p {
  font-size: 15px;
}

.botones-archivos {
  width: 15%;
}

#scrollable-content li {
  background-color: #BDBDBD;
  color: #212121;
}

#scrollable-content li p {
  font-size: 18px;
}

.container-no_registros {
  margin-top: 45px;
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

.text-wrap {
  word-wrap: break-word;     /* Ajusta palabras largas */
  word-break: break-word;    /* Opcional: rompe palabras largas */
  overflow-wrap: break-word; /* Compatibilidad moderna */
}
</style>
