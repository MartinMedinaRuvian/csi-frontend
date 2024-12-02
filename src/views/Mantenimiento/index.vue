<template>
  <v-app>
    <v-row>
      <v-col cols="2">
        <v-navigation-drawer permanent expand-on-hover :rail="ocultarExpandido" app class="drawer-style">
          <v-list>
            <p v-if="!ocultarExpandido" class="text-center text-danger"><b>Mantenimiento #{{ mantenimiento.codigo }}</b></p>
            <v-list-item-group v-model="menuSeleccionado">
              <v-list-item prepend-icon="mdi-arrow-left" @click="volver()" title="Volver" />

              <div class="logos" v-if="!ocultarExpandido">
                <img src="../../assets/CSI_Logo.jpg" alt="Logo UFPS" style="width:60px; height: 60px;"> <br>
                <img class="ml-2" src="../../assets/UFPS_logo.jpg" alt="Logo UFPS" style="width:60px; height: 60px;">
              </div>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="10">

        <div class="informacion-principal mt-5 text-center">


          <div class="ruta mb-5">
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
              -
              <span>
                <v-icon color="grey-darken-4" icon="mdi-file-cabinet"></v-icon>
              </span>
              <span>
                GABINETE R{{
                  info_gabinete.numero }}
              </span>
              -
              <span>
                <v-icon color="grey-darken-4" icon="mdi-devices"></v-icon>
              </span>
              <span>
                ELEMENTO {{ info_elemento.codigo }}
              </span>
            </h6>
          </div>

          <v-row class="container-principal_informacion">
            <v-col cols="4" class="informacion-detallada text-left">
              <p class="text-danger  mb-5">
                <b>Mantenimiento #{{ mantenimiento.codigo }}</b>
              </p>
              <p>
                <b>Observación: </b> {{ mantenimiento.observacion }}
              </p>
              <p>
                <b>Realizado Por: </b> {{ mantenimiento.realizado_por }}
              </p>
              <p><b>Fecha Ejecución:</b> {{ formatearFecha(mantenimiento.fecha) }}</p>


              <v-btn class="mr-5 botones-icon" data-toggle="modal" data-target="#modalActualizarMantenimiento"
                @click="verDatosModal()">
                <v-icon icon="mdi-pencil"></v-icon>
                <v-tooltip activator="parent" location="top">Modificar</v-tooltip>
              </v-btn>
              <v-btn v-if="usuario.rol_id === 1" data-toggle="modal" data-target="#modaleliminarMantenimiento"
                class="botones-icon" @click="verDatosModal()">
                <v-icon icon="mdi-delete"></v-icon>
                <v-tooltip activator="parent" location="top">Eliminar</v-tooltip>
              </v-btn>
            </v-col>

            <v-col cols="8">
              <ArchivoTarjeta :archivos="archivos"
                :info_tabla="{ nombre_tabla: 'mantenimiento', id: mantenimiento.id }" />
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <!-- Modal Eliminar -->
    <div class="modal fade" id="modaleliminarMantenimiento" tabindex="-1" role="dialog"
      aria-labelledby="modaleliminarMantenimiento" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content text-center">
          <div class="modal-header bg-danger">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Eliminar Mantenimiento
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-4">
                <h5>¿ Eliminar Mantenimiento con el Código: {{ mantenimiento.codigo }} ?</h5>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-danger form-control" value="Eliminar"
                    @click="eliminarMantenimiento()" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Actualizar -->
    <div class="modal fade" id="modalActualizarMantenimiento" tabindex="-1" role="dialog"
      aria-labelledby="modalActualizarMantenimiento" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content text-center">
          <div class="modal-header bg-danger">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Actualizar Mantenimiento
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form group">
                <label for="nombrecompleto" class="requerido">Código:</label>
                <input type="text" placeholder="Ingrese Código" v-model="mantenimiento_actualizar.codigo"
                  class="form-control" />
              </div>

              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">Realizado Por:</label>
                <input type="text" placeholder="Ingrese el Realizado Por"
                  v-model="mantenimiento_actualizar.realizado_por" class="form-control" />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo">Observación:</label>
                  <textarea type="text" placeholder="Ingrese una observación"
                    v-model="mantenimiento_actualizar.observacion" class="form-control" />
                </div>
              </div>


              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">Fecha:</label>
                <input type="date" placeholder="Fecha" v-model="mantenimiento_actualizar.fecha" class="form-control" />
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-success form-control" value="Guardar"
                    @click="actualizarMantenimiento()" />
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
import ArchivoTarjeta from "@/components/archivos/ArchivoTarjeta";
import { mapGetters } from "vuex";
import Mensaje from "@/components/Mensaje.vue";
import FechaUtil from "@/util/FechaUtil";
export default {
  components: { Mensaje, ArchivoTarjeta },
  data() {
    return {
      mantenimiento: {},
      elementos: [],
      archivos: [],
      mensaje: { ver: false },
      mantenimiento_actualizar: {},
      rutaVolver: '',
      info_edificio: {},
      info_centro_cableado: {},
      info_gabinete: {},
      info_elemento: {}
    };
  },
  mounted() {
    const registroString = this.$route.query.registro;
    const registroObjeto = JSON.parse(registroString);
    this.rutaVolver = registroObjeto.ruta_volver
    this.idVolver = registroObjeto.id_volver
    this.mantenimiento = registroObjeto,
      this.info_edificio = registroObjeto.info_edificio
    this.info_centro_cableado = registroObjeto.info_centro_cableado
    this.info_gabinete = registroObjeto.info_gabinete
    this.info_elemento = registroObjeto.info_elemento
    this.verInfo(registroObjeto.id);
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
        .post("mantenimiento", this.mantenimiento)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            //this.$router.push('/elementos')
            window.location.reload()
            $("#modalGuardarmantenimiento").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verArchivos() {
      const idmantenimiento = this.mantenimiento.id
      this.axios.get("archivo/mantenimiento/" + idmantenimiento).then((respuesta) => {
        if (respuesta.status === 200) {
          this.archivos = respuesta.data;
        }
      });
    },
    eliminarMantenimiento() {
      const id = this.mantenimiento.id
      const idRegistroTabla = this.idVolver
      const tabla = this.verNombreTabla(this.rutaVolver)
      this.axios
        .delete("mantenimiento/" + tabla + "/" + idRegistroTabla + "/" + id)
        .then((respuesta) => {
          if (respuesta.status == 200) {
            $("#modalEliminarMantenimiento").modal("hide");
            this.volver()
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verNombreTabla(nombreTabla) {
      const tabla = nombreTabla.replace('-', '_')
      return tabla
    },
    actualizarMantenimiento() {
      const mantenimiento = this.mantenimiento_actualizar
      const dato = {
        id: mantenimiento.id,
        codigo: mantenimiento.codigo,
        realizado_por: mantenimiento.realizado_por,
        observacion: mantenimiento.observacion,
        fecha: mantenimiento.fecha
      }
      this.axios
        .put("mantenimiento", dato)
        .then((respuesta) => {
          window.location.reload()
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verInfo(id) {
      this.axios.get("/mantenimiento/" + id).then((respuesta) => {
        if (respuesta.status === 200) {
          this.mantenimiento = respuesta.data;
          console.log(this.mantenimiento, 'mantenimientooo')
        }
      });
    },
    verDatosModal() {
      const dato = this.mantenimiento
      this.mantenimiento_actualizar = { ...dato };
      this.mantenimiento_actualizar.fecha = this.formatearFecha(this.mantenimiento_actualizar.fecha)
    },
    volver() {
      const id = this.idVolver
      const rutaVolver = this.rutaVolver
      console.log(rutaVolver)
      const datosRegistro = {
        id,
        info_edificio: this.info_edificio,
        info_centro_cableado: this.info_centro_cableado,
        info_gabinete: this.info_gabinete
      }
      location.href = "/" + rutaVolver + "?registro=" + JSON.stringify(datosRegistro)
    },
    formatearFecha(fecha) {
      return FechaUtil.formatearFecha(fecha);
    },
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
  width: 95%;
  /* Asegura que ocupe todo el ancho del contenedor padre */
  margin: 0 auto;
  /* Centra el contenedor horizontalmente */
  border: solid 0.25px #212121;
  border-radius: 15px;
  padding: 20px;
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