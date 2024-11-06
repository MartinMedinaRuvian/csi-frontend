<template>
  <div class="container mx-auto d-flex justify-content-center">
    <div class="card">
      <div class="card-header text-center">
        <h5 class="text-success">Nuevo Elemento Activo</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent>
          <div class="form-group mt-3">
            <label for="tipo" class="requerido">Tipo:</label>
            <select id="tipo" class="form-select form-control" v-model="tipo_elemento">
              <option v-for="tipo in tiposelementos" :value="tipo" :key="tipo" class="text-success">
                {{ tipo }}
              </option>
            </select>
          </div>

          <v-autocomplete v-if="tipo_elemento == 'ACTIVO'" label="Dispositivo" class="requerido mt-5" v-model="elemento.id_tipo_dispositivo_activo"
            :items="tiposdispositivoactivo" :item-title="titulosAutocompleteTipos" item-value="id"
            :filter="filterAutocompleteTipotitulosAutocompleteTipos">
          </v-autocomplete>

          <v-autocomplete v-if="tipo_elemento == 'PASIVO'" label="Dispositivo" class="requerido" v-model="elemento.id_tipo_dispositivo_pasivo"
            :items="tiposdispositivopasivo" :item-title="titulosAutocompleteTipos" item-value="id"
            :filter="filterAutocompleteTipotitulosAutocompleteTipos">
          </v-autocomplete>

          <v-autocomplete v-if="tipo_elemento == 'ACTIVO'" label="Referencia" class="requerido" v-model="elemento.id_tipo_referencia"
            :items="tiposreferencias" :item-title="titulosAutocompleteTipos" item-value="id"
            :filter="filterAutocompleteTipotitulosAutocompleteTipos">
          </v-autocomplete>

          <v-autocomplete v-if="tipo_elemento == 'ACTIVO'" label="Modelo" class="requerido" v-model="elemento.id_tipo_modelo"
            :items="tiposmodelos" :item-title="titulosAutocompleteTipos" item-value="id"
            :filter="filterAutocompleteTipotitulosAutocompleteTipos">
          </v-autocomplete>

          <v-autocomplete v-if="tipo_elemento == 'ACTIVO'" label="Marca" class="requerido" v-model="elemento.id_tipo_marca"
            :items="tiposmarcas" :item-title="titulosAutocompleteTipos" item-value="id"
            :filter="filterAutocompleteTipotitulosAutocompleteTipos">
          </v-autocomplete>

          <div class="form group mt-3">
            <div class="form-group">
              <label for="codigo" class="requerido">Código:</label>
              <input required type="text" placeholder="Ingrese Código" v-model="elemento.codigo" class="form-control" />
            </div>
          </div>

          <div class="form group mt-3" v-if="tipo_elemento == 'ACTIVO'">
            <div class="form-group">
              <label for="codigo" class="requerido">Serial:</label>
              <input required type="text" placeholder="Ingrese Serial" v-model="elemento.serial" class="form-control" />
            </div>
          </div>


          <div class="form-group mt-4 text-center">
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
              <button type="button" class="btn btn-secondary form-control" data-dismiss="modal" @click="volver()">
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
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      elemento: { id_tipo_dispositivo_activo: 1, id_tipo_dispositivo_pasivo:1, id_tipo_referencia: 1, id_tipo_modelo: 1, id_tipo_marca: 1 },
      tiposelementos: ['ACTIVO', 'PASIVO'],
      tipo_elemento: 'ACTIVO',
      ruta_servidor: this.axios.defaults.baseURL,
      urlSinImagenActivo: this.axios.defaults.baseURL + '/archivos/elemento_activo_default.svg',
      urlSinImagenPasivo: this.axios.defaults.baseURL + '/archivos/elemento_pasivo_default.svg',
      urlImg: '',
      tiposreferencias: [],
      tiposmodelos: [],
      tiposmarcas: [],
      tiposdispositivoactivo: [],
      tiposdispositivopasivo: [],
      id_gabinete: 0
    }
  },
  mounted() {
    const registroString = this.$route.query.registro;
    const registroObjeto = JSON.parse(registroString);
    this.id_gabinete = registroObjeto.id;
  },
  created() {
    this.verTiposDispositivosActivos()
    this.verTiposDispositivosPasivos()
    this.verTiposReferencias()
    this.verTiposModelos()
    this.verTiposMarcas()
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    titulosAutocompleteTipos(item) {
      return `${item.descripcion}`;
    },
    filterAutocompleteTipos(item, queryText, itemText) {
      return (
        item.descripcion
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1
      );
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
        id_tipo_dispositivo_activo: registroGuardar.id_tipo_dispositivo_activo,
        id_tipo_referencia: registroGuardar.id_tipo_referencia,
        id_tipo_modelo: registroGuardar.id_tipo_modelo,
        id_tipo_marca: registroGuardar.id_tipo_marca,
        codigo: registroGuardar.codigo,
        serial: registroGuardar.serial,
        id_gabinete: this.id_gabinete,
        id_usuario: this.usuario.id
      }
      const nombreTabla = "elemento_activo"
      console.log(registro, 'registro')
      this.axios.post(nombreTabla, registro).then((respuesta) => {
        if (respuesta.status === 200) {
          const idGuardado = respuesta.data.id
          this.actualizarImagen(nombreTabla, idGuardado)
          this.volver()
        }
      }).catch(error => console.log(error))
    },
    guardarNuevoelementoPasivo() {
      const registroGuardar = this.elemento
      const registro = {
        id_tipo_dispositivo_pasivo: registroGuardar.id_tipo_dispositivo_pasivo,
        codigo: registroGuardar.codigo,
        id_gabinete: this.id_gabinete,
        id_usuario: this.usuario.id
      }
      const nombreTabla = "elemento_pasivo"
      console.log(registro, 'registro')
      this.axios.post(nombreTabla, registro).then((respuesta) => {
        if (respuesta.status === 200) {
          const idGuardado = respuesta.data.id
          this.actualizarImagen(nombreTabla, idGuardado)
          this.volver()
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
    verTiposDispositivosActivos() {
      this.axios.get("tipo/tipo_dispositivo_activo")
        .then((respuesta) => {
          this.tiposdispositivoactivo = respuesta.data
        })
        .catch(error => console.log(error))
    },
    verTiposDispositivosPasivos() {
      this.axios.get("tipo/tipo_dispositivo_pasivo")
        .then((respuesta) => {
          this.tiposdispositivopasivo = respuesta.data
        })
        .catch(error => console.log(error))
    },
    volver() {
      const id = this.id_gabinete
      const datosRegistro = {
        id
      }
      location.href = "/gabinete?registro=" + JSON.stringify(datosRegistro)
    },
  },
}
</script>
<style>
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

.columna-elementos_activos {
  padding: 20px;
  border: solid #28a745 1.5px;
  border-radius: 15px;
}

.columna-elementos_pasivos {
  padding: 20px;
  border: solid #039BE5 1px;
  border-radius: 15px;
}
</style>