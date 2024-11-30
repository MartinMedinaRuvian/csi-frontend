<template>
  <div>
    <div class="container-principal mt-5" v-if="(centros_cableados != null || centros_cableados != undefined)
      && centros_cableados.length > 0">

      <p class="mb-5 text-danger"><b>Centros de Cableados</b> <span> <v-btn class="ml-2 botones-icon" data-toggle="modal"
            data-target="#modalGuardarCentroCableado">
            <v-icon icon="mdi-note-plus"></v-icon>
            <v-tooltip activator="parent" location="top">Agregar</v-tooltip>
          </v-btn></span></p>
      <div class="row mt-5">
        <div class="mt-5 col-sm-12 col-md-6 col-lg-3 mb-4" v-for="centro_cableado in centros_cableados"
          :key="centro_cableado.id">
          <div class="card" style="width: 100%;">
            <div class="card-header">
              <img id="imagen" :src="rutaImagenVer(centro_cableado.ruta_imagen)" alt="">
              <div class="numero"># {{ centro_cableado.numero }}</div>
            </div>
            <div class="card-body">
              <p>{{ centro_cableado.ubicacion }} - {{ centro_cableado.tipo }}</p>
              <p class="propiedades">
                <span class="text-primary">{{ centro_cableado.climatizado == 'S' ? '&#10052;' :
                  '&#128683;&#10052;'}}</span> <br>
                <span>{{ centro_cableado.camaras == 'S' ? '&#128247;' : '&#128683;&#128247;' }}</span>
              </p>
              <v-btn class="ml-2 botones-icon" @click="verInfoCentroCableado(centro_cableado)">
                <v-icon icon="mdi-eye"></v-icon>
                <v-tooltip activator="parent" location="top">Ver Información</v-tooltip>
                </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h5>No hay Centros de Cableado</h5>
      <button class="btn btn-success" data-toggle="modal" data-target="#modalGuardarCentroCableado">Agregar Centro de
        Cableado</button>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modalGuardarCentroCableado" tabindex="-1" role="dialog"
      aria-labelledby="modalGuardarCentroCableado" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Guardar Centro de Cableado
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"
              @click="centro_cableado = { tipo: 'EN OFICINA', climatizado: 'S', camaras: 'S', acceso_llaves: 'S', acceso_biometrico: 'N' }">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form group">
                <label for="nombre" class="requerido">Número:</label>
                <input required type="number" placeholder="Ingrese el Número" v-model="centro_cableado.numero"
                  class="form-control" />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo" class="requerido">Ubicación:</label>
                  <input required type="text" placeholder="Ingrese ubicación" v-model="centro_cableado.ubicacion"
                    class="form-control" />
                </div>
              </div>

              <div class="form-group">
                <label for="tipo" class="requerido">Tipo:</label>
                <select id="tipo" class="form-select form-control" v-model="centro_cableado.tipo">
                  <option v-for="tipo in tiposCentroCableado" :value="tipo" :key="tipo" class="text-success">
                    {{ tipo }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="tipo" class="requerido">Climatizado:</label>
                <select id="tipo" class="form-select form-control" v-model="centro_cableado.climatizado">
                  <option v-for="opcion in opcionesRespuesta" :value="opcion" :key="opcion" class="text-success">
                    {{ opcion }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="tipo" class="requerido">Camaras:</label>
                <select id="tipo" class="form-select form-control" v-model="centro_cableado.camaras">
                  <option v-for="opcion in opcionesRespuesta" :value="opcion" :key="opcion" class="text-success">
                    {{ opcion }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="tipo" class="requerido">Acceso por llaves:</label>
                <select id="tipo" class="form-select form-control" v-model="centro_cableado.acceso_llaves">
                  <option v-for="opcion in opcionesRespuesta" :value="opcion" :key="opcion" class="text-success">
                    {{ opcion }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="tipo" class="requerido">Acceso Biometrico:</label>
                <select id="tipo" class="form-select form-control" v-model="centro_cableado.acceso_biometrico">
                  <option v-for="opcion in opcionesRespuesta" :value="opcion" :key="opcion" class="text-success">
                    {{ opcion }}
                  </option>
                </select>
              </div>

              <div class="form-group mt-4">
                <h5>Imagen:</h5>
                <div class="row">
                  <div class="col-md-12 col-lg-12">
                    <input type="file" class="form-control" name="archivo_centro_cableado" id="archivo_centro_cableado"
                      @change="verImagen()" accept="image/*" ref="inputArchivoCentroCableado" required>
                  </div>
                  <div class="col-md-12 col-lg-12 mt-3">
                    <img class="imagen-previsualizacion" alt="imagen" id="imagenPrevisualizacionCentroCableado"
                      ref="imagenPrevisualizacionCentroCableado" :src="urlSinImagen">
                  </div>
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo">Observación:</label>
                  <textarea type="text" placeholder="Ingrese una observación" v-model="centro_cableado.observación"
                    class="form-control" />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                    @click="centro_cableado = { tipo: 'EN OFICINA', climatizado: 'S', camaras: 'S', acceso_llaves: 'S', acceso_biometrico: 'N' }">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-success form-control" value="Guardar"
                    @click="guardarNuevoCentroCableado()" />
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
export default {
  props: {
    centros_cableados: [],
    info_edificio: {}
  },
  data() {
    return {
      centro_cableado: { tipo: 'EN OFICINA', climatizado: 'S', camaras: 'S', acceso_llaves: 'S', acceso_biometrico: 'N' },
      ruta_servidor: this.axios.defaults.baseURL,
      urlSinImagen: this.axios.defaults.baseURL + '/archivos/centro_cableado_default.svg',
      urlImg: '',
      tiposCentroCableado: ['EN OFICINA', 'INDEPENDIENTE'],
      opcionesRespuesta: ['S', 'N']
    };
  },
  methods: {
    verImagen() {
      const archivos = this.$refs.inputArchivoCentroCableado.files;
      console.log(archivos)

      if ((archivos != null && archivos != undefined) && archivos.length > 0) {
        const primerArchivo = archivos[0];
        const objectURL = URL.createObjectURL(primerArchivo);
        this.$refs.imagenPrevisualizacionCentroCableado.src = objectURL;
      } else {
        this.$refs.imagenPrevisualizacionCentroCableado.src = this.urlSinImagen;
      }
    },
    guardarNuevoCentroCableado() {
      const registroGuardar = this.centro_cableado
      const registro = {
        numero: registroGuardar.numero,
        tipo: registroGuardar.tipo,
        ubicacion: registroGuardar.ubicacion,
        climatizado: registroGuardar.climatizado,
        camaras: registroGuardar.camaras,
        acceso_llaves: registroGuardar.acceso_llaves,
        acceso_biometrico: registroGuardar.acceso_biometrico,
        observacion: registroGuardar.observacion,
        id_edificio: this.info_edificio.id
      }
      const nombreTabla = "centro_cableado"
      this.axios.post(nombreTabla, registro).then(async (respuesta) => {
        if (respuesta.status === 200) {
          const idGuardado = respuesta.data.id
          await this.actualizarImagen(nombreTabla, idGuardado)
          $("#modalGuardarCentroCableado").modal("hide");
          location.reload()
          //this.$emit('refrescar')
          //location.href = '/'
        }
      }).catch(error => console.log(error))
    },
    actualizarImagen(nombreTabla, id) {
      console.log(nombreTabla, id)
      var formData = new FormData();
      var imagefile = document.querySelector("#archivo_centro_cableado");
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
      const ruta = ruta_imagen != null && ruta_imagen != undefined ? ruta_imagen : 'archivos/centro_cableado_default.svg'
      return this.ruta_servidor + '/' + ruta
    },
    verInfoCentroCableado(registro) {
      const datosRegistro = {
        id: registro.id,
        info_edificio: {
          id: this.info_edificio.id,
          nombre: this.info_edificio.nombre
        }
      }
      this.$router.push({
        name: "CentroCableado",
        query: { registro: JSON.stringify(datosRegistro) },
      });
    }
  },
};
</script>

<style scoped>
.container-principal {
  margin-top: 15px;
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
  font-size: 30px;
}

.botones-icon {
    font-size: 25px;
    color: #00B0FF;
    background-color: #fff;
    border: solid #fff;
}
</style>
