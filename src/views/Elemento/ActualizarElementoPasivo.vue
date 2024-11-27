<template>
  <div class="mx-auto d-flex justify-content-center">
    <div class="card">
      <div class="card-header">
        <h5 class="text-center text-success" id="exampleModalLongTitle">
          Actualizar elemento Pasivo
        </h5>
      </div>
      <div class="card-body">
        <form @submit.prevent>

          <span @click="agregarNuevoTipo('tipo_dispositivo_pasivo', 'Nuevo Dispositivo')" class="boton-nuevo_elemento"
            data-toggle="modal" data-target="#modalNuevoTipo">Nuevo Dispositivo</span>
          <v-autocomplete label="Dispositivo" class="requerido" v-model="elemento_actualizar.id_tipo_dispositivo_pasivo"
            :items="tiposdispositivopasivo" :item-title="titulosAutocompleteTipos" item-value="id"
            :filter="filterAutocompleteTipos">
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
              <input required type="text" placeholder="Ingrese Categoría" v-model="elemento_actualizar.categoria"
                class="form-control" />
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
              <textarea type="text" placeholder="Ingrese una observación" v-model="elemento_actualizar.observacion"
                class="form-control" />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mt-3">
              <button type="button" class="btn btn-secondary form-control" @click="volver()">
                Cancelar
              </button>
            </div>
            <div class="col-md-6 mt-3">
              <input type="button" class="btn btn-success form-control" value="Guardar" @click="actualizarelemento()" />
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- Modal Nuevo Tipo -->
    <div class="modal fade" id="modalNuevoTipo" tabindex="-1" role="dialog" aria-labelledby="modalNuevoTipo"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
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
<style>
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