<template>
    <!-- Modal Ver Imagen -->
    <div class="modal fade" id="modalVerImagen" tabindex="-1" role="dialog" aria-labelledby="modalVerImagen"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Vista Previa Imagen
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="archivo = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-4">
                <img id="imagenArchivoVer" :src="rutaArchivoServidor(archivo.ruta)" alt="">
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                    @click="Archivo = {}">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-success form-control" value="Visualizar"
                    @click="descargarArchivo(archivo.ruta)" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    archivo: {}
  },
  data() {
    return {
      ruta_servidor: this.axios.defaults.baseURL,
    };
  },
  methods: {
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