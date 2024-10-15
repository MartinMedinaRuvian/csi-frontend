<template>
  <div class="text-center">
    <h4 class="text-success mb-5"><span><button class="btn btn-success" @click="volver()">&#8630;</button></span>
      Información Gabinete</h4>
    <div class="informacion">
      <div class="informacion-basica">
        <h5 class="titulo">{{ gabinete.nombre }}</h5>
        <div class="contenedor-imagen">
          <div class="imagen-wrapper">
            <img id="imagen" :src="rutaImagenVer(gabinete.ruta_imagen)" alt="">
            <div class="numero"># {{ gabinete.numero }}</div>
            <span class="icono-actualizar" data-toggle="modal" data-target="#modalActualizarImagen">
              &#x1F504;
            </span>
          </div>
          <h6 class="mt-3"><b>{{ gabinete.tipo }}</b></h6>
          <div class="form-group mt-3 observacion">
            <label for="codigo">Observación:</label>
            <textarea
              v-if="gabinete.observacion != null && gabinete.observacion != undefined && gabinete.observacion.length > 0"
              disabled type="text" placeholder="Observación" v-model="gabinete.observacion"
              class="form-control textarea-center" />
            <h6 v-else>Sin Observación</h6>
          </div>

        </div>

        <button class="btn btn-warning mr-2" data-toggle="modal" data-target="#modalActualizarGabinete"
          @click="verDatosModal()">Actualizar</button>
        <button v-if="usuario.rol_id === 1" class="btn btn-danger" data-toggle="modal" data-target="#modaleliminarCentroCableado">Eliminar</button>
      </div>

      <div class="informacion-secundario">
        <ArchivoTarjeta :archivos="archivos"
          :info_tabla="{ nombre_tabla: 'gabinete', id: gabinete.id }" />
      </div>
    </div>

    <div class="text-center mt-5">
      <p :class="gabinete.aterrizado === 'S' ? 'text-success' : 'text-warning'">{{ gabinete.aterrizado
        === 'S' ? 'Aterrizado &#9889;' : 'No esta aterrizado' }}</p>
    </div>

    <button class="btn btn-success mt-5" data-toggle="collapse" data-target="#collapseElementoTarjeta"
      aria-expanded="false" aria-controls="collapseElementoTarjeta">
      Elementos
    </button>
    <div class="collapse contenedor-tarjeta" id="collapseElementoTarjeta">
      <ElementoTarjeta :elementos="elementos" :id_gabinete="gabinete.id" />
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
                    <input type="file" class="form-control" name="archivo_gabinete" id="archivo_gabinete"
                      @change="verImagen(gabinete.ruta_imagen)" accept="image/*"
                      ref="inputArchivogabinete" required>
                  </div>
                  <div class="col-md-12 col-lg-12 mt-3">
                    <img class="imagen-previsualizacion" alt="imagen" id="imagenPrevisualizaciongabinete"
                      ref="imagenPrevisualizaciongabinete"
                      :src="rutaImagenVer(gabinete.ruta_imagen)">
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
              Eliminar Gabinete
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-4">
                <h5>¿ Eliminar Gabinete: #{{ gabinete.numero }} ?</h5>
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
    <div class="modal fade" id="modalActualizarGabinete" tabindex="-1" role="dialog"
      aria-labelledby="modalActualizarGabinete" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
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
                  <option v-for="opcion in opcionesRespuesta" :value="opcion.valor" :key="opcion.valor" class="text-success">
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
  </div>
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
      archivos: [],
      mensaje: { ver: false },
      ruta_servidor: this.axios.defaults.baseURL,
      tiposCentroCableado: ['EN OFICINA', 'INDEPENDIENTE'],
      opcionesRespuesta: [{ descripcion: 'SI', valor: 'S' }, { descripcion: 'NO', valor: 'N' }],
      gabinete_actualizar: {}
    };
  },
  mounted() {
    const registroString = this.$route.query.registro;
    const registroObjeto = JSON.parse(registroString);
    this.gabinete = registroObjeto;
    this.verInfo()
    this.verelementos()
    this.verArchivos()
    this.verTiposGabinetes()
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
    verelementos() {
      const id = this.gabinete.id
      this.axios.get("gabinete/" + id).then((respuesta) => {
        if (respuesta.status === 200) {
          this.elementos = respuesta.data;
          console.log(this.elementos, 'elementos')
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
    eliminarCentroCableado() {
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
        id
      }
      location.href = "/centro-cableado?registro=" + JSON.stringify(datosRegistro)
    },
    verTipoGabinetePorId(){
      const idTipoGabinete = this.gabinete.id_tipo_gabinete
      this.axios.get("tipo_gabinete/" + idTipoGabinete)
      .then((respuesta)=>{
        this.gabinete.tipo = respuesta.data.descripcion
      })
      .catch(error => console.log(error))
    },
    verTiposGabinetes(){
      this.axios.get("tipo_gabinete")
      .then((respuesta)=>{
        this.tiposGabinetes = respuesta.data
      })
      .catch(error => console.log(error))
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