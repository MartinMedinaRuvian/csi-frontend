<template>
  <div class="text-center">
    <h4 class="text-success mb-5"><span><button class="btn btn-success"
          @click="volver()">&#8630; <v-tooltip activator="parent" location="top">Volver</v-tooltip></button></span>
      Edificio {{ edificio.nombre }} ({{ edificio.codigo }})</h4>
    
    <v-row>
      <v-col>
        <v-btn color="green-darken-2" @click="sesionMostrar('info-principal')">Información Principal</v-btn>
      </v-col>
      <v-col>
        <v-btn color="green-darken-2" @click="sesionMostrar('centros-cableados')">Centros de Cableado</v-btn>
      </v-col>
    </v-row>
      
    <v-row class="mt-5 ml-2" v-if="mostrarInfoPrincipal">
      <v-col>
        <v-card class="mx-auto" max-width="100%">

          <div class="contenedor-imagen">
            <span class="icono-actualizar" data-toggle="modal" data-target="#modalActualizarImagen">
              &#x1F504;
              <v-tooltip activator="parent" location="top">Cambiar Imagen</v-tooltip>
            </span>
            <v-img height="300px" :src="ruta_servidor + '/' + edificio.ruta_imagen" alt="Imagen Edificio" contain></v-img>
          </div>

          <v-card-actions>
            <v-btn color="red-accent-4" text="Más información" @click="show = !show"></v-btn>

            <v-spacer></v-spacer>

            <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-card-text align="left">
                <p v-if="edificio.observacion && edificio.observacion.length > 0"> <b>Observación:</b> <br> {{
                  edificio.observacion }}</p>
              </v-card-text>
              <div class="botones mb-5">
                <button class="btn btn-warning mr-2" data-toggle="modal" data-target="#modalActualizarEdificio"
                  @click="verDatosModal()">Actualizar</button>
                <button v-if="usuario.rol_id === 1" class="btn btn-danger" data-toggle="modal"
                  data-target="#modalEliminarEdificio">Eliminar</button>
              </div>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
      <v-col>
        <ArchivoTarjeta :archivos="archivos" :info_tabla="{ nombre_tabla: 'edificio', id: edificio.id }" />
      </v-col>
    </v-row>

    <div class="mt-5" v-if="mostrarCentrosCableados">
      <CentroCableadoTarjeta :centros_cableados="centros_cableados" :info_edificio="edificio" />
    </div>

    <!-- Modal Atualizar Imagen-->
    <div class="modal fade" id="modalActualizarImagen" tabindex="-1" role="dialog"
      aria-labelledby="modalActualizarImagen" aria-hidden="true" data-backdrop="static" data-keyboard="false">
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
                    <input type="file" class="form-control" name="archivo_edificio" id="archivo_edificio"
                      @change="verImagen(edificio.ruta_imagen)" accept="image/*" ref="inputArchivoEdificio" required>
                  </div>
                  <div class="col-md-12 col-lg-12 mt-3">
                    <img class="imagen-previsualizacion" alt="imagen" id="imagenPrevisualizacionEdificio"
                      ref="imagenPrevisualizacionEdificio" :src="ruta_servidor + '/' + edificio.ruta_imagen">
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
                  <input type="button" class="btn btn-success form-control" value="Guardar"
                    @click="actualizarImagen()" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Eliminar -->
    <div class="modal fade" id="modalEliminarEdificio" tabindex="-1" role="dialog"
      aria-labelledby="modalEliminarEdificio" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Eliminar Edificio
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-4">
                <h5>¿ Eliminar Edificio: {{ edificio.nombre }} ?</h5>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-danger form-control" value="Eliminar"
                    @click="eliminarEdificio()" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Actualizar -->
    <div class="modal fade" id="modalActualizarEdificio" tabindex="-1" role="dialog"
      aria-labelledby="modalActualizarEdificio" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Actualizar Edificio
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form group">
                <label for="nombre" class="requerido">Nombre:</label>
                <input required type="text" placeholder="Ingrese el Nombre" v-model="edificio_actualizar.nombre"
                  class="form-control" />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo" class="requerido">Código:</label>
                  <input required type="text" placeholder="Ingrese el Código" v-model="edificio_actualizar.codigo"
                    class="form-control" />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo">Observación:</label>
                  <textarea type="text" placeholder="Ingrese una observación" v-model="edificio_actualizar.observacion"
                    class="form-control" />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-success form-control" value="Guardar"
                    @click="actualizarEdificio()" />
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
      ruta_servidor: this.axios.defaults.baseURL,
      edificio_actualizar: {},
      show: false,
      showCentroCableatoTarjeta: false,
      mostrarInfoPrincipal: true,
      mostrarCentrosCableados: false
    };
  },
  mounted() {
    const registroString = this.$route.query.registro;
    const registroObjeto = JSON.parse(registroString);
    this.edificio = registroObjeto;
    this.verInfo()
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
            window.location.reload()
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
          if (respuesta.status == 200) {
            console.log(respuesta.data)
            window.location.reload()
          }
        });
    },
    verImagen(urlImagenActual) {
      const archivos = this.$refs.inputArchivoEdificio.files;
      console.log(archivos)

      if ((archivos != null && archivos != undefined) && archivos.length > 0) {
        const primerArchivo = archivos[0];
        const objectURL = URL.createObjectURL(primerArchivo);
        this.$refs.imagenPrevisualizacionEdificio.src = objectURL;
      } else {
        this.$refs.imagenPrevisualizacionEdificio.src = urlImagenActual;
      }
    },
    eliminarEdificio() {
      const id = this.edificio.id
      this.axios
        .delete("edificio/" + id)
        .then((respuesta) => {
          window.location.href = '/'
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    actualizarEdificio() {
      const dato = this.edificio_actualizar
      this.axios
        .put("edificio", dato)
        .then((respuesta) => {
          window.location.reload()
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verInfo() {
      const idEdificio = this.edificio.id
      this.axios.get("edificio/" + idEdificio).then((respuesta) => {
        if (respuesta.status === 200) {
          this.edificio = respuesta.data;
          console.log(this.edificio, 'edificiooo')
        }
      });
    },
    verDatosModal() {
      const dato = this.edificio
      this.edificio_actualizar = { ...dato };
    },
    volver() {
      location.href = '/'
    },
    sesionMostrar(sesion){
      switch(sesion){
        case 'info-principal':
          this.mostrarInfoPrincipal = true
          this.mostrarCentrosCableados = false
        break;
        case 'centros-cableados':
        this.mostrarInfoPrincipal = false
        this.mostrarCentrosCableados = true
          break;
      }
    }
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
}

.contenedor-principal {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-between;
}

.contenedor-tarjeta {
  margin-top: 70px;
}

.imagen-wrapper {
  position: relative;
  display: inline-block;
}

.icono-actualizar {
  position: absolute;
  top: 8px;
  /* Ajusta según tu diseño */
  right: 8px;
  /* Ajusta según tu diseño */
  background-color: rgba(255, 255, 255, 0.8);
  /* Fondo blanco semi-transparente para mejor visibilidad */
  border-radius: 50%;
  /* Para hacer el fondo redondeado */
  padding: 5px;
  /* Espaciado interno */
  cursor: pointer;
  /* Cambia el cursor para indicar que es interactivo */
  font-size: 20px;
  /* Tamaño del ícono */
  z-index: 10;
  /* Asegura que esté por encima de la imagen */
  display: flex;
  justify-content: center;
  align-items: center;
}

.icono-actualizar {
  font-size: 23px;
  /* Tamaño del ícono */
  color: #212121;
  /* Color del ícono */
}

.icono-actualizar:hover {
  background-color: rgba(0, 0, 0, 0.8);
  /* Cambia el fondo al pasar el mouse */
  color: white;
  /* Cambia el color del ícono al pasar el mouse */
}

.imagen-previsualizacion {
  width: 120px;
  height: 120px;
}

.titulo {
  font-weight: 700;
  font-size: 20px;
}

.observacion {
  width: 100%;
  /* Asegura que ocupe todo el ancho disponible */
  display: flex;
  flex-direction: column;
  /* Alinea verticalmente */
  align-items: center;
  /* Centra el contenido dentro del div */
}

.textarea-center {
  width: 100%;
  /* Asegura que el textarea use el ancho total de su contenedor */
  max-width: 500px;
  /* Limita el ancho máximo */
}

.informacion {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
}

.informacion-basica,
.informacion-secundario {
  flex-basis: 100%;
  max-width: 100%;
}

.contenedor-imagen {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #dd4b39;
  padding: 4px;
}

@media (min-width: 768px) {

  .informacion-basica,
  .informacion-secundario {
    flex-basis: 50%;
    max-width: 50%;
  }
}
</style>