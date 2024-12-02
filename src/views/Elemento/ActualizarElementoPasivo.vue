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
                  <h5 class="text-center text-success" id="exampleModalLongTitle">
                    Actualizar elemento Pasivo
                  </h5>
                </div>
                <div class="card-body">
                  <form @submit.prevent>

                    <span @click="agregarNuevoTipo('tipo_dispositivo_pasivo', 'Nuevo Dispositivo')"
                      class="boton-nuevo_elemento" data-toggle="modal" data-target="#modalNuevoTipo">Nuevo
                      Dispositivo</span>
                    <v-autocomplete label="Dispositivo" class="requerido"
                      v-model="elemento_actualizar.id_tipo_dispositivo_pasivo" :items="tiposdispositivopasivo"
                      :item-title="titulosAutocompleteTipos" item-value="id" :filter="filterAutocompleteTipos">
                    </v-autocomplete>

                    <div class="form group mt-3">
                      <div class="form-group">
                        <label for="codigo" class="requerido">Código:</label>
                        <input required type="text" placeholder="Ingrese Código" v-model="elemento_actualizar.codigo"
                          class="form-control" />
                      </div>
                    </div>

                    <div class="form group mt-3">
                      <div class="form-group">
                        <label for="codigo">Categoría:</label>
                        <input required type="text" placeholder="Ingrese Categoría"
                          v-model="elemento_actualizar.categoria" class="form-control" />
                      </div>
                    </div>

                    <div class="form group mt-3">
                      <div class="form-group">
                        <label for="codigo"># de Puertos:</label>
                        <input required type="number" placeholder="Ingrese # de Puertos"
                          v-model="elemento_actualizar.numero_puertos" class="form-control" />
                      </div>
                    </div>

                    <div class="form group mt-3">
                      <div class="form-group">
                        <label for="codigo">Tipo de Conector:</label>
                        <input required type="text" placeholder="Ingrese Tipo Conector"
                          v-model="elemento_actualizar.tipo_conector" class="form-control" />
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
      tiposdispositivopasivo: [],
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
    this.verTiposDispositivosPasivos()
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    refrescarTipos() {
      const tablaTipo = this.tablaTipo
      switch (tablaTipo) {
        case 'tipo_dispositivo_pasivo':
          this.verTiposDispositivosPasivos()
          break
        default:
          this.verTiposDispositivosPasivos()
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
    propiedadTieneValor(propiedad) {
      return propiedad !== null && propiedad !== undefined
    },
    verTiposDispositivosPasivos() {
      this.axios.get("tipo/tipo_dispositivo_pasivo")
        .then((respuesta) => {
          this.tiposdispositivopasivo = respuesta.data
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
      location.href = "/elemento-pasivo?registro=" + JSON.stringify(datosRegistro)
    },
    actualizarelemento() {
      const registroGuardar = this.elemento_actualizar
      const registro = {
        id: registroGuardar.id,
        id_tipo_dispositivo_pasivo: registroGuardar.id_tipo_dispositivo_pasivo,
        codigo: registroGuardar.codigo,
        observacion: registroGuardar.observacion,
        codigo_inventario: registroGuardar.codigo_inventario,
        categoria: registroGuardar.categoria,
        numero_puertos: registroGuardar.numero_puertos,
        tipo_conector: registroGuardar.tipo_conector,
        id_gabinete: registroGuardar.info_gabinete.id,
        id_usuario: registroGuardar.id_usuario
      }
      this.axios
        .put("elemento_pasivo", registro)
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