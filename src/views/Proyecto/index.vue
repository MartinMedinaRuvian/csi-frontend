<template>
  <div class="text-center">
    <h4 class="text-success mb-5">
      <span class="text-primary">
        <h6 v-if="rutaVolver !== 'centro-cableado'">{{ info_edificio.nombre }} - C. CABLEADO #{{
          info_centro_cableado.numero }} - GABINETE R{{
            info_gabinete.numero }} - ELEMENTO {{ info_elemento.codigo }}</h6>
        <h6 v-else>{{ info_edificio.nombre }} - C. CABLEADO #{{ info_centro_cableado.numero }}</h6>
      </span>
      <span><button data-placement="top" title="Volver" class="btn btn-success" @click="volver()">&#8630;</button></span>
      Información Del Proyecto
    </h4>
    <div class="informacion">
      <div class="informacion-basica">

        <h5 class="titulo mt-3 mb-5 text-primary">{{ proyecto.descripcion }}</h5>

        <h5>{{ proyecto.nombre_empresa }} <br> <b>NIT.</b> {{ proyecto.nit_empresa }}</h5>

        <p> <b>Código:</b> {{ proyecto.codigo }} <br> <b>Certificación:</b> {{ proyecto.certificacion != null &&
          proyecto.certificacion != undefined ? proyecto.certificacion : 'N/A' }}</p>

        <p><b>Fecha:</b> {{ formatearFecha(proyecto.fecha) }}</p>

        <button class="btn btn-warning mr-2" data-toggle="modal" data-target="#modalActualizarProyecto"
          @click="verDatosModal()">Actualizar</button>
        <button v-if="usuario.rol_id === 1" class="btn btn-danger" data-toggle="modal"
          data-target="#modaleliminarProyecto">Eliminar</button>
      </div>

      <div class="informacion-secundario">
        <ArchivoTarjeta :archivos="archivos" :info_tabla="{ nombre_tabla: 'proyecto', id: proyecto.id }" />
      </div>
    </div>

    <!-- Modal Eliminar -->
    <div class="modal fade" id="modaleliminarProyecto" tabindex="-1" role="dialog"
      aria-labelledby="modaleliminarProyecto" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Eliminar Proyecto
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-4">
                <h5>¿ Eliminar Proyecto con el Código: {{ proyecto.codigo }} ?</h5>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-danger form-control" value="Eliminar"
                    @click="eliminarProyecto()" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Actualizar -->
    <div class="modal fade" id="modalActualizarProyecto" tabindex="-1" role="dialog"
      aria-labelledby="modalActualizarProyecto" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Actualizar Proyecto
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form group">
                <label for="nombre" class="requerido">Código:</label>
                <input required type="text" placeholder="Ingrese el Código" v-model="proyecto_actualizar.codigo"
                  class="form-control" />
              </div>

              <div class="form group mt-3">
                <label for="nombre" class="requerido">Descripción:</label>
                <input required type="text" placeholder="Ingrese la descripción"
                  v-model="proyecto_actualizar.descripcion" class="form-control" />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo" class="requerido">Nombre de la Empresa:</label>
                  <input required type="text" placeholder="Ingrese el nombre Empresa"
                    v-model="proyecto_actualizar.nombre_empresa" class="form-control" />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo" class="requerido">NIT. De la Empresa:</label>
                  <input required type="text" placeholder="Ingrese el NIT" v-model="proyecto_actualizar.nit_empresa"
                    class="form-control" />
                </div>
              </div>


              <div class="form group mt-3">
                <label for="nombrecompleto" class="requerido">Fecha:</label>
                <input type="date" placeholder="Fecha" v-model="proyecto_actualizar.fecha" class="form-control" />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo" class="requerido">Certificación:</label>
                  <input required type="text" placeholder="Ingrese la certificación"
                    v-model="proyecto_actualizar.certificacion" class="form-control" />
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
                    @click="actualizarProyecto()" />
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
      proyecto: {},
      elementos: [],
      archivos: [],
      mensaje: { ver: false },
      proyecto_actualizar: {},
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
    this.proyecto = registroObjeto
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
        .post("proyecto", this.proyecto)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            //this.$router.push('/elementos')
            window.location.reload()
            $("#modalGuardarproyecto").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verArchivos() {
      const idproyecto = this.proyecto.id
      this.axios.get("archivo/proyecto/" + idproyecto).then((respuesta) => {
        if (respuesta.status === 200) {
          this.archivos = respuesta.data;
        }
      });
    },
    eliminarProyecto() {
      const id = this.proyecto.id
      const idRegistroTabla = this.idVolver
      const tabla = this.verNombreTabla(this.rutaVolver)
      this.axios
        .delete("proyecto/" + tabla + "/" + idRegistroTabla + "/" + id)
        .then((respuesta) => {
          if (respuesta.status == 200) {
            $("#modalEliminarProyecto").modal("hide");
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
    actualizarProyecto() {
      const proyecto = this.proyecto_actualizar
      const dato = {
        id: proyecto.id,
        codigo: proyecto.codigo,
        descripcion: proyecto.descripcion,
        nombre_empresa: proyecto.nombre_empresa,
        nit_empresa: proyecto.nit_empresa,
        fecha: proyecto.fecha,
        certificacion: proyecto.certificacion
      }
      this.axios
        .put("proyecto", dato)
        .then((respuesta) => {
          window.location.reload()
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verInfo(id) {
      this.axios.get("/proyecto/" + id).then((respuesta) => {
        if (respuesta.status === 200) {
          this.proyecto = respuesta.data;
          console.log(this.proyecto, 'proyectooo')
        }
      });
    },
    verDatosModal() {
      const dato = this.proyecto
      this.proyecto_actualizar = { ...dato };
      this.proyecto_actualizar.fecha = this.formatearFecha(this.proyecto_actualizar.fecha)
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