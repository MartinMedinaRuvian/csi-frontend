<template>
  <div class="text-center">
    <div class="ruta">
      <h6>
        <span>
          <v-icon color="red-accent-4" icon="mdi-domain"></v-icon>
        </span>
        <span class="ml-1">
          {{ info_edificio.nombre }}
        </span>
        -
        <span>
          <v-icon color="red-accent-4" icon="mdi-ethernet"></v-icon>
        </span>
        <span>
          C. CABLEADO #{{ info_centro_cableado.numero }}
        </span>
        -
        <span>
          <v-icon color="red-accent-4" icon="mdi-desktop-tower"></v-icon>
        </span>
        <span>
          GABINETE R{{
          info_gabinete.numero }}
        </span>
        -
        <span>
          <v-icon color="red-accent-4" icon="mdi-devices"></v-icon>
        </span>
        <span>
          ELEMENTO {{ info_elemento.codigo }}
        </span>
      </h6>
    </div>
    <h4 class="text-success mb-5">
      <span><button class="btn btn-success" @click="volver()">&#8630; <v-tooltip activator="parent" location="top">Volver</v-tooltip></button></span>
      Información Del Mantenimiento {{ mantenimiento.codigo }}
    </h4>
    <div class="informacion">
      <div class="informacion-basica">

        <p><b>Realizado Por:</b> {{ mantenimiento.realizado_por }}</p>

        <p><b>Fecha:</b> {{ formatearFecha(mantenimiento.fecha) }}</p>

        <p>Observación: <br> {{ mantenimiento.observacion }}</p>

        <button class="btn btn-warning mr-2" data-toggle="modal" data-target="#modalActualizarMantenimiento"
          @click="verDatosModal()">Actualizar</button>
        <button v-if="usuario.rol_id === 1" class="btn btn-danger" data-toggle="modal"
          data-target="#modaleliminarMantenimiento">Eliminar</button>
      </div>

      <div class="informacion-secundario">
        <ArchivoTarjeta :archivos="archivos" :info_tabla="{ nombre_tabla: 'mantenimiento', id: mantenimiento.id }" />
      </div>
    </div>

    <!-- Modal Eliminar -->
    <div class="modal fade" id="modaleliminarMantenimiento" tabindex="-1" role="dialog"
      aria-labelledby="modaleliminarMantenimiento" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
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
        <div class="modal-content">
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
  </div>
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
  color: #212121;
  /* Color del ícono */
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

.numero {
  position: absolute;
  top: 5px;
  /* Mueve el número hacia la parte superior */
  left: 0px;
  /* Mueve el número hacia la izquierda */
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 50%;
  font-size: 20px;
  font-weight: 700;
}

@media (min-width: 768px) {

  .informacion-basica,
  .informacion-secundario {
    flex-basis: 50%;
    max-width: 50%;
  }
}
</style>