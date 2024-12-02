<template>
  <v-app>
    <v-row>
      <v-col cols="2">
        <v-navigation-drawer permanent expand-on-hover :rail="ocultarExpandido" app class="drawer-style">
          <v-list>
            <p v-if="!ocultarExpandido" class="text-center text-danger"><b>Nuevo Elemento</b>
            </p>
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
                <v-icon color="grey-darken-4" icon="mdi-ethernet"></v-icon>
              </span>
              <span>
                C. CABLEADO #{{ info_centro_cableado.numero }}
              </span>
              -
              <span>
                <v-icon color="grey-darken-4" icon="mdi-desktop-tower"></v-icon>
              </span>
              <span>
                GABINETE R{{
                  info_gabinete.numero }}
              </span>
            </h6>
          </div>

          <v-row class="container-principal_informacion">
            <div class="mx-auto d-flex justify-content-center">
              <div class="card">
                <div class="card-header text-center">
                  <h5 class="text-danger">Nuevo Elemento</h5>
                </div>
                <div class="card-body">
                  <form @submit.prevent>

                    <div class="row">
                      <div class="col">
                        <div class="form-group mt-3">
                          <label for="tipo" class="requerido">Tipo:</label>
                          <select id="tipo" class="form-select form-control" v-model="tipo_elemento">
                            <option v-for="tipo in tiposelementos" :value="tipo" :key="tipo" class="text-success">
                              {{ tipo }}
                            </option>
                          </select>
                        </div>

                        <span v-if="tipo_elemento == 'ACTIVO'"
                          @click="agregarNuevoTipo('tipo_dispositivo_activo', 'Nuevo Dispositivo')"
                          class="boton-nuevo_elemento" data-toggle="modal" data-target="#modalNuevoTipo">Nuevo
                          Dispositivo</span>
                        <v-autocomplete v-if="tipo_elemento == 'ACTIVO'" label="Dispositivo" class="requerido"
                          v-model="elemento.id_tipo_dispositivo_activo" :items="tiposdispositivoactivo"
                          :item-title="titulosAutocompleteTipos" item-value="id" :filter="filterAutocompleteTipos">
                        </v-autocomplete>

                        <span v-if="tipo_elemento == 'PASIVO'"
                          @click="agregarNuevoTipo('tipo_dispositivo_pasivo', 'Nuevo Dispositivo')"
                          class="boton-nuevo_elemento" data-toggle="modal" data-target="#modalNuevoTipo">Nuevo
                          Dispositivo</span>
                        <v-autocomplete v-if="tipo_elemento == 'PASIVO'" label="Dispositivo" class="requerido"
                          v-model="elemento.id_tipo_dispositivo_pasivo" :items="tiposdispositivopasivo"
                          :item-title="titulosAutocompleteTipos" item-value="id" :filter="filterAutocompleteTipos">
                        </v-autocomplete>

                        <span v-if="tipo_elemento == 'ACTIVO'"
                          @click="agregarNuevoTipo('tipo_referencia', 'Nueva Referencia')" class="boton-nuevo_elemento"
                          data-toggle="modal" data-target="#modalNuevoTipo">Nueva Referencia</span>
                        <v-autocomplete v-if="tipo_elemento == 'ACTIVO'" label="Referencia" class="requerido"
                          v-model="elemento.id_tipo_referencia" :items="tiposreferencias"
                          :item-title="titulosAutocompleteTipos" item-value="id" :filter="filterAutocompleteTipos">
                        </v-autocomplete>

                        <span v-if="tipo_elemento == 'ACTIVO'" @click="agregarNuevoTipo('tipo_modelo', 'Nuevo Modelo')"
                          class="boton-nuevo_elemento" data-toggle="modal" data-target="#modalNuevoTipo">Nuevo
                          Modelo</span>
                        <v-autocomplete v-if="tipo_elemento == 'ACTIVO'" label="Modelo" class="requerido"
                          v-model="elemento.id_tipo_modelo" :items="tiposmodelos" :item-title="titulosAutocompleteTipos"
                          item-value="id" :filter="filterAutocompleteTipos">
                        </v-autocomplete>

                        <span v-if="tipo_elemento == 'ACTIVO'" @click="agregarNuevoTipo('tipo_marca', 'Nueva Marca')"
                          class="boton-nuevo_elemento" data-toggle="modal" data-target="#modalNuevoTipo">Nueva
                          Marca</span>
                        <v-autocomplete v-if="tipo_elemento == 'ACTIVO'" label="Marca" class="requerido"
                          v-model="elemento.id_tipo_marca" :items="tiposmarcas" :item-title="titulosAutocompleteTipos"
                          item-value="id" :filter="filterAutocompleteTipos">
                        </v-autocomplete>

                      </div>

                      <div class="col">

                        <div class="form group mt-3">
                          <div class="form-group">
                            <label for="codigo" class="requerido">Código:</label>
                            <input required type="text" placeholder="Ingrese Código" v-model="elemento.codigo"
                              class="form-control" />
                          </div>
                        </div>

                        <div class="form group mt-3" v-if="tipo_elemento == 'ACTIVO'">
                          <div class="form-group">
                            <label for="codigo" class="requerido">Serial:</label>
                            <input required type="text" placeholder="Ingrese Serial" v-model="elemento.serial"
                              class="form-control" />
                          </div>
                        </div>

                        <div class="form-group" v-if="tipo_elemento == 'ACTIVO'">
                          <div class="form group mt-3">
                            <label for="codigo">Código Inventario:</label>
                            <input required type="text" placeholder="" v-model="elemento.codigo_inventario"
                              class="form-control" />
                          </div>
                        </div>

                        <div class="form-group mt-4 text-center">
                          <h5>Imagen:</h5>
                          <div class="row">
                            <div class="col-md-12 col-lg-12">
                              <input type="file" class="form-control" name="archivo_elemento" id="archivo_elemento"
                                @change="verImagen()" accept="image/*" ref="inputArchivoelemento" required>
                            </div>
                            <div class="col-md-12 col-lg-12 mt-3">
                              <img class="imagen-previsualizacion" alt="imagen"
                                id="imagenPrevisualizacionCentroCableado" ref="imagenPrevisualizacionCentroCableado"
                                :src="tipo_elemento == 'ACTIVO' ? urlSinImagenActivo : urlSinImagenPasivo">
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>


                    <div class="row">
                      <div class="col-md-6 mt-3">
                        <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                          @click="volver()">
                          Cancelar
                        </button>
                      </div>
                      <div class="col-md-6 mt-3">
                        <input type="button" class="btn btn-success form-control" value="Guardar"
                          @click="guardarNuevoelemento()" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </v-row>

        </div>
      </v-col>
    </v-row>
    <!-- Modal Nuevo Tipo -->
    <div class="modal fade" id="modalNuevoTipo" tabindex="-1" role="dialog" aria-labelledby="modalNuevoTipo"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Nuevo Tipo
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <TipoGuardar @refrescar="refrescarTipos()" :titulo="tituloTipo" :tabla="tablaTipo" />
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import TipoGuardar from "@/components/tipo/TipoGuardar.vue";
import { mapGetters } from "vuex";
export default {
  components: { TipoGuardar },
  data() {
    return {
      elemento: { id_tipo_dispositivo_activo: 1, id_tipo_dispositivo_pasivo: 1, id_tipo_referencia: 1, id_tipo_modelo: 1, id_tipo_marca: 1 },
      tiposelementos: ['ACTIVO', 'PASIVO'],
      tipo_elemento: 'ACTIVO',
      ruta_servidor: this.axios.defaults.baseURL,
      urlSinImagenActivo: this.axios.defaults.baseURL + '/archivos/elemento_activo_default.svg',
      urlSinImagenPasivo: this.axios.defaults.baseURL + '/archivos/elemento_pasivo_default.svg',
      urlImg: '',
      tiposreferencias: [],
      tiposmodelos: [],
      tiposmarcas: [],
      tiposdispositivoactivo: [],
      tiposdispositivopasivo: [],
      id_gabinete: 0,
      tablaTipo: 'tipo_referencia',
      tituloTipo: 'Nueva Referencia',
      info_edificio: {},
      info_centro_cableado: {},
      info_gabinete: {}
    }
  },
  mounted() {
    const registroString = this.$route.query.registro;
    const registroObjeto = JSON.parse(registroString);
    this.id_gabinete = registroObjeto.id;
    this.info_edificio = registroObjeto.info_edificio
    this.info_centro_cableado = registroObjeto.info_centro_cableado
    this.info_gabinete = registroObjeto.info_gabinete
  },
  created() {
    this.verTiposDispositivosActivos()
    this.verTiposDispositivosPasivos()
    this.verTiposReferencias()
    this.verTiposModelos()
    this.verTiposMarcas()
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    refrescarTipos() {
      const tablaTipo = this.tablaTipo
      switch (tablaTipo) {
        case 'tipo_dispositivo_activo':
          this.verTiposDispositivosActivos()
          break
        case 'tipo_dispositivo_pasivo':
          this.verTiposDispositivosPasivos()
          break
        case 'tipo_referencia':
          this.verTiposReferencias()
          break
        case 'tipo_modelo':
          this.verTiposModelos()
          break
        case 'tipo_marca':
          this.verTiposMarcas()
          break
        default:
          this.verTiposReferencias()
          break
      }
      $("#modalNuevoTipo").modal("hide");
    },
    titulosAutocompleteTipos(item) {
      return `${item.descripcion}`;
    },
    filterAutocompleteTipos(item, queryText, itemText) {
      return (
        item.descripcion
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1
      );
    },
    verImagen() {
      const archivos = this.$refs.inputArchivoelemento.files;
      console.log(archivos)

      if ((archivos != null && archivos != undefined) && archivos.length > 0) {
        const primerArchivo = archivos[0];
        const objectURL = URL.createObjectURL(primerArchivo);
        this.$refs.imagenPrevisualizacionCentroCableado.src = objectURL;
      } else {
        if (this.tipo_elemento == 'ACTIVO') {
          this.$refs.imagenPrevisualizacionCentroCableado.src = this.urlSinImagenActivo;
        } else {
          this.$refs.imagenPrevisualizacionCentroCableado.src = this.urlSinImagenPasivo;
        }
      }
    },
    async guardarNuevoelemento() {
      const tipoElementoGuardar = this.tipo_elemento
      if (tipoElementoGuardar == 'ACTIVO') {
        await this.guardarNuevoelementoActivo()
      } else {
        await this.guardarNuevoelementoPasivo()
      }
    },
    guardarNuevoelementoActivo() {
      const registroGuardar = this.elemento
      const registro = {
        id_tipo_dispositivo_activo: registroGuardar.id_tipo_dispositivo_activo,
        id_tipo_referencia: registroGuardar.id_tipo_referencia,
        id_tipo_modelo: registroGuardar.id_tipo_modelo,
        id_tipo_marca: registroGuardar.id_tipo_marca,
        codigo: registroGuardar.codigo,
        serial: registroGuardar.serial,
        codigo_inventario: registroGuardar.codigo_inventario,
        id_gabinete: this.id_gabinete,
        id_usuario: this.usuario.id
      }
      const nombreTabla = "elemento_activo"
      console.log(registro, 'registro')
      this.axios.post(nombreTabla, registro).then((respuesta) => {
        if (respuesta.status === 200) {
          const idGuardado = respuesta.data.id
          this.actualizarImagen(nombreTabla, idGuardado)
          this.volver()
        }
      }).catch(error => console.log(error))
    },
    guardarNuevoelementoPasivo() {
      const registroGuardar = this.elemento
      const registro = {
        id_tipo_dispositivo_pasivo: registroGuardar.id_tipo_dispositivo_pasivo,
        codigo: registroGuardar.codigo,
        id_gabinete: this.id_gabinete,
        id_usuario: this.usuario.id
      }
      const nombreTabla = "elemento_pasivo"
      console.log(registro, 'registro')
      this.axios.post(nombreTabla, registro).then((respuesta) => {
        if (respuesta.status === 200) {
          const idGuardado = respuesta.data.id
          this.actualizarImagen(nombreTabla, idGuardado)
          this.volver()
        }
      }).catch(error => console.log(error))
    },
    actualizarImagen(nombreTabla, id) {
      console.log(nombreTabla, id)
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
          console.log(respuesta);
        });
    },
    rutaImagenVer(ruta_imagen) {
      const ruta = ruta_imagen != null && ruta_imagen != undefined ? ruta_imagen : 'archivos/elemento_default.svg'
      return this.ruta_servidor + '/' + ruta
    },
    verTiposReferencias() {
      this.axios.get("tipo/tipo_referencia")
        .then((respuesta) => {
          this.tiposreferencias = respuesta.data
        })
        .catch(error => console.log(error))
    },
    verTiposModelos() {
      this.axios.get("tipo/tipo_modelo")
        .then((respuesta) => {
          this.tiposmodelos = respuesta.data
        })
        .catch(error => console.log(error))
    },
    verTiposMarcas() {
      this.axios.get("tipo/tipo_marca")
        .then((respuesta) => {
          this.tiposmarcas = respuesta.data
        })
        .catch(error => console.log(error))
    },
    verTiposDispositivosActivos() {
      this.axios.get("tipo/tipo_dispositivo_activo")
        .then((respuesta) => {
          this.tiposdispositivoactivo = respuesta.data
        })
        .catch(error => console.log(error))
    },
    verTiposDispositivosPasivos() {
      this.axios.get("tipo/tipo_dispositivo_pasivo")
        .then((respuesta) => {
          this.tiposdispositivopasivo = respuesta.data
        })
        .catch(error => console.log(error))
    },
    volver() {
      const id = this.id_gabinete
      const datosRegistro = {
        id,
        info_edificio: this.info_edificio,
        info_centro_cableado: this.info_centro_cableado
      }
      location.href = "/gabinete?registro=" + JSON.stringify(datosRegistro)
    },
    agregarNuevoTipo(tabla, titulo) {
      this.tablaTipo = tabla
      this.tituloTipo = titulo
    },
  },
}
</script>
<style scoped>
.card {
  margin-left: 200px;
  margin-right: 200px;
}

