<template>
  <v-app>
    <v-row>
      <v-col cols="2">
        <v-navigation-drawer permanent expand-on-hover :rail="ocultarExpandido" app class="drawer-style">
          <v-list>
            <p v-if="!ocultarExpandido" class="text-center text-danger"><b>Actualizar Elemento</b>
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
                <div class="card-header">
                  <h5 class="text-center text-danger" id="exampleModalLongTitle">
                    Actualizar Elemento Activo
                  </h5>
                </div>
                <div class="card-body">
                  <form @submit.prevent>

                    <div class="row">
                      <div class="col-md-6">

                        <span @click="agregarNuevoTipo('tipo_dispositivo_activo', 'Nuevo Dispositivo')"
                          class="boton-nuevo_elemento" data-toggle="modal" data-target="#modalNuevoTipo">Nuevo
                          Dispositivo</span>
                        <v-autocomplete label="Dispositivo" class="requerido"
                          v-model="elemento_actualizar.id_tipo_dispositivo_activo" :items="tiposdispositivoactivo"
                          :item-title="titulosAutocompleteTipos" item-value="id" :filter="filterAutocompleteTipos">
                        </v-autocomplete>

                        <span @click="agregarNuevoTipo('tipo_referencia', 'Nueva Referencia')"
                          class="boton-nuevo_elemento" data-toggle="modal" data-target="#modalNuevoTipo">Nueva
                          Referencia</span>
                        <v-autocomplete label="Referencia" class="requerido"
                          v-model="elemento_actualizar.id_tipo_referencia" :items="tiposreferencias"
                          :item-title="titulosAutocompleteTipos" item-value="id"
                          :filter="filterAutocompleteTipos"></v-autocomplete>


                        <span @click="agregarNuevoTipo('tipo_modelo', 'Nuevo Modelo')" class="boton-nuevo_elemento"
                          data-toggle="modal" data-target="#modalNuevoTipo">Nuevo Modelo</span>
                        <v-autocomplete label="Modelo" class="requerido" v-model="elemento_actualizar.id_tipo_modelo"
                          :items="tiposmodelos" :item-title="titulosAutocompleteTipos" item-value="id"
                          :filter="filterAutocompleteTipos"></v-autocomplete>

                        <span @click="agregarNuevoTipo('tipo_marca', 'Nueva Marca')" class="boton-nuevo_elemento"
                          data-toggle="modal" data-target="#modalNuevoTipo">Nueva Marca</span>
                        <v-autocomplete label="Marca" class="requerido" v-model="elemento_actualizar.id_tipo_marca"
                          :items="tiposmarcas" :item-title="titulosAutocompleteTipos" item-value="id"
                          :filter="filterAutocompleteTipos"></v-autocomplete>

                        <div class="form group mt-3">
                          <div class="form-group">
                            <label for="codigo" class="requerido">Código:</label>
                            <input required type="text" placeholder="Ingrese Código"
                              v-model="elemento_actualizar.codigo" class="form-control" />
                          </div>
                        </div>

                        <div class="form group mt-3">
                          <div class="form-group">
                            <label for="codigo" class="requerido">Serial:</label>
                            <input required type="text" placeholder="Ingrese Serial"
                              v-model="elemento_actualizar.serial" class="form-control" />
                          </div>
                        </div>

                        <div class="form-group">
                          <div class="form group mt-3">
                            <label for="codigo">Código Inventario:</label>
                            <input required type="text" placeholder="" v-model="elemento_actualizar.codigo_inventario"
                              class="form-control" />
                          </div>
                        </div>


                        <div class="form group mt-3">
                          <div class="form-group">
                            <label for="codigo">Gateway:</label>
                            <input required type="text" placeholder="" v-model="elemento_actualizar.gateway"
                              class="form-control" />
                          </div>
                        </div>


                      </div>

                      <div class="col-md-6">

                        <div class="form group mt-3">
                          <div class="form-group">
                            <label for="codigo">MAC:</label>
                            <input required type="text" placeholder="" v-model="elemento_actualizar.mac"
                              class="form-control" />
                          </div>
                        </div>

                        <div class="form group mt-3">
                          <div class="form-group">
                            <label for="codigo">S.O:</label>
                            <input required type="text" placeholder="" v-model="elemento_actualizar.os"
                              class="form-control" />
                          </div>
                        </div>
                        <div class="form group mt-3">
                          <div class="form-group">
                            <label for="codigo">Versión S.O:</label>
                            <input required type="text" placeholder="" v-model="elemento_actualizar.version_os"
                              class="form-control" />
                          </div>
                        </div>
                        <div class="form group mt-3">
                          <div class="form-group">
                            <label for="codigo">IP V4:</label>
                            <input required type="text" placeholder="" v-model="elemento_actualizar.ip_v4"
                              class="form-control" />
                          </div>
                        </div>
                        <div class="form group mt-3">
                          <div class="form-group">
                            <label for="codigo">IP V6:</label>
                            <input required type="text" placeholder="" v-model="elemento_actualizar.ip_v6"
                              class="form-control" />
                          </div>
                        </div>

                        <div class="form group mt-3">
                          <div class="form-group">
                            <label for="codigo">Cat. Puertos Default:</label>
                            <input required type="number" placeholder=""
                              v-model="elemento_actualizar.cantidad_puertos_por_defecto" class="form-control" />
                          </div>
                        </div>

                        <div class="form group mt-3">
                          <div class="form-group">
                            <label for="codigo">Puerto Lógico Default:</label>
                            <input required type="number" placeholder=""
                              v-model="elemento_actualizar.puerto_logico_por_defecto" class="form-control" />
                          </div>
                        </div>

                        <div class="form group mt-3">
                          <div class="form-group">
                            <label for="codigo">Puerto Fisico Default:</label>
                            <input required type="number" placeholder=""
                              v-model="elemento_actualizar.puerto_fisico_por_defecto" class="form-control" />
                          </div>
                        </div>

                      </div>
                    </div>

                    <div class="form group mt-3 text-center">
                      <div class="form-group">
                        <label for="codigo">Observación:</label>
                        <textarea type="text" placeholder="Ingrese una observación"
                          v-model="elemento_actualizar.observacion" class="form-control" />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6 mt-3">
                        <button type="button" class="btn btn-secondary form-control" @click="volver()">
                          Cancelar
                        </button>
                      </div>
                      <div class="col-md-6 mt-3">
                        <input type="button" class="btn btn-success form-control" value="Guardar"
                          @click="actualizarelemento()" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <!-- Modal Eliminar -->
              <div class="modal fade" id="modaleliminarElemento" tabindex="-1" role="dialog"
                aria-labelledby="modaleliminarElemento" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header bg-danger">
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
                          <h5>Nuevo Elemento</h5>
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
            </div>
          </v-row>

        </div>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import TipoGuardar from "@/components/tipo/TipoGuardar.vue";
