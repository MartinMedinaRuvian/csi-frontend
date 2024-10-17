<template>
  <div>
    <div class="container-principal" v-if="(elementos != null || elementos != undefined)
      && elementos.length > 0">
      <h4 class="mb-5">Elemento <span> <button class="btn btn-success" data-toggle="modal"
            data-target="#modalGuardarCentroCableado">+ </button></span></h4>
      <div class="row mt-5">
        <div class="col-sm-12 col-md-6 col-lg-4 mb-4" v-for="elemento in elementos"
          :key="elemento.id">
          <div class="card" style="width: 100%;">
            <div class="card-header">
              <img id="imagen" :src="rutaImagenVer(elemento.ruta_imagen)" alt="">
              <div class="numero">#{{ elemento.numero }}</div>
            </div>
            <div class="card-body">
              <h6>Tamaño: {{ elemento.tamanio }}</h6>
              <p class="propiedades">
                <span class="text-primary">{{ elemento.aterrizado == 'S' ? '&#9889;' : '&#128683;&#9889;'}}</span> <br>
              </p>
              <button class="btn btn-success">Ver Info</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h5>No hay elementos</h5>
      <button class="btn btn-success" data-toggle="modal" data-target="#modalGuardarCentroCableado">Agregar Elemento</button>
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
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="elemento = { tipo: 'EN OFICINA', climatizado: 'S', camaras: 'S', acceso_llaves: 'S', acceso_biometrico: 'N' }">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form group">
                <label for="nombre" class="requerido">Número:</label>
                <input required type="number" placeholder="Ingrese el Número" v-model="elemento.numero"
                  class="form-control" />
              </div>
              
              <div class="form-group mt-3">
                <label for="tipo" class="requerido">Tipo:</label>
                <select id="tipo" class="form-select form-control" v-model="elemento.id_tipo_elemento">
                  <option v-for="tipo in tiposelementos" :value="tipo.id" :key="tipo.id" class="text-success">
                    {{ tipo.descripcion }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="tipo" class="requerido">¿Esta Aterrizado?</label>
                <select id="tipo" class="form-select form-control" v-model="elemento.aterrizado">
                  <option v-for="opcion in opcionesRespuesta" :value="opcion" :key="opcion" class="text-success">
                    {{ opcion }}
                  </option>
                </select>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo" class="requerido">Tamaño:</label>
                  <input required type="text" placeholder="Ingrese tamaño" v-model="elemento.tamanio"
                    class="form-control" />
                </div>
              </div>
       
              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo">Observación:</label>
                  <textarea type="text" placeholder="Ingrese una observación" v-model="elemento.observación"
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
                    @click="elemento = { tipo: 'EN OFICINA', climatizado: 'S', camaras: 'S', acceso_llaves: 'S', acceso_biometrico: 'N' }">
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
export default {
  props: {
    elementos: [],
    id_centro_cableado: {}
  },
  data() {
    return {
      elemento: { id_tipo_elemento: 1, aterrizado: 'S' },
      ruta_servidor: this.axios.defaults.baseURL,
      urlSinImagen: this.axios.defaults.baseURL + '/archivos/elemento_default.svg',
      urlImg: '',
      tiposelementos: [],
      opcionesRespuesta: ['S', 'N']
    };
  },
  created(){
    //this.verTiposelementos()
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
        numero: registroGuardar.numero,
        tamanio: registroGuardar.tamanio,
        aterrizado: registroGuardar.aterrizado,
        observacion: registroGuardar.observacion,
        id_centro_cableado: this.id_centro_cableado,
        id_tipo_elemento: registroGuardar.id_tipo_elemento
      }
      const nombreTabla = "elemento"
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
    verTiposelementos(){
      this.axios.get("tipo_elemento")
      .then((respuesta)=>{
        this.tiposelementos = respuesta.data
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
</style>
