<template>
  <v-app>
    <v-row>
      <v-col cols="2">
        <v-navigation-drawer permanent expand-on-hover :rail="ocultarExpandido" app class="drawer-style">
          <v-list>
            <p v-if="!ocultarExpandido" class="text-center text-danger"><b>Gabinete R{{ gabinete.numero }}</b></p>
            <v-list-item-group v-model="menuSeleccionado">
              <v-list-item prepend-icon="mdi-information" @click="sesionMostrar('info-principal')"
                title="Información Gabinete" />
              <v-list-item prepend-icon="mdi-devices" @click="sesionMostrar('elementos')" title="Elementos" />
              <v-list-item prepend-icon="mdi-arrow-left" @click="volver()" title="Volver al C. Cableado" />

              <div class="logos" v-if="!ocultarExpandido">
                <img src="../../assets/CSI_Logo.jpg" alt="Logo UFPS" style="width:60px; height: 60px;"> <br>
                <img class="ml-2" src="../../assets/UFPS_logo.jpg" alt="Logo UFPS" style="width:60px; height: 60px;">
              </div>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="10 text-center">
        <div class="ruta">
          <h6>
            <span>
              <v-icon color="grey-darken-4" icon="mdi-domain"></v-icon>
            </span>
            <span class="ml-1">
              {{ info_edificio.nombre }}
            </span>
            -
            <span>
              <v-icon color="grey-darken-4" icon="mdi-server-network"></v-icon>
            </span>
            <span>
              C. CABLEADO #{{ info_centro_cableado.numero }}
            </span>
            <span v-if="!mostrarInfoPrincipal">
              -
              <v-icon color="grey-darken-4" icon="mdi-file-cabinet"></v-icon>
            </span>
            <span v-if="!mostrarInfoPrincipal">
              GABINETE R{{
                info_gabinete.numero }}
            </span>
          </h6>
        </div>
        <div class="informacion-principal mt-5 text-center" v-if="mostrarInfoPrincipal">

          <v-row class="container-principal_informacion">
            <v-col cols="6">
              <div class="contenedor-imagen position-relative">
                <v-img height="300px" :src="ruta_servidor + '/' + gabinete.ruta_imagen" alt="Imagen" contain></v-img>
              </div>
            </v-col>

            <v-col class="informacion-detallada text-left" cols="6">
              <p class="text-danger  mb-5">
                <b>Gabinete R{{ gabinete.numero }}</b>
              </p>
              <p><b>{{ gabinete.tipo }}</b></p>
              <p v-if="gabinete.aterrizado === 'S'"><span>Aterrizado <v-icon icon="mdi-flash"></v-icon></span></p>
              <p v-else><span>No esta Aterrizado <v-icon icon="mdi-flash-off"></v-icon></span></p>
              <p><b>Observación:</b> {{ gabinete.observacion && gabinete.observacion.length > 0 ? gabinete.observacion
                : 'Ninguna' }}</p>
              <v-btn class="mr-5 botones-icon" data-toggle="modal" data-target="#modalActualizarImagen">
                <v-icon icon="mdi-image-edit"></v-icon>
                <v-tooltip activator="parent" location="top">Cambiar Imagen</v-tooltip>
              </v-btn>
              <v-btn class="mr-5 botones-icon" data-toggle="modal" data-target="#modalActualizarGabinete"
                @click="verDatosModal()">
                <v-icon icon="mdi-pencil"></v-icon>
                <v-tooltip activator="parent" location="top">Modificar</v-tooltip>
              </v-btn>
              <v-btn v-if="usuario.rol_id === 1" data-toggle="modal" data-target="#modaleliminarGabinete"
                class="botones-icon" @click="verDatosModal()">
                <v-icon icon="mdi-delete"></v-icon>
                <v-tooltip activator="parent" location="top">Eliminar</v-tooltip>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ArchivoTarjeta :archivos="archivos" :info_tabla="{ nombre_tabla: 'gabinete', id: gabinete.id }" />
            </v-col>
          </v-row>
        </div>

        <div v-if="mostrarElementos">
          <ElementoTarjeta :elementosActivos="elementosActivos" :elementosPasivos="elementosPasivos"
            :info_gabinete="info_gabinete" :info_edificio="info_edificio" :info_centro_cableado="info_centro_cableado"
            :condicion="condicion" :buscar="buscar" @filtrar="filtrar" />
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
                    <input type="file" class="form-control" name="archivo_gabinete" id="archivo_gabinete"
                      @change="verImagen(gabinete.ruta_imagen)" accept="image/*" ref="inputArchivogabinete" required>
                  </div>
                  <div class="col-md-12 col-lg-12 mt-3">
                    <img class="imagen-previsualizacion" alt="imagen" id="imagenPrevisualizaciongabinete"
                      ref="imagenPrevisualizaciongabinete" :src="rutaImagenVer(gabinete.ruta_imagen)">
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
    <div class="modal fade" id="modaleliminarGabinete" tabindex="-1" role="dialog"
      aria-labelledby="modaleliminarGabinete" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content text-center">
          <div class="modal-header bg-danger">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Eliminar Gabinete
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-4">
                <h5>¿ Eliminar Gabinete: R{{ gabinete.numero }} ?</h5>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-danger form-control" value="Eliminar"
                    @click="eliminarGabinete()" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Actualizar -->
    <div class="modal fade" id="modalActualizarGabinete" tabindex="-1" role="dialog"
      aria-labelledby="modalActualizarGabinete" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content text-center">
          <div class="modal-header bg-danger">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Actualizar Gabinete
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form group">
                <label for="nombre" class="requerido">Número:</label>
                <input required type="number" placeholder="Ingrese el Número" v-model="gabinete_actualizar.numero"
                  class="form-control" />
              </div>

              <div class="form-group mt-3">
                <label for="tipo" class="requerido">Tipo:</label>
                <select id="tipo" class="form-select form-control" v-model="gabinete_actualizar.id_tipo_gabinete">
                  <option v-for="tipo in tiposGabinetes" :value="tipo.id" :key="tipo.id" class="text-success">
                    {{ tipo.descripcion }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="tipo" class="requerido">¿Esta Aterrizado?</label>
                <select id="tipo" class="form-select form-control" v-model="gabinete_actualizar.aterrizado">
                  <option v-for="opcion in opcionesRespuesta" :value="opcion.valor" :key="opcion.valor"
                    class="text-success">
                    {{ opcion.descripcion }}
                  </option>
                </select>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo" class="requerido">Tamaño:</label>
                  <input required type="text" placeholder="Ingrese tamaño" v-model="gabinete_actualizar.tamanio"
                    class="form-control" />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo">Observación:</label>
                  <textarea type="text" placeholder="Ingrese una observación" v-model="gabinete_actualizar.observacion"
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
                    @click="actualizarGabinete()" />
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
import ElementoTarjeta from "@/components/elementos/ElementoTarjeta";
import ArchivoTarjeta from "@/components/archivos/ArchivoTarjeta";
import { mapGetters } from "vuex";
import Mensaje from "@/components/Mensaje.vue";
export default {
  components: { Mensaje, ElementoTarjeta, ArchivoTarjeta },
  data() {
    return {
      gabinete: {},
      elementos: [],
      elementosActivos: [],
      elementosPasivos: [],
      archivos: [],
      mensaje: { ver: false },
      ruta_servidor: this.axios.defaults.baseURL,
      tiposCentroCableado: ['EN OFICINA', 'INDEPENDIENTE'],
      opcionesRespuesta: [{ descripcion: 'SI', valor: 'S' }, { descripcion: 'NO', valor: 'N' }],
      gabinete_actualizar: {},
      info_edificio: {},
      info_centro_cableado: {},
      info_gabinete: {},
      show: false,
      mostrarInfoPrincipal: true,
      mostrarElementos: false,
      ocultarExpandido: false
    };
  },
  mounted() {
    const registroString = this.$route.query.registro;
    const registroObjeto = JSON.parse(registroString);
    this.gabinete = registroObjeto;
    this.info_edificio = registroObjeto.info_edificio
    this.info_centro_cableado = registroObjeto.info_centro_cableado
    this.verInfo()
    this.verElemenosActivos('e.codigo', '')
    this.verElemenosPasivos('e.codigo', '')
    this.verArchivos()
    this.verTiposGabinetes()
    this.sesionMostrar('elementos')
    window.addEventListener('resize', this.verificarAnchoPantalla);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.verificarAnchoPantalla);
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    verificarAnchoPantalla() {
      this.ocultarExpandido = window.innerWidth < 1500;
    },
    filtrar(datos) {
      console.log(datos, 'dt')
      const condicion = datos.condicion
      const buscar = datos.buscar
      if (datos.tipo === 'ACTIVO') {
        this.verElemenosActivos(condicion, buscar)
      } else {
        this.verElemenosPasivos(condicion, buscar)
      }
    },
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    actualizar() {
      this.axios
        .post("gabinete", this.gabinete)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            //this.$router.push('/elementos')
            window.location.reload()
            $("#modalGuardargabinete").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verElemenosActivos(condicion, buscar) {
      const id = this.gabinete.id
      const buscarPor = {
        condicion,
        buscar
      }
      this.axios.post("elemento_activo/info_principal/" + id, buscarPor).then((respuesta) => {
        if (respuesta.status === 200) {
          this.elementosActivos = respuesta.data;
        }
      });
    },
    verElemenosPasivos(condicion, buscar) {
      const id = this.gabinete.id
      const buscarPor = {
        condicion,
        buscar
      }
      this.axios.post("elemento_pasivo/info_principal/" + id, buscarPor).then((respuesta) => {
        if (respuesta.status === 200) {
          this.elementosPasivos = respuesta.data;
        }
      });
    },
    verArchivos() {
      const idgabinete = this.gabinete.id
      this.axios.get("archivo/gabinete/" + idgabinete).then((respuesta) => {
        if (respuesta.status === 200) {
          this.archivos = respuesta.data;
        }
      });
    },
    actualizarImagen() {
      const nombreTabla = 'gabinete'
      const id = this.gabinete.id
      var formData = new FormData();
      var imagefile = document.querySelector("#archivo_gabinete");
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
      const archivos = this.$refs.inputArchivogabinete.files;
      console.log(archivos)

      if ((archivos != null && archivos != undefined) && archivos.length > 0) {
        const primerArchivo = archivos[0];
        const objectURL = URL.createObjectURL(primerArchivo);
        this.$refs.imagenPrevisualizaciongabinete.src = objectURL;
      } else {
        this.$refs.imagenPrevisualizaciongabinete.src = urlImagenActual;
      }
    },
    eliminarGabinete() {
      const id = this.gabinete.id
      this.axios
        .delete("gabinete/" + id)
        .then((respuesta) => {
          if (respuesta.status == 200) {
            $("#modalEliminarCentroCableado").modal("hide");
            this.volver()
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    actualizarGabinete() {
      const gabinete = this.gabinete_actualizar
      const dato = {
        id: gabinete.id,
        numero: gabinete.numero,
        tamanio: gabinete.tamanio,
        aterrizado: gabinete.aterrizado,
        observacion: gabinete.observacion,
        id_centro_cableado: gabinete.id_centro_cableado,
        id_tipo_gabinete: gabinete.id_tipo_gabinete
      }
      this.axios
        .put("gabinete", dato)
        .then((respuesta) => {
          window.location.reload()
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verInfo() {
      const id = this.gabinete.id
      this.axios.get("gabinete/info/" + id).then((respuesta) => {
        if (respuesta.status === 200) {
          this.gabinete = respuesta.data;
          console.log(this.gabinete, 'gabineteoo')
          this.verTipoGabinetePorId()
          this.info_gabinete = {
            id: this.gabinete.id,
            numero: this.gabinete.numero
          }
        }
      });
    },
    rutaImagenVer(ruta_imagen) {
      const ruta = ruta_imagen != null && ruta_imagen != undefined ? ruta_imagen : 'archivos/gabinete_default.svg'
      return this.ruta_servidor + '/' + ruta
    },
    verDatosModal() {
      const dato = this.gabinete
      this.gabinete_actualizar = { ...dato };
    },
    volver() {
      const id = this.gabinete.id_centro_cableado
      const datosRegistro = {
        id,
        info_edificio: this.info_edificio
      }
      location.href = "/centro-cableado?registro=" + JSON.stringify(datosRegistro)
    },
    verTipoGabinetePorId() {
      const idTipoGabinete = this.gabinete.id_tipo_gabinete
      this.axios.get("tipo_gabinete/" + idTipoGabinete)
        .then((respuesta) => {
          this.gabinete.tipo = respuesta.data.descripcion
        })
        .catch(error => console.log(error))
    },
    verTiposGabinetes() {
      this.axios.get("tipo_gabinete")
        .then((respuesta) => {
          this.tiposGabinetes = respuesta.data
        })
        .catch(error => console.log(error))
    },
    sesionMostrar(sesion) {
      switch (sesion) {
        case 'info-principal':
          this.mostrarInfoPrincipal = true
          this.mostrarElementos = false
          break;
        case 'elementos':
          this.mostrarInfoPrincipal = false
          this.mostrarElementos = true
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
  border: solid 0.5px #212121;
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
