<template>
  <div class="text-center">
    <h4 class="text-success mb-5">
      <span class="text-primary"><h6>{{ info_edificio.nombre }}</h6></span>
      <span><button class="btn btn-success" @click="volver()">&#8630;</button></span>
      Información Centro de Cableado</h4>
    <div class="informacion">
      <div class="informacion-basica">
        <h5 class="titulo">{{ centro_cableado.nombre }}</h5>
        <div class="contenedor-imagen">
          <div class="imagen-wrapper">
            <img id="imagen" :src="rutaImagenVer(centro_cableado.ruta_imagen)" alt="">
            <div class="numero"># {{ centro_cableado.numero }}</div>
            <span class="icono-actualizar" data-toggle="modal" data-target="#modalActualizarImagen">
              &#x1F504;
            </span>
          </div>
          <h6 class="mt-3"><b>{{ centro_cableado.ubicacion }} - {{ centro_cableado.tipo }}</b></h6>
          <div class="form-group mt-3 observacion">
            <label for="codigo">Observación:</label>
            <textarea
              v-if="centro_cableado.observacion != null && centro_cableado.observacion != undefined && centro_cableado.observacion.length > 0"
              disabled type="text" placeholder="Observación" v-model="centro_cableado.observacion"
              class="form-control textarea-center" />
            <h6 v-else>Sin Observación</h6>
          </div>

        </div>

        <button class="btn btn-warning mr-2" data-toggle="modal" data-target="#modalactualizarCentroCableado"
          @click="verDatosModal()">Actualizar</button>
        <button v-if="usuario.rol_id === 1" class="btn btn-danger" data-toggle="modal"
          data-target="#modaleliminarCentroCableado">Eliminar</button>
      </div>

      <div class="informacion-secundario">
        <ArchivoTarjeta :archivos="archivos"
          :info_tabla="{ nombre_tabla: 'centro_cableado', id: centro_cableado.id }" />
        <ProyectoTarjeta :proyectos="proyectos"
          :info_tabla="{ nombre_tabla: 'centro_cableado', id: centro_cableado.id }" :info_edificio="info_edificio" :info_centro_cableado="info_centro_cableado" />
      </div>
    </div>

    <div class="text-center mt-5">
      <p :class="centro_cableado.climatizado === 'S' ? 'text-success' : 'text-warning'">{{ centro_cableado.climatizado
        === 'S' ? 'Climatizado &#10052;' : 'No esta climatizado' }}</p>
      <p :class="centro_cableado.camaras === 'S' ? 'text-success' : 'text-warning'">{{ centro_cableado.camaras === 'S'
        ? 'Con cámaras &#128247;' : 'No tiene cámaras' }}</p>

      <p :class="centro_cableado.acceso_llaves === 'S' ? 'text-dark' : 'text-warning'">{{
        centro_cableado.acceso_llaves === 'S' ? 'Acceso con llaves &#128273;' : 'Sin acceso con llaves' }}</p>
      <p>{{ centro_cableado.acceso_biometrico === 'S' ? 'Acceso biométrico &#128070;' : 'Sin acceso biométrico' }}</p>
    </div>

    <button class="btn btn-success mt-5" data-toggle="collapse" data-target="#collapseGabineteTarjeta"
      aria-expanded="false" aria-controls="collapseGabineteTarjeta">
      Gabinetes - RAWs
    </button>
    <div class="collapse contenedor-tarjeta" id="collapseGabineteTarjeta">
      <GabineteTarjeta :gabinetes="gabinetes" :info_centro_cableado="info_centro_cableado"
        :info_edificio="info_edificio" />
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
        <div class="modal-content">
          <div class="modal-header bg-success">
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
        <div class="modal-content">
          <div class="modal-header bg-success">
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
                <label for="nombre" class="requerido">Número:</label>
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
  </div>
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
      info_centro_cableado: {}
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
    this.verProyectos()
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
    verProyectos() {
      const id = this.centro_cableado.id
      this.axios.get("proyecto/centro_cableado/" + id).then((respuesta) => {
        if (respuesta.status === 200) {
          this.proyectos = respuesta.data;
        }
      });
    },
    actualizarImagen() {
      const nombreTabla = 'centro_cableado'
      const id = this.centro_cableado.id
      var formData = new FormData();
      var imagefile = document.querySelector("#archivo_centro_cableado");
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