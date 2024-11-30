<template>
  <v-app>
    <v-row>
      <v-col cols="2">
        <v-navigation-drawer permanent expand-on-hover :rail="ocultarExpandido" app class="drawer-style">
          <v-list>
            <p v-if="!ocultarExpandido" class="text-center text-danger"><b>{{ edificio.nombre }}</b></p>
            <v-list-item-group v-model="menuSeleccionado">
              <v-list-item prepend-icon="mdi-information" @click="sesionMostrar('info-principal')"
                title="Información Edificio" />
              <v-list-item prepend-icon="mdi-server-network" @click="sesionMostrar('centros-cableados')"
                title="Centros de Cableado" />
              <v-list-item prepend-icon="mdi-arrow-left" @click="volver()" title="Volver al Mapa" />

              <div class="logos" v-if="!ocultarExpandido">
                <img src="../../assets/CSI_Logo.jpg" alt="Logo UFPS" style="width:60px; height: 60px;"> <br>
                <img class="ml-2" src="../../assets/UFPS_logo.jpg" alt="Logo UFPS" style="width:60px; height: 60px;">
              </div>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="10">
        <div class="informacion-principal mt-5 text-center" v-if="mostrarInfoPrincipal">

          <v-row class="container-principal_informacion">
            <v-col cols="6">
              <div class="contenedor-imagen position-relative">
                <v-img height="300px" :src="ruta_servidor + '/' + edificio.ruta_imagen" alt="Imagen Edificio"
                  contain></v-img>
              </div>
            </v-col>

            <v-col class="informacion-detallada text-left" cols="6">
              <p class="text-danger  mb-5">
                <b> Edificio {{ edificio.nombre }}</b>
              </p>
              <p><b>Código:</b> {{ edificio.codigo }}</p>
              <p><b>Observación:</b> {{ edificio.observacion && edificio.observacion.length > 0 ? edificio.observacion : 'Ninguna' }}</p>
              <v-btn class="mr-5 botones-icon" data-toggle="modal" data-target="#modalActualizarImagen">
                <v-icon icon="mdi-image-edit"></v-icon>
                <v-tooltip activator="parent" location="top">Cambiar Imagen</v-tooltip>
              </v-btn>
              <v-btn class="mr-5 botones-icon" data-toggle="modal" data-target="#modalActualizarEdificio"
                @click="verDatosModal()">
                <v-icon icon="mdi-pencil"></v-icon>
                <v-tooltip activator="parent" location="top">Modificar</v-tooltip>
              </v-btn>
              <v-btn v-if="usuario.rol_id === 1" data-toggle="modal" data-target="#modalEliminarEdificio"
                class="botones-icon" @click="verDatosModal()">
                <v-icon icon="mdi-delete"></v-icon>
                <v-tooltip activator="parent" location="top">Eliminar</v-tooltip>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ArchivoTarjeta :archivos="archivos" :info_tabla="{ nombre_tabla: 'edificio', id: edificio.id }" />
            </v-col>
          </v-row>
        </div>

        <div class="centro-cableados text-center" v-if="mostrarCentrosCableados">
          <p class="text-dark">
            <span>
              <v-icon color="grey-darken-4" icon="mdi-domain"></v-icon>
            </span>
            <span class="ml-1">
              {{ edificio.nombre }}
            </span>
          </p>
          <CentroCableadoTarjeta :centros_cableados="centros_cableados" :info_edificio="edificio" @refrescar="refrescar" />
        </div>
      </v-col>
    </v-row>

    <!-- Modal Atualizar Imagen-->
    <div class="modal fade" id="modalActualizarImagen" tabindex="-1" role="dialog"
      aria-labelledby="modalActualizarImagen" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content text-center">
          <div class="modal-header bg-danger">
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
        <div class="modal-content text-center">
          <div class="modal-header bg-danger">
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
        <div class="modal-content text-center">
          <div class="modal-header bg-danger">
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

  </v-app>
</template>

<script>
import CentroCableadoTarjeta from "@/components/centros_cableados/CentroCableadoTarjeta";
import ArchivoTarjeta from "@/components/archivos/ArchivoTarjeta";
import { mapGetters } from "vuex";
import Mensaje from "@/components/Mensaje.vue";
import Footer from "@/components/parciales/Footer.vue";
export default {
  components: { Mensaje, CentroCableadoTarjeta, ArchivoTarjeta, Footer },
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
      mostrarCentrosCableados: false,
      ocultarExpandido: false
    };
  },
  mounted() {
    const registroString = this.$route.query.registro;
    const registroObjeto = JSON.parse(registroString);
    this.edificio = registroObjeto;
    this.verInfo()
    this.verCentrosCableados()
    this.verArchivos()
    this.verificarAnchoPantalla(); // Verifica al cargar el componente
    window.addEventListener('resize', this.verificarAnchoPantalla);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.verificarAnchoPantalla);
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    refrescar(){
      this.sesionMostrar('centros-cableados')
      this.verCentrosCableados()
    },
    verificarAnchoPantalla() {
      this.ocultarExpandido = window.innerWidth < 1500;
    },
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
    sesionMostrar(sesion) {
      switch (sesion) {
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
.drawer-style {
  padding-top: 70px;
  height: 100vh;
  /* Hace que el drawer ocupe todo el alto de la vista */
  border-right: 3px solid #dd4b39;
  /* Opcional: agrega un borde */
  background-color: #E0E0E0;
}

.drawer-style .v-list-item {
  color: #000;
  /* Color del texto */
}


#imagen {
  width: 250px;
  height: 250px;
  border-radius: 182px;
}

.imagen-wrapper {
  position: relative;
  display: inline-block;
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
  padding: 4px;
  border-radius: 5px;
}

.v-icon {
  font-size: 28px;
}

.container-principal_informacion {
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 80%;
  /* Asegura que ocupe todo el ancho del contenedor padre */
  margin: 0 auto;
  /* Centra el contenedor horizontalmente */
  border: solid #424242;
  border-radius: 15px;
}

.logos {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  flex-direction: row;
}

.botones-icon {
  font-size: 25px;
  color: #00B0FF;
  background-color: #fff;
  border: solid #fff;
}
</style>
