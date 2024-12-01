<template>
  <div>
    <div class="container-principal">

      <h5 class="mb-5 mt-5">Elementos <span> <v-btn class="ml-2 botones-icon" @click="guardarElemento()">
            <v-icon icon="mdi-note-plus"></v-icon>
            <v-tooltip activator="parent" location="top">Agregar</v-tooltip>
          </v-btn></span>
      </h5>
      <div class="row">
        <div class="col columna-elementos_activos mr-2">
          <div class="contenedor-elementos">
            <h6 class="text-danger"><b>ELEMENTOS ACTIVOS</b></h6>
            <div class="row">
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
                  <input class="form-control" type="text" v-model="buscar"
                    @keypress.enter="filtrarElementosActivos()" />
                  <v-btn class="ml-2 botones-icon" @click="filtrarElementosActivos()">
                    <v-icon icon="mdi-card-search"></v-icon>
                    <v-tooltip activator="parent" location="top">Buscar</v-tooltip>
                  </v-btn>
                </div>
              </div>
            </div>
            <div v-if="elementosActivos && elementosActivos.length > 0">
              <ElementoTabla :elementos="elementosActivos" :es_activo="true" :info_edificio="info_edificio"
                :info_centro_cableado="info_centro_cableado" :info_gabinete="info_gabinete" />
            </div>
          </div>
        </div>
        <div class="col columna-elementos_pasivos">
          <div class="contenedor-elementos">
            <h6 class="text-danger"><b>ELEMENTOS PASIVOS</b></h6>
            <div class="row">
              <div class="form-group col-md-6">
                <label for="select"><v-icon icon="mdi-filter"></v-icon> Filtro:</label>
                <select id="select" class="form-select form-control" aria-label="Default select example"
                  v-model="condicionElementoPasivo">
                  <option :value="condicion.valor" v-for="condicion in condiciones" :key="condicion.valor"
                    class="text-success">
                    {{ condicion.descripcion }}
                  </option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label for="select">Buscar:</label>
                <div class="input-buscar">
                  <input class="form-control" type="text" v-model="buscarElementoPasivo"
                    @keypress.enter="filtrarElementosPasivos()" />
                  <v-btn class="ml-2 botones-icon" @click="filtrarElementosPasivos()">
                    <v-icon icon="mdi-card-search"></v-icon>
                    <v-tooltip activator="parent" location="top">Buscar</v-tooltip>
                  </v-btn>
                </div>
              </div>
            </div>
            <div v-if="elementosPasivos && elementosPasivos.length > 0">
              <ElementoTabla :elementos="elementosPasivos" :es_activo="false" :info_edificio="info_edificio"
                :info_centro_cableado="info_centro_cableado" :info_gabinete="info_gabinete" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modalGuardarCentroCableado" tabindex="-1" role="dialog"
      aria-labelledby="modalGuardarCentroCableado" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Guardar elemento
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
              @click="elemento = { id_tipo_elemento: 1, id_tipo_referencia: 1, id_tipo_modelo: 1, id_tipo_marca: 1 }">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-3">
                <label for="tipo" class="requerido">Tipo:</label>
                <select id="tipo" class="form-select form-control" v-model="tipo_elemento">
                  <option v-for="tipo in tiposelementos" :value="tipo" :key="tipo" class="text-success">
                    {{ tipo }}
                  </option>
                </select>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo" class="requerido">Descripción:</label>
                  <input required type="text" placeholder="Ingrese Descripción" v-model="elemento.descripcion"
                    class="form-control" />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo" class="requerido">Código:</label>
                  <input required type="text" placeholder="Ingrese Código" v-model="elemento.codigo"
                    class="form-control" />
                </div>
              </div>

              <div class="form-group mt-3" v-if="tipo_elemento == 'ACTIVO'">
                <label for="tipo" class="requerido">Referencia:</label>
                <select id="tipo" class="form-select form-control" v-model="elemento.id_tipo_referencia">
                  <option v-for="tipo in tiposreferencias" :value="tipo.id" :key="tipo.id" class="text-success">
                    {{ tipo.descripcion }}
                  </option>
                </select>
              </div>

              <div class="form-group mt-3" v-if="tipo_elemento == 'ACTIVO'">
                <label for="tipo" class="requerido">Modelo:</label>
                <select id="tipo" class="form-select form-control" v-model="elemento.id_tipo_modelo">
                  <option v-for="tipo in tiposmodelos" :value="tipo.id" :key="tipo.id" class="text-success">
                    {{ tipo.descripcion }}
                  </option>
                </select>
              </div>

              <div class="form-group mt-3" v-if="tipo_elemento == 'ACTIVO'">
                <label for="tipo" class="requerido">Marca:</label>
                <select id="tipo" class="form-select form-control" v-model="elemento.id_tipo_marca">
                  <option v-for="tipo in tiposmarcas" :value="tipo.id" :key="tipo.id" class="text-success">
                    {{ tipo.descripcion }}
                  </option>
                </select>
              </div>

              <div class="form group mt-3" v-if="tipo_elemento == 'ACTIVO'">
                <div class="form-group">
                  <label for="codigo" class="requerido">Serial:</label>
                  <input required type="text" placeholder="Ingrese Serial" v-model="elemento.serial"
                    class="form-control" />
                </div>
              </div>


              <div class="form-group mt-4">
                <h5>Imagen:</h5>
                <div class="row">
                  <div class="col-md-12 col-lg-12">
                    <input type="file" class="form-control" name="archivo_elemento" id="archivo_elemento"
                      @change="verImagen()" accept="image/*" ref="inputArchivoelemento" required>
                  </div>
                  <div class="col-md-12 col-lg-12 mt-3">
                    <img class="imagen-previsualizacion" alt="imagen" id="imagenPrevisualizacionCentroCableado"
                      ref="imagenPrevisualizacionCentroCableado"
                      :src="tipo_elemento == 'ACTIVO' ? urlSinImagenActivo : urlSinImagenPasivo">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                    @click="elemento = { id_tipo_elemento: 1, id_tipo_referencia: 1, id_tipo_modelo: 1, id_tipo_marca: 1 }">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-success form-control" value="Guardar"
                    @click="guardarNuevoelemento()" />
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
import ElementoTabla from "./ElementoTabla";
import { mapGetters } from "vuex";
export default {
  components: { ElementoTabla },
  props: {
    elementosActivos: [],
    elementosPasivos: [],
    info_gabinete: {},
    info_edificio: {},
    info_centro_cableado: {}
  },
  data() {
    return {
      elemento: { id_tipo_referencia: 1, id_tipo_modelo: 1, id_tipo_marca: 1 },
      tiposelementos: ['ACTIVO', 'PASIVO'],
      tipo_elemento: 'ACTIVO',
      ruta_servidor: this.axios.defaults.baseURL,
      urlSinImagenActivo: this.axios.defaults.baseURL + '/archivos/elemento_activo_default.svg',
      urlSinImagenPasivo: this.axios.defaults.baseURL + '/archivos/elemento_pasivo_default.svg',
      urlImg: '',
      tiposreferencias: [],
      tiposmodelos: [],
      tiposmarcas: [],
      opcionesRespuesta: ['S', 'N'],
      condiciones: [
        { descripcion: "CÓDIGO", valor: "e.codigo" },
        { descripcion: "DISPOSITIVO", valor: "td.descripcion" },
        { descripcion: "ESTADO", valor: "e.estado" }
      ],
      condicion: 'e.codigo',
      buscar: '',
      condicionElementoPasivo: 'e.codigo',
      buscarElementoPasivo: ''
    };
  },
  created() {
    this.verTiposReferencias()
    this.verTiposModelos()
    this.verTiposMarcas()
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    filtrarElementosActivos() {
      const datosEnviar = {
        tipo: 'ACTIVO',
        condicion: this.condicion,
        buscar: this.buscar
      }
      this.$emit('filtrar', datosEnviar)
    },
    filtrarElementosPasivos() {
      const datosEnviar = {
        tipo: 'PASIVO',
        condicion: this.condicionElementoPasivo,
        buscar: this.buscarElementoPasivo
      }
      this.$emit('filtrar', datosEnviar)
    },
    verImagen() {
      const archivos = this.$refs.inputArchivoelemento.files;
      console.log(archivos)

      if ((archivos != null && archivos != undefined) && archivos.length > 0) {
        const primerArchivo = archivos[0];
        const objectURL = URL.createObjectURL(primerArchivo);
        this.$refs.imagenPrevisualizacionCentroCableado.src = objectURL;
      } else {
        if (this.tipo_elemento == 'ACTIVO') {
          this.$refs.imagenPrevisualizacionCentroCableado.src = this.urlSinImagenActivo;
        } else {
          this.$refs.imagenPrevisualizacionCentroCableado.src = this.urlSinImagenPasivo;
        }
      }
    },
    async guardarNuevoelemento() {
      const tipoElementoGuardar = this.tipo_elemento
      if (tipoElementoGuardar == 'ACTIVO') {
        await this.guardarNuevoelementoActivo()
      } else {
        await this.guardarNuevoelementoPasivo()
      }
    },
    guardarNuevoelementoActivo() {
      const registroGuardar = this.elemento
      const registro = {
        descripcion: registroGuardar.descripcion,
        id_tipo_referencia: registroGuardar.id_tipo_referencia,
        id_tipo_modelo: registroGuardar.id_tipo_modelo,
        id_tipo_marca: registroGuardar.id_tipo_marca,
        codigo: registroGuardar.codigo,
        serial: registroGuardar.serial,
        id_gabinete: this.info_gabinete.id,
        id_usuario: this.usuario.id
      }
      const nombreTabla = "elemento_activo"
      console.log(registro, 'registro')
      this.axios.post(nombreTabla, registro).then((respuesta) => {
        if (respuesta.status === 200) {
          const idGuardado = respuesta.data.id
          this.actualizarImagen(nombreTabla, idGuardado)
          location.reload()
          //location.href = '/'
        }
      }).catch(error => console.log(error))
    },
    guardarNuevoelementoPasivo() {
      const registroGuardar = this.elemento
      const registro = {
        descripcion: registroGuardar.descripcion,
        codigo: registroGuardar.codigo,
        id_gabinete: this.info_gabinete.id,
        id_usuario: this.usuario.id
      }
      const nombreTabla = "elemento_pasivo"
      console.log(registro, 'registro')
      this.axios.post(nombreTabla, registro).then((respuesta) => {
        if (respuesta.status === 200) {
          const idGuardado = respuesta.data.id
          this.actualizarImagen(nombreTabla, idGuardado)
          location.reload()
          //location.href = '/'
        }
      }).catch(error => console.log(error))
    },
    actualizarImagen(nombreTabla, id) {
      console.log(nombreTabla, id)
      var formData = new FormData();
      var imagefile = document.querySelector("#archivo_elemento");
      formData.append("archivo", imagefile.files[0]);
      this.axios
        .put("imagen/" + nombreTabla + "/" + id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((respuesta) => {
          console.log(respuesta);
        });
    },
    rutaImagenVer(ruta_imagen) {
      const ruta = ruta_imagen != null && ruta_imagen != undefined ? ruta_imagen : 'archivos/elemento_default.svg'
      return this.ruta_servidor + '/' + ruta
    },
    verTiposReferencias() {
      this.axios.get("tipo/tipo_referencia")
        .then((respuesta) => {
          this.tiposreferencias = respuesta.data
        })
        .catch(error => console.log(error))
    },
    verTiposModelos() {
      this.axios.get("tipo/tipo_modelo")
        .then((respuesta) => {
          this.tiposmodelos = respuesta.data
        })
        .catch(error => console.log(error))
    },
    verTiposMarcas() {
      this.axios.get("tipo/tipo_marca")
        .then((respuesta) => {
          this.tiposmarcas = respuesta.data
        })
        .catch(error => console.log(error))
    },
    guardarElemento() {
      const id = this.info_gabinete.id
      const datosRegistro = {
        id,
        info_edificio: this.info_edificio,
        info_centro_cableado: this.info_centro_cableado,
        info_gabinete: this.info_gabinete
      }
      location.href = "/nuevo-elemento?registro=" + JSON.stringify(datosRegistro)
    }
  },
};
</script>

<style scoped>


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

.input-buscar {
  display: flex;
  align-content: center;
  align-items: center;
}
</style>