#imagenPrevisualizacion {
  width: 100px;
  height: 100px;
}

#imagenInfo {
  width: 150px;
  height: 150px;
}

.requerido::before {
  content: "* ";
  /* Agrega el asterisco */
  color: red;
  /* Asterisco de color rojo */
  font-weight: bold;
  /* Opcional, para darle más énfasis */
}

.texto-pequenio {
  font-size: 13px;
}

.imagen-previsualizacion {
  width: 120px;
  height: 120px;
}

.propiedades span {
  font-size: 20px;
}

.columna-elementos_activos {
  padding: 20px;
  border: solid #28a745 1.5px;
  border-radius: 15px;
}

.columna-elementos_pasivos {
  padding: 20px;
  border: solid #039BE5 1px;
  border-radius: 15px;
}

.boton-nuevo_elemento {
  padding: 5px;
  background-color: #28a745;
  border-radius: 5px;
  color: #fff;
  font-size: 12px;
}

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
  padding: 10px;
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

.botones-paginacion {
  font-size: 15px;
  color: #fff;
  background-color: #00B0FF;
  border: solid #00B0FF;
}

.botones-paginacion-outline {
  font-size: 15px;
  color: #00B0FF;
  background-color: #fff;
  border: solid 1px #00B0FF;
}

.input-password,
.input-buscar {
  display: flex;
  align-content: center;
  align-items: center;
}
</style>