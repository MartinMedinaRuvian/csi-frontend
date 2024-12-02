<template>
  <v-app>
    <v-row>
      <v-col cols="2">
        <v-navigation-drawer permanent expand-on-hover :rail="ocultarExpandido" app class="drawer-style">
          <v-list>
            <p v-if="!ocultarExpandido" class="text-center text-danger"><b>Centro de Cableado #{{ centro_cableado.numero
                }}</b></p>
            <v-list-item-group v-model="menuSeleccionado">
              <v-list-item prepend-icon="mdi-information" @click="sesionMostrar('info-principal')"
                title="Info C. Cableado" />
              <v-list-item prepend-icon="mdi-file-cabinet" @click="sesionMostrar('gabinetes')"
                title="Gabinetes (Racks)" />
              <v-list-item prepend-icon="mdi-file-document-multiple" @click="sesionMostrar('proyectos')"
                title="Proyectos" />
              <v-list-item prepend-icon="mdi-arrow-left" @click="volver()" title="Volver al Edificio" />
              <div class="logos" v-if="!ocultarExpandido">
                <img src="../../assets/CSI_Logo.jpg" alt="Logo UFPS" style="width:60px; height: 60px;"> <br>
                <img class="ml-2" src="../../assets/UFPS_logo.jpg" alt="Logo UFPS" style="width:60px; height: 60px;">
              </div>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="10">
        <div class="ruta text-center">
          <h6 v-if="mostrarInfoPrincipal">
            <span>
              <v-icon color="grey-darken-4" icon="mdi-domain"></v-icon>
            </span>
            <span class="ml-1">
              {{ info_edificio.nombre }}
            </span>
          </h6>
          <h6 v-else>
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
          </h6>
        </div>
        <div class="informacion-principal mt-5 text-center" v-if="mostrarInfoPrincipal">

          <v-row class="container-principal_informacion">
            <v-col cols="7">
              <div class="contenedor-imagen position-relative">
                <v-img height="300px" :src="ruta_servidor + '/' + centro_cableado.ruta_imagen" alt="Imagen Edificio"
                  contain></v-img>
              </div>
              <p class="text-danger  mb-5">
                <b>Centro de Cableado #{{ centro_cableado.numero }}</b>
              </p>
            </v-col>

            <v-col class="informacion-detallada text-left" cols="5">
              <p><b>Ubicación:</b> {{ centro_cableado.ubicacion }}</p>
              <p>{{ centro_cableado.tipo }}</p>

              <p>{{
                centro_cableado.climatizado
                  === 'S' ? 'Climatizado &#10052;' : 'No esta climatizado' }}</p>
              <p>{{ centro_cableado.camaras
                === 'S'
                ? 'Con cámaras &#128247;' : 'No tiene cámaras' }}</p>

              <p :class="centro_cableado.acceso_llaves === 'S' ? 'text-dark' : 'text-warning'">{{
                centro_cableado.acceso_llaves === 'S' ? 'Acceso con llaves &#128273;' : 'Sin acceso con llaves' }}</p>
              <p>
                {{ centro_cableado.acceso_biometrico === 'S' ? 'Acceso biométrico &#128070;' : 'Sin acceso biométrico'
                }}</p>

              <p><b>Observación:</b> {{ centro_cableado.observacion && centro_cableado.observacion.length > 0 ?
                centro_cableado.observacion :
                'Ninguna' }}</p>


              <v-btn class="mr-5 botones-icon" data-toggle="modal" data-target="#modalActualizarImagen">
                <v-icon icon="mdi-image-edit"></v-icon>
                <v-tooltip activator="parent" location="top">Cambiar Imagen</v-tooltip>
              </v-btn>
              <v-btn class="mr-5 botones-icon" data-toggle="modal" data-target="#modalactualizarCentroCableado"
                @click="verDatosModal()">
                <v-icon icon="mdi-pencil"></v-icon>
                <v-tooltip activator="parent" location="top">Modificar</v-tooltip>
              </v-btn>
              <v-btn v-if="usuario.rol_id === 1" data-toggle="modal" data-target="#modaleliminarCentroCableado"
                class="botones-icon" @click="verDatosModal()">
                <v-icon icon="mdi-delete"></v-icon>
                <v-tooltip activator="parent" location="top">Eliminar</v-tooltip>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ArchivoTarjeta :archivos="archivos"
                :info_tabla="{ nombre_tabla: 'centro_cableado', id: centro_cableado.id }" />
            </v-col>
          </v-row>
        </div>

        <div class="centro-cableados text-center" v-if="mostrarCentrosCableados">
          <p class="text-dark">
            <span>
              <v-icon color="grey-darken-4" icon="mdi-domain"></v-icon>
            </span>
            <span class="ml-1">
              {{ edificio.numero }}
            </span>
          </p>
          <CentroCableadoTarjeta :centros_cableados="centros_cableados" :info_edificio="edificio"
            @refrescar="refrescar" />
        </div>

        <div v-if="mostrarProyectos">
          <ProyectoTarjeta :proyectos="proyectos"
            :info_tabla="{ nombre_tabla: 'centro_cableado', id: centro_cableado.id }" :info_edificio="info_edificio"
            :info_centro_cableado="info_centro_cableado" @filtrar="filtrar" />
        </div>

        <div v-if="mostrarGabinetes" class="mt-5 text-center">
          <GabineteTarjeta :gabinetes="gabinetes" :info_centro_cableado="info_centro_cableado"
            :info_edificio="info_edificio" @refrescar="refrescar" />
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
                    <input type="file" class="form-control" name="archivo_centro_cableado" id="archivo_centro_cableado"
                      @change="verImagen(centro_cableado.ruta_imagen)" accept="image/*"
                      ref="inputArchivocentro_cableado" required>
                  </div>
                  <div class="col-md-12 col-lg-12 mt-3">
                    <img class="imagen-previsualizacion" alt="imagen" id="imagenPrevisualizacioncentro_cableado"
                      ref="imagenPrevisualizacioncentro_cableado"
                      :src="ruta_servidor + '/' + centro_cableado.ruta_imagen">
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
    <div class="modal fade" id="modaleliminarCentroCableado" tabindex="-1" role="dialog"
      aria-labelledby="modaleliminarCentroCableado" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content text-center">
          <div class="modal-header bg-danger">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Eliminar Centro de Cableado
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-4">
                <h5>¿ Eliminar Centro de Cableado: #{{ centro_cableado.numero }} ?</h5>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-danger form-control" value="Eliminar"
                    @click="eliminarCentroCableado()" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Actualizar -->
    <div class="modal fade" id="modalactualizarCentroCableado" tabindex="-1" role="dialog"
      aria-labelledby="modalactualizarCentroCableado" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content text-center">
          <div class="modal-header bg-danger">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Actualizar Centro de Cableado
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form group">
                <label for="numero" class="requerido">Número:</label>
                <input required type="number" placeholder="Ingrese el Número"
                  v-model="centro_cableado_actualizar.numero" class="form-control" />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo" class="requerido">Ubicación:</label>
                  <input required type="text" placeholder="Ingrese ubicación"
                    v-model="centro_cableado_actualizar.ubicacion" class="form-control" />
                </div>
              </div>

              <div class="form-group">
                <label for="tipo" class="requerido">Tipo:</label>
                <select id="tipo" class="form-select form-control" v-model="centro_cableado_actualizar.tipo">
                  <option v-for="tipo in tiposCentroCableado" :value="tipo" :key="tipo" class="text-success">
                    {{ tipo }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="tipo" class="requerido">Climatizado:</label>
                <select id="tipo" class="form-select form-control" v-model="centro_cableado_actualizar.climatizado">
                  <option v-for="opcion in opcionesRespuesta" :value="opcion.valor" :key="opcion.valor"
                    class="text-success">
                    {{ opcion.descripcion }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="tipo" class="requerido">Camaras:</label>
                <select id="tipo" class="form-select form-control" v-model="centro_cableado_actualizar.camaras">
                  <option v-for="opcion in opcionesRespuesta" :value="opcion.valor" :key="opcion.valor"
                    class="text-success">
                    {{ opcion.descripcion }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="tipo" class="requerido">Acceso por llaves:</label>
                <select id="tipo" class="form-select form-control" v-model="centro_cableado_actualizar.acceso_llaves">
                  <option v-for="opcion in opcionesRespuesta" :value="opcion.valor" :key="opcion.valor"
                    class="text-success">
                    {{ opcion.descripcion }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="tipo" class="requerido">Acceso Biometrico:</label>
                <select id="tipo" class="form-select form-control"
                  v-model="centro_cableado_actualizar.acceso_biometrico">
                  <option v-for="opcion in opcionesRespuesta" :value="opcion.valor" :key="opcion.valor"
                    class="text-success">
                    {{ opcion.descripcion }}
                  </option>
                </select>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo">Observación:</label>
                  <textarea type="text" placeholder="Ingrese una observación"
                    v-model="centro_cableado_actualizar.observacion" class="form-control" />
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
                    @click="actualizarCentroCableado()" />
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
import GabineteTarjeta from "@/components/gabinetes/GabineteTarjeta";
import ArchivoTarjeta from "@/components/archivos/ArchivoTarjeta";
import { mapGetters } from "vuex";
import Mensaje from "@/components/Mensaje.vue";
import ProyectoTarjeta from "@/components/proyectos/ProyectoTarjeta.vue";
export default {
  components: { Mensaje, GabineteTarjeta, ArchivoTarjeta, ProyectoTarjeta },
  data() {
    return {
      centro_cableado: {},
      gabinetes: [],
      archivos: [],
      proyectos: [],
      mensaje: { ver: false },
      ruta_servidor: this.axios.defaults.baseURL,
      tiposCentroCableado: ['EN OFICINA', 'INDEPENDIENTE'],
      opcionesRespuesta: [{ descripcion: 'SI', valor: 'S' }, { descripcion: 'NO', valor: 'N' }],
      centro_cableado_actualizar: {},
      info_edificio: {},
      info_centro_cableado: {},
      show: false,
      mostrarInfoPrincipal: true,
      mostrarGabinetes: false,
      mostrarProyectos: false,
      ocultarExpandido: false
    };
  },
  mounted() {
    const registroString = this.$route.query.registro;
    const registroObjeto = JSON.parse(registroString);
    this.centro_cableado = registroObjeto;
    console.log(registroObjeto, 'registrocentro')

    this.info_edificio = registroObjeto.info_edificio

    this.verInfo()
    this.verGabinetes()
    this.verArchivos()
    this.verProyectos('p.codigo', '')
    this.verificarAnchoPantalla(); // Verifica al cargar el componente
    window.addEventListener('resize', this.verificarAnchoPantalla);
    this.sesionMostrar('gabinetes')
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
      console.log(datos, 'titin')
      const condicion = datos.condicion
      const buscar = datos.buscar
      this.verProyectos(condicion, buscar)
    },
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    actualizar() {
      this.axios
        .post("centro_cableado", this.centro_cableado)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            //this.$router.push('/centro_cableados')
            window.location.reload()
            $("#modalGuardarcentro_cableado").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verGabinetes() {
      const id = this.centro_cableado.id
      this.axios.get("gabinete/" + id).then((respuesta) => {
        if (respuesta.status === 200) {
          this.gabinetes = respuesta.data;
          console.log(this.gabinetes, 'gabinetes')
        }
      });
    },
    verArchivos() {
      const idcentro_cableado = this.centro_cableado.id
      this.axios.get("archivo/centro_cableado/" + idcentro_cableado).then((respuesta) => {
        if (respuesta.status === 200) {
          this.archivos = respuesta.data;
        }
      });
    },
    verProyectos(condicion, buscar) {
      const id = this.centro_cableado.id
      const buscarPor = {
        condicion,
        buscar
      }
      console.log(buscarPor, 'djtitin')
      this.axios.post("proyecto/info_principal/centro_cableado/" + id, buscarPor).then((respuesta) => {
        if (respuesta.status === 200) {
          this.proyectos = respuesta.data;
        }
      });
    },
    actualizarImagen() {
      const numeroTabla = 'centro_cableado'
      const id = this.centro_cableado.id
      var formData = new FormData();
      var imagefile = document.querySelector("#archivo_centro_cableado");
      formData.append("archivo", imagefile.files[0]);
      this.axios
        .put("imagen/" + numeroTabla + "/" + id, formData, {
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
      const archivos = this.$refs.inputArchivocentro_cableado.files;
      console.log(archivos)

      if ((archivos != null && archivos != undefined) && archivos.length > 0) {
        const primerArchivo = archivos[0];
        const objectURL = URL.createObjectURL(primerArchivo);
        this.$refs.imagenPrevisualizacioncentro_cableado.src = objectURL;
      } else {
        this.$refs.imagenPrevisualizacioncentro_cableado.src = urlImagenActual;
      }
    },
    eliminarCentroCableado() {
      const id = this.centro_cableado.id
      this.axios
        .delete("centro_cableado/" + id)
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
    actualizarCentroCableado() {
      const dato = this.centro_cableado_actualizar
      this.axios
        .put("centro_cableado", dato)
        .then((respuesta) => {
          window.location.reload()
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verInfo() {
      const id = this.centro_cableado.id
      this.axios.get("centro_cableado/info/" + id).then((respuesta) => {
        if (respuesta.status === 200) {
          this.centro_cableado = respuesta.data;
          console.log(this.centro_cableado, 'centro_cableadooo')
          this.info_centro_cableado = {
            id: this.centro_cableado.id,
            numero: this.centro_cableado.numero
          }
        }
      });
    },
    rutaImagenVer(ruta_imagen) {
      const ruta = ruta_imagen != null && ruta_imagen != undefined ? ruta_imagen : 'archivos/centro_cableado_default.svg'
      return this.ruta_servidor + '/' + ruta
    },
    verDatosModal() {
      const dato = this.centro_cableado
      this.centro_cableado_actualizar = { ...dato };
    },
    volver() {
      const id = this.centro_cableado.id_edificio
      const datosRegistro = {
        id
      }
      location.href = "/edificio?registro=" + JSON.stringify(datosRegistro)
    },
    sesionMostrar(sesion) {
      switch (sesion) {
        case 'info-principal':
          this.mostrarInfoPrincipal = true
          this.mostrarGabinetes = false
          this.mostrarProyectos = false
          break;
        case 'gabinetes':
          this.mostrarInfoPrincipal = false
          this.mostrarGabinetes = true
          this.mostrarProyectos = false
          break;
        case 'proyectos':
          this.mostrarInfoPrincipal = false
          this.mostrarGabinetes = false
          this.mostrarProyectos = true
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