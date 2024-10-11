<template>
  <div class="mt-5 container">
    <div class="container-principal" v-if="(centros_cableados != null || centros_cableados != undefined)
      && centros_cableados.length > 0">
      <h4 class="mt-5 mb-5">Centros de Cableados</h4>
      <div class="row mt-5">
        <div class="col-sm-12 col-md-6 col-lg-4 mb-4" v-for="centro_cableado in centros_cableados"
        :key="centro_cableado.id">
        <div class="card" style="width: 100%;">
          <div class="card-header">
            <img id="imagen" :src="ruta_servidor + '/' + centro_cableado.ruta_imagen" alt="">
            <div class="numero">#{{ centro_cableado.numero }}</div>
          </div>
          <div class="card-body">
            <p>{{ centro_cableado.ubicacion }}</p>
            <button class="btn btn-success">Ver Info</button>
          </div>
        </div>
      </div>
    </div>
    <button class="btn btn-success mt-5" data-toggle="modal" data-target="#modalGuardarCentroCableado">Nuevo Centro de
      Cableado</button>
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
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Guardar Centro de Cableado
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="centro_cableado = {}">
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

              <div class="form-group mt-4">
                <h5>Imagen:</h5>
                <div class="row">
                  <div class="col-md-12 col-lg-12">
                    <input type="file" class="form-control" name="archivo" id="archivo" @change="verImagen()"
                      accept="image/*" ref="inputArchivo" required>
                  </div>
                  <div class="col-md-12 col-lg-12 mt-3">
                    <img alt="imagen" id="imagenPrevisualizacion" ref="imagenPrevisualizacion" :src="urlSinImagen">
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
                    @click="centro_cableado = {}">
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
    id_edificio: {}
  },
  data() {
    return {
      centro_cableado: {},
      ruta_servidor: this.axios.defaults.baseURL,
      urlSinImagen: this.axios.defaults.baseURL + '/archivos/centro_cableado_default.svg',
      urlImg: ''
    };
  },
  methods: {
    verImagen() {
      const archivos = this.$refs.inputArchivo.files;
      console.log(archivos)

      if ((archivos != null && archivos != undefined) && archivos.length > 0) {
        const primerArchivo = archivos[0];
        const objectURL = URL.createObjectURL(primerArchivo);
        this.$refs.imagenPrevisualizacion.src = objectURL;
      } else {
        this.$refs.imagenPrevisualizacion.src = this.urlSinImagen;
      }
    },
    guardarNuevoCentroCableado() {
      const registroGuardar = this.centro_cableado
      const registro = {
        numero: registroGuardar.numero,
        ubicacion: registroGuardar.ubicacion,
        observacion: registroGuardar.observacion,
        id_edificio: this.id_edificio
      }
      const nombreTabla = "centro_cableado"
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
      var imagefile = document.querySelector("#archivo");
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
  },
};
</script>

<style>
.card{
  margin-bottom: 20px;
  border-radius: 10px;
}

.card-header {
  position: relative;
  text-align: center;
}

.card-header img {
  width: 150px; /* Ancho fijo */
  height: 150px; /* Alto fijo */
  border-top-left-radius: .25rem;
  border-top-right-radius: .25rem;
  object-fit: cover; /* Asegura que la imagen se ajuste bien al contenedor */
}

.card-header .numero {
  position: absolute;
  top: 0px; /* Mueve el número hacia la parte superior */
  left: 0px; /* Mueve el número hacia la izquierda */
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
</style>
