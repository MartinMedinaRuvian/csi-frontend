<template>
  <div class="text-center">
    <div v-if="usuario !== null && usuario.rol_id === 1">
      <h3 class="text-success mb-4 titulo-principal">Parámetros</h3>
      <div class="row mt-5">
        <div class="form-group col-md-6">
          <label for="select">Seleccione Tabla:</label>
          <select id="select" class="form-select form-control" aria-label="Default select example" v-model="tabla"
            @change="verTipos()">
            <option :value="opcionTabla.valor" v-for="opcionTabla in opcionesTabla" :key="opcionTabla.valor"
              class="text-success">
              {{ opcionTabla.descripcion }}
            </option>
          </select>
        </div>
        <div class="col-md-6">
          <button class="btn btn-success" data-toggle="modal" data-target="#modalNuevoTipo">{{ tituloTipo }}</button>
        </div>
      </div>
      <ParametroTabla :parametros="parametros" :tabla="tabla" @refrescar="verTipos()" />
      <!-- Modal Nuevo Tipo -->
      <div class="modal fade" id="modalNuevoTipo" tabindex="-1" role="dialog" aria-labelledby="modalNuevoTipo"
        aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header bg-danger">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Nuevo {{ tituloTipo }}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <TipoGuardar @refrescar="verTipos()" :titulo="tituloTipo" :tabla="tabla" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h4>Su rol no tiene permisos para ver esta información</h4>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ParametroTabla from "@/components/parametros/ParametroTabla.vue";
import TipoGuardar from "@/components/tipo/TipoGuardar.vue";
export default {
  components: { ParametroTabla, TipoGuardar },
  data() {
    return {
      parametro: {},
      parametros: [],
      tabla: 'tipo_dispositivo_activo',
      opcionesTabla: [{ descripcion: 'Dispositivos Activos', valor: 'tipo_dispositivo_activo' },
      { descripcion: 'Dispositivos Pasivos', valor: 'tipo_dispositivo_pasivo' },
      { descripcion: 'Referencias', valor: 'tipo_referencia' },
      { descripcion: 'Modelos', valor: 'tipo_modelo' }, { descripcion: 'Marcas', valor: 'tipo_marca' },
      { descripcion: 'Gabinetes', valor: 'tipo_gabinete' }],
      tituloTipo: 'Nuevo Dispositivo'
    };
  },
  created() {
    this.verTipos();
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    verTipos() {
      const tablaTipo = this.tabla
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
        case 'tipo_gabinete':
          this.verTiposGabinetes()
          break
        default:
          this.verTiposReferencias()
          break
      }
      $("#modalNuevoTipo").modal("hide");
      $("#modalActualizarTipo").modal("hide");
      $("#modalEliminarTipo").modal("hide");
    },
    verTiposReferencias() {
      this.axios.get("tipo/tipo_referencia")
        .then((respuesta) => {
          this.parametros = respuesta.data
          this.tituloTipo = 'Nueva Referencia'
        })
        .catch(error => console.log(error))
    },
    verTiposModelos() {
      this.axios.get("tipo/tipo_modelo")
        .then((respuesta) => {
          this.parametros = respuesta.data
          this.tituloTipo = 'Nuevo Modelo'
        })
        .catch(error => console.log(error))
    },
    verTiposMarcas() {
      this.axios.get("tipo/tipo_marca")
        .then((respuesta) => {
          this.parametros = respuesta.data
          this.tituloTipo = 'Nueva Marca'
        })
        .catch(error => console.log(error))
    },
    verTiposDispositivosActivos() {
      this.axios.get("tipo/tipo_dispositivo_activo")
        .then((respuesta) => {
          this.parametros = respuesta.data
          this.tituloTipo = 'Nuevo Dispositivo'
        })
        .catch(error => console.log(error))
    },
    verTiposDispositivosPasivos() {
      this.axios.get("tipo/tipo_dispositivo_pasivo")
        .then((respuesta) => {
          this.parametros = respuesta.data
          this.tituloTipo = 'Nuevo Dispositivo'
        })
        .catch(error => console.log(error))
    },
    verTiposGabinetes() {
      this.axios.get("tipo/tipo_gabinete")
        .then((respuesta) => {
          this.parametros = respuesta.data
          this.tituloTipo = 'Nuevo Gabinete'
        })
        .catch(error => console.log(error))
    },
  }
};
</script>
<style>
.input-buscar {
  display: flex;
  align-content: center;
  align-items: center;
}
</style>