import { mapGetters } from "vuex";
export default {
  components: { TipoGuardar },
  data() {
    return {
      elemento_actualizar: {},
      tiposreferencias: [],
      tiposmodelos: [],
      tiposmarcas: [],
      tiposdispositivoactivo: [],
      urlSinImagenActivo: this.axios.defaults.baseURL + '/archivos/elemento_activo_default.svg',
      urlSinImagenPasivo: this.axios.defaults.baseURL + '/archivos/elemento_pasivo_default.svg',
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
    this.elemento_actualizar = registroObjeto;
    this.info_edificio = registroObjeto.info_edificio
    this.info_centro_cableado = registroObjeto.info_centro_cableado
    this.info_gabinete = registroObjeto.info_gabinete
  },
  created() {
    this.verTiposDispositivosActivos()
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
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    actualizar() {
      this.axios
        .put("elemento_activo", this.elemento)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            //this.$router.push('/elementos')
            window.location.reload()
            $("#modalGuardarelemento").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    propiedadTieneValor(propiedad) {
      return propiedad !== null && propiedad !== undefined
    },
    verTiposDispositivosActivos() {
      this.axios.get("tipo/tipo_dispositivo_activo")
        .then((respuesta) => {
          this.tiposdispositivoactivo = respuesta.data
        })
        .catch(error => console.log(error))
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
    volver() {
      const id = this.elemento_actualizar.id
      const datosRegistro = {
        id,
        info_edificio: this.info_edificio,
        info_centro_cableado: this.info_centro_cableado,
        info_gabinete: this.info_gabinete
      }
      location.href = "/elemento-activo?registro=" + JSON.stringify(datosRegistro)
    },
    actualizarelemento() {
      const registroGuardar = this.elemento_actualizar
      const registro = {
        id: registroGuardar.id,
        id_tipo_dispositivo_activo: registroGuardar.id_tipo_dispositivo_activo,
        id_tipo_referencia: registroGuardar.id_tipo_referencia,
        id_tipo_modelo: registroGuardar.id_tipo_modelo,
        id_tipo_marca: registroGuardar.id_tipo_marca,
        codigo: registroGuardar.codigo,
        serial: registroGuardar.serial,
        observacion: registroGuardar.observacion,
        os: registroGuardar.os,
        version_os: registroGuardar.version_os,
        mac: registroGuardar.mac,
        gateway: registroGuardar.gateway,
        ip_v4: registroGuardar.ip_v4,
        ip_v6: registroGuardar.ip_v6,
        codigo_inventario: registroGuardar.codigo_inventario,
        cantidad_puertos_por_defecto: registroGuardar.cantidad_puertos_por_defecto,
        puerto_logico_por_defecto: registroGuardar.puerto_logico_por_defecto,
        puerto_fisico_por_defecto: registroGuardar.puerto_fisico_por_defecto,
        id_gabinete: registroGuardar.info_gabinete.id,
        id_usuario: registroGuardar.id_usuario
      }
      this.axios
        .put("elemento_activo", registro)
        .then((respuesta) => {
          this.volver()
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    agregarNuevoTipo(tabla, titulo) {
      this.tablaTipo = tabla
      this.tituloTipo = titulo
    },
  }
}
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

.requerido::before {
  content: "* ";
  /* Agrega el asterisco */
  color: red;
  /* Asterisco de color rojo */
  font-weight: bold;
  /* Opcional, para darle más énfasis */
}

.boton-nuevo_elemento {
  padding: 5px;
  background-color: #28a745;
  border-radius: 5px;
  color: #fff;
  font-size: 12px;
}
</style>