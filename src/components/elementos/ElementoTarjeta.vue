<template>
  <div>
    <div class="container-principal">
      <h4 class="mb-5">Elemento <span> <button class="btn btn-success" data-toggle="modal"
            data-target="#modalGuardarCentroCableado">+ </button></span></h4>
        <div class="row">
        <div v-if="elementosActivos && elementosActivos.length > 0" class="col columna-elementos_activos mr-2">
          <div class="contenedor-elementos">
            <h6 class="text-success"><b>ELEMENTOS ACTIVOS</b></h6>
            <ElementoTabla :elementos="elementosActivos" />
          </div>
        </div>
        <div v-if="elementosPasivos && elementosPasivos.length > 0" class="col columna-elementos_pasivos">
          <div class="contenedor-elementos">
            <h6 class="text-primary"><b>ELEMENTOS PASIVOS</b></h6>
            <ElementoTabla :elementos="elementosPasivos" />
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modalGuardarCentroCableado" tabindex="-1" role="dialog"
      aria-labelledby="modalGuardarCentroCableado" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
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

              <div class="form-group mt-3">
                <label for="tipo" class="requerido">Tipo:</label>
                <select id="tipo" class="form-select form-control" v-model="elemento.id_tipo_elemento">
                  <option v-for="tipo in tiposelementos" :value="tipo.id" :key="tipo.id" class="text-success">
                    {{ tipo.descripcion }}
                  </option>
                </select>
              </div>

              <div class="form-group mt-3" v-if="elemento.id_tipo_elemento == 1">
                <label for="tipo" class="requerido">Referencia:</label>
                <select id="tipo" class="form-select form-control" v-model="elemento.id_tipo_referencia">
                  <option v-for="tipo in tiposreferencias" :value="tipo.id" :key="tipo.id" class="text-success">
                    {{ tipo.descripcion }}
                  </option>
                </select>
              </div>
              
              <div class="form-group mt-3" v-if="elemento.id_tipo_elemento == 1">
                <label for="tipo" class="requerido">Modelo:</label>
                <select id="tipo" class="form-select form-control" v-model="elemento.id_tipo_modelo">
                  <option v-for="tipo in tiposmodelos" :value="tipo.id" :key="tipo.id" class="text-success">
                    {{ tipo.descripcion }}
                  </option>
                </select>
              </div>
              
              <div class="form-group mt-3" v-if="elemento.id_tipo_elemento == 1">
                <label for="tipo" class="requerido">Marca:</label>
                <select id="tipo" class="form-select form-control" v-model="elemento.id_tipo_marca">
                  <option v-for="tipo in tiposmarcas" :value="tipo.id" :key="tipo.id" class="text-success">
                    {{ tipo.descripcion }}
                  </option>
                </select>
              </div>

              <div class="form group mt-3" v-if="elemento.id_tipo_elemento == 1">
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
                      ref="imagenPrevisualizacionCentroCableado" :src="urlSinImagen">
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
    id_gabinete: {}
  },
  data() {
    return {
      elemento: { id_tipo_elemento: 1, id_tipo_referencia: 1, id_tipo_modelo: 1, id_tipo_marca: 1 },
      ruta_servidor: this.axios.defaults.baseURL,
      urlSinImagen: this.axios.defaults.baseURL + '/archivos/elemento_default.svg',
      urlImg: '',
      tiposelementos: [],
      tiposreferencias: [],
      tiposmodelos: [],
      tiposmarcas: [],
      opcionesRespuesta: ['S', 'N']
    };
  },
  created(){
    this.verTiposelementos()
    this.verTiposReferencias()
    this.verTiposModelos()
    this.verTiposMarcas()
  },  
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    verImagen() {
      const archivos = this.$refs.inputArchivoelemento.files;
      console.log(archivos)

      if ((archivos != null && archivos != undefined) && archivos.length > 0) {
        const primerArchivo = archivos[0];
        const objectURL = URL.createObjectURL(primerArchivo);
        this.$refs.imagenPrevisualizacionCentroCableado.src = objectURL;
      } else {
        this.$refs.imagenPrevisualizacionCentroCableado.src = this.urlSinImagen;
      }
    },
    guardarNuevoelemento() {
      const registroGuardar = this.elemento
      const registro = {
        descripcion: registroGuardar.descripcion,
        id_tipo_elemento: registroGuardar.id_tipo_elemento,
        id_tipo_referencia: registroGuardar.id_tipo_referencia,
        id_tipo_modelo: registroGuardar.id_tipo_modelo,
        id_tipo_marca: registroGuardar.id_tipo_marca,
        codigo: registroGuardar.codigo,
        serial: registroGuardar.serial,
        id_gabinete: this.id_gabinete,
        id_usuario: this.usuario.id
      }
      const nombreTabla = "elemento"
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
    verTiposelementos() {
      this.axios.get("tipo/tipo_elemento")
        .then((respuesta) => {
          this.tiposelementos = respuesta.data
        })
        .catch(error => console.log(error))
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
    }
  },
};
</script>

<style>
.card {
  margin-bottom: 20px;
  border-radius: 10px;
}

.card-header {
  position: relative;
  text-align: center;
}

.card-header img {
  width: 150px;
  /* Ancho fijo */
  height: 150px;
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
  width: 100px;
  height: 100px;
}

#imagenInfo {
  width: 150px;
  height: 150px;
}

.requerido::before {
  content: "* ";
  /* Agrega el asterisco */
  color: red;
  /* Asterisco de color rojo */
  font-weight: bold;
  /* Opcional, para darle más énfasis */
}

.texto-pequenio {
  font-size: 13px;
}

.imagen-previsualizacion {
  width: 120px;
  height: 120px;
}

.propiedades span {
  font-size: 20px;
}

.columna-elementos_activos{
  padding: 20px;
  border: solid #28a745 1.5px;
  border-radius: 15px;
}

.columna-elementos_pasivos{
  padding: 20px;
  border: solid #039BE5 1px;
  border-radius: 15px;
}

</style>
