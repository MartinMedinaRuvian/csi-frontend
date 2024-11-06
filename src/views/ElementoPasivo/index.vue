<template>
  <div class="text-center">
    <h4 class="text-success mb-5"><span><button class="btn btn-success" @click="volver()">&#8630;</button></span>
      Información del Elemento Pasivo</h4>
    <div class="informacion">
      <div class="informacion-basica">
        <div class="contenedor-imagen">
          <div class="imagen-wrapper">
            <img id="imagen" :src="rutaImagenVer(elemento.ruta_imagen)" alt="">
            <span class="icono-actualizar" data-toggle="modal" data-target="#modalActualizarImagen">
              &#x1F504;
            </span>
          </div>
          <h6 class="mt-3"><b>{{ elemento.tipo_dispositivo }}</b></h6>
          <h6 class="mt-3"><b>{{ elemento.codigo }}</b></h6>
          <div class="form-group mt-3 observacion">
            <label for="codigo">Observación:</label>
            <textarea
              v-if="elemento.observacion != null && elemento.observacion != undefined && elemento.observacion.length > 0"
              disabled type="text" placeholder="Observación" v-model="elemento.observacion"
              class="form-control textarea-center" />
            <h6 v-else>Sin Observación</h6>
          </div>

        </div>

        <button class="btn btn-warning mr-2"
          @click="actualizarElemento()">Actualizar</button>
        <button v-if="usuario.rol_id === 1" class="btn btn-danger" data-toggle="modal"
          data-target="#modaleliminarElemento">Eliminar</button>
      </div>

      <div class="informacion-secundario">
        <ArchivoTarjeta :archivos="archivos" :info_tabla="{ nombre_tabla: 'elemento_pasivo', id: elemento.id }" />
        <ProyectoTarjeta :proyectos="proyectos" :info_tabla="{ nombre_tabla: 'elemento_pasivo', id: elemento.id}" />
      </div>
    </div>
    <div class="propiedades-elemento mb-5">
      <span v-if="propiedadTieneValor(elemento.codigo_inventario)"><b>Código de inventario:</b> {{
        elemento.codigo_inventario }}
        <br>
      </span>
      <span v-if="propiedadTieneValor(elemento.categoria)"><b>Categoría:</b> {{ elemento.categoria }} <br> </span>
      <span v-if="propiedadTieneValor(elemento.numero_puertos)"><b># de Puertos:</b> {{ elemento.numero_puertos }}
        <br></span>
      <span v-if="propiedadTieneValor(elemento.tipo_conector)"><b>Tipo Conector:</b> {{ elemento.tipo_conector
        }}<br></span>
    </div>

    <button class="btn btn-success" data-toggle="collapse" data-target="#collapseMantenimientoTarjeta" aria-expanded="false"
      aria-controls="collapseMantenimientoTarjeta">
      Mantenimientos
    </button>

    <div class="collapse" id="collapseMantenimientoTarjeta">
      <MantenimientoTarjeta :mantenimientos="mantenimientos" :info_tabla="{ nombre_tabla: 'elemento_pasivo', id: elemento.id}" />
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
                    <input type="file" class="form-control" name="archivo_elemento" id="archivo_elemento"
                      @change="verImagen(elemento.ruta_imagen)" accept="image/*" ref="inputArchivoelemento" required>
                  </div>
                  <div class="col-md-12 col-lg-12 mt-3">
                    <img class="imagen-previsualizacion" alt="imagen" id="imagenPrevisualizacionelemento"
                      ref="imagenPrevisualizacionelemento" :src="rutaImagenVer(elemento.ruta_imagen)">
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
    <div class="modal fade" id="modaleliminarElemento" tabindex="-1" role="dialog"
      aria-labelledby="modaleliminarElemento" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Eliminar elemento
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-4">
                <h5>¿ Eliminar elemento: {{ elemento.codigo }} ?</h5>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-danger form-control" value="Eliminar"
                    @click="eliminarElemento()" />
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
import ElementoTarjeta from "@/components/elementos/ElementoTarjeta";
import ArchivoTarjeta from "@/components/archivos/ArchivoTarjeta";
import { mapGetters } from "vuex";
import Mensaje from "@/components/Mensaje.vue";
import ProyectoTarjeta from "@/components/proyectos/ProyectoTarjeta.vue";
import MantenimientoTarjeta from "@/components/mantenimiento/MantenimientoTarjeta.vue";
export default {
  components: { Mensaje, ElementoTarjeta, ArchivoTarjeta, ProyectoTarjeta, MantenimientoTarjeta },
  data() {
    return {
      elemento: {},
      elementos: [],
      archivos: [],
      proyectos: [],
      mantenimientos: [],
      mensaje: { ver: false },
      ruta_servidor: this.axios.defaults.baseURL,
      tiposElemento: ['EN OFICINA', 'INDEPENDIENTE'],
      opcionesRespuesta: [{ descripcion: 'SI', valor: 'S' }, { descripcion: 'NO', valor: 'N' }],
      elemento_actualizar: {},
      tiposdispositivo: [],
      urlSinImagenActivo: this.axios.defaults.baseURL + '/archivos/elemento_activo_default.svg',
      urlSinImagenPasivo: this.axios.defaults.baseURL + '/archivos/elemento_pasivo_default.svg',
    };
  },
  mounted() {
    const registroString = this.$route.query.registro;
    const registroObjeto = JSON.parse(registroString);
    this.elemento = registroObjeto;
    this.verInfo()
    this.verArchivos()
    this.verProyectos()
    this.verMantenimientos()
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
    verArchivos() {
      const idelemento = this.elemento.id
      this.axios.get("archivo/elemento_pasivo/" + idelemento).then((respuesta) => {
        if (respuesta.status === 200) {
          this.archivos = respuesta.data;
        }
      });
    },
    verProyectos() {
      const idelemento = this.elemento.id
      this.axios.get("proyecto/elemento_pasivo/" + idelemento).then((respuesta) => {
        if (respuesta.status === 200) {
          this.proyectos = respuesta.data;
          console.log(this.proyectos)
        }
      });
    },
    verMantenimientos() {
      const idelemento = this.elemento.id
      this.axios.get("mantenimiento/elemento_pasivo/" + idelemento).then((respuesta) => {
        if (respuesta.status === 200) {
          this.mantenimientos = respuesta.data;
        }
      });
    },
    actualizarImagen() {
      const nombreTabla = 'elemento_pasivo'
      const id = this.elemento.id
      var formData = new FormData();
      var imagefile = document.querySelector("#archivo_elemento");
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
      const archivos = this.$refs.inputArchivoelemento.files;
      console.log(archivos)

      if ((archivos != null && archivos != undefined) && archivos.length > 0) {
        const primerArchivo = archivos[0];
        const objectURL = URL.createObjectURL(primerArchivo);
        this.$refs.imagenPrevisualizacionelemento.src = objectURL;
      } else {
        this.$refs.imagenPrevisualizacionelemento.src = urlImagenActual;
      }
    },
    eliminarElemento() {
      const id = this.elemento.id
      this.axios
        .delete("elemento_pasivo/" + id)
        .then((respuesta) => {
          if (respuesta.status == 200) {
            $("#modalEliminarElemento").modal("hide");
            this.volver()
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    actualizarElemento(){
      let elemento = this.elemento
      const idGabinete = this.elemento.id_gabinete
      const datosRegistro = {
        ...elemento,
        id_gabinete: idGabinete
      }
      location.href = "/actualizar-elemento-pasivo?registro=" + JSON.stringify(datosRegistro)
    },
    rutaImagenVer(ruta_imagen) {
      const ruta = ruta_imagen != null && ruta_imagen != undefined ? ruta_imagen : 'archivos/elemento_pasivo_default.svg'
      return this.ruta_servidor + '/' + ruta
    },
    verDatosModal() {
      const dato = this.elemento
      this.elemento_actualizar = { ...dato };
    },
    volver() {
      const id = this.elemento.id_gabinete
      const datosRegistro = {
        id
      }
      location.href = "/gabinete?registro=" + JSON.stringify(datosRegistro)
    },
    verInfo() {
      const id = this.elemento.id
      this.axios.get("elemento_pasivo/info/" + id).then((respuesta) => {
        if (respuesta.status === 200) {
          this.elemento = respuesta.data;
        }
      });
    },
    propiedadTieneValor(propiedad) {
      return propiedad !== null && propiedad !== undefined && propiedad != ''
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