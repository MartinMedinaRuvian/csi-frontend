<template>
  <div class="text-center">
    <div class="contenedor-principal mb-5">
      <div class="contenedor-imagen">
        <h5>{{ edificio.nombre }} - <span>{{ edificio.codigo }}</span></h5>
        <div class="imagen-wrapper">
          <img id="imagen" :src="ruta_servidor + '/' + edificio.ruta_imagen" alt="">
          <span class="icono-actualizar" data-toggle="modal" data-target="#modalActualizarImagen">
            &#x1F504;
          </span>
        </div>
      </div>
      <div class="contenedor-informacion mt-3">
        <p v-if="edificio.observacion != null && edificio.observacion != undefined">Observación <br> {{
          edificio.observacion }}</p>
        <ArchivoTarjeta :archivos="archivos" :info_tabla="{ nombre_tabla: 'edificio', id: edificio.id }" />
      </div>
    </div>
    <button class="btn btn-success" data-toggle="collapse" data-target="#collapseCentroCableadoTarjeta"
      aria-expanded="false" aria-controls="collapseCentroCableadoTarjeta">
      Centros de Cableado
    </button>
    <div class="collapse contenedor-tarjeta" id="collapseCentroCableadoTarjeta">
      <CentroCableadoTarjeta :centros_cableados="centros_cableados" :id_edificio="edificio.id" />
    </div>
    <!-- Modal Atualizar Imagen-->
    <div class="modal fade" id="modalActualizarImagen" tabindex="-1" role="dialog" aria-labelledby="modalActualizarImagen"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Actualizar Imagen
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="archivo = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-4">
                <h5>Imagen:</h5>
                <div class="row">
                  <div class="col-md-12 col-lg-12">
                    <input type="file" class="form-control" name="archivo_edificio" id="archivo_edificio" @change="verImagen(edificio.ruta_imagen)"
                      accept="image/*" ref="inputArchivoEdificio" required>
                  </div>
                  <div class="col-md-12 col-lg-12 mt-3">
                    <img alt="imagen" id="imagenPrevisualizacion" ref="imagenPrevisualizacion" :src="ruta_servidor + '/' + edificio.ruta_imagen">
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
                  <input type="button" class="btn btn-success form-control" value="Guardar" @click="actualizarImagen()" />
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
import CentroCableadoTarjeta from "@/components/centros_cableados/CentroCableadoTarjeta";
import ArchivoTarjeta from "@/components/archivos/ArchivoTarjeta";
import { mapGetters } from "vuex";
import Mensaje from "@/components/Mensaje.vue";
export default {
  components: { Mensaje, CentroCableadoTarjeta, ArchivoTarjeta },
  data() {
    return {
      edificio: {},
      centros_cableados: [],
      archivos: [],
      mensaje: { ver: false },
      ruta_servidor: this.axios.defaults.baseURL
    };
  },
  mounted() {
    const registroString = this.$route.query.registro;
    const registroObjeto = JSON.parse(registroString);
    this.edificio = registroObjeto;
    this.verCentrosCableados()
    this.verArchivos()
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    actualizar() {
      this.axios
        .post("edificio", this.edificio)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            //this.$router.push('/edificios')
            window.location.href = "/edificios";
            $("#modalGuardaredificio").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verCentrosCableados() {
      const idEdificio = this.edificio.id
      this.axios.get("centro_cableado/" + idEdificio).then((respuesta) => {
        if (respuesta.status === 200) {
          this.centros_cableados = respuesta.data;
          console.log(this.centros_cableados, 'centrosCableados')
        }
      });
    },
    verArchivos() {
      const idEdificio = this.edificio.id
      this.axios.get("archivo/edificio/" + idEdificio).then((respuesta) => {
        if (respuesta.status === 200) {
          this.archivos = respuesta.data;
        }
      });
    },
    verEdificios() {
      location.href = '/'
    },
    actualizarImagen() {
      const nombreTabla = 'edificio'
      const id = this.edificio.id
      var formData = new FormData();
      var imagefile = document.querySelector("#archivo_edificio");
      formData.append("archivo", imagefile.files[0]);
      this.axios
        .put("imagen/" + nombreTabla + "/" + id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((respuesta) => {
          if (respuesta.status == 200){
            console.log(respuesta.data)
            location.href = '/'
          }
        });
    },
    verImagen(urlImagenActual) {
      const archivos = this.$refs.inputArchivoEdificio.files;
      console.log(archivos)

      if ((archivos != null && archivos != undefined) && archivos.length > 0) {
        const primerArchivo = archivos[0];
        const objectURL = URL.createObjectURL(primerArchivo);
        this.$refs.imagenPrevisualizacion.src = objectURL;
      } else {
        this.$refs.imagenPrevisualizacion.src = urlImagenActual;
      }
    },
  }
};
</script>
<style scoped>
.input-buscar {
  display: flex;
  align-content: center;
  align-items: center;
}

#imagen {
  width: 250px;
  height: 250px;
  border-radius: 182px;
  border: solid 2px #28a745;
}

.contenedor-principal {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-between;
}

.contenedor-tarjeta {
  margin-top: 100px;
}

.imagen-wrapper {
  position: relative;
  display: inline-block;
}

.icono-actualizar {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(255, 255, 255, 0.7);
  /* Fondo para que se vea mejor sobre la imagen */
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
}

.icono-actualizar {
  font-size: 23px;
  /* Tamaño del ícono */
  color: #000;
  /* Color del ícono */
}
</style>