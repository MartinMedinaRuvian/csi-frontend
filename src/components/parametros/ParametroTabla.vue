<template>
  <div class="mt-5">
    <div v-if="parametros && parametros.length > 0">
      <table class="table table-responsive-lg">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Descripción</th>
            <th scope="col">Fecha Creación</th>
            <th scope="col">Fecha Actualización</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="parametro in parametros" :key="parametro.id">
            <td>
              <p>{{ parametro.descripcion }}</p>
            </td>
            <td>
              <p>{{ formatearFecha(parametro.fecha_creacion) }}</p>
            </td>
            <td>
              <p>{{ parametro.fecha_actualizacion != null &&  parametro.fecha_actualizacion ? formatearFecha(parametro.fecha_actualizacion) : ''}}</p>
            </td>
            <td>
              <v-btn data-toggle="modal" data-target="#modalActualizarTipo" class="botones-icon mr-4"
                @click="verDatosModal(parametro)">
                <v-icon icon="mdi-pencil"></v-icon>
                <v-tooltip activator="parent" location="top">Modificar</v-tooltip>
              </v-btn>
              <v-btn data-toggle="modal" data-target="#modalEliminarTipo" class="botones-icon"
                @click="verDatosModal(parametro)">
                <v-icon icon="mdi-delete"></v-icon>
                <v-tooltip activator="parent" location="top">Eliminar</v-tooltip>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

        <!-- Modal Eliminar -->
        <div class="modal fade" id="modalEliminarTipo" tabindex="-1" role="dialog"
      aria-labelledby="modalEliminarTipo" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Eliminar
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-4">
                <h5>¿ Eliminar el Registro ?</h5>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-danger form-control" value="Eliminar"
                    @click="eliminar()" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Actualizar Tipo -->
    <div class="modal fade" id="modalActualizarTipo" tabindex="-1" role="dialog" aria-labelledby="modalActualizarTipo"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Actualizar
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent class="formulario-nuevo_tipo">
              <div class="form-group">
                <h6 class="text-center">Actualizar</h6>
                <input type="text" class="form-control" placeholder="Ingrese descripción"
                  v-model="parametroActualizar.descripcion">
              </div>

              <div class="row">
                <div class="col-md-6">
                  <button type="button" class="btn-sm btn-secondary form-control" data-dismiss="modal">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6">
                  <input type="button" class="btn-sm btn-success form-control" value="Actualizar"
                    @click="actualizar()" />
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
import FechaUtil from "@/util/FechaUtil";
export default {
  props: {
    parametros: [],
    tabla: ''
  },
  data() {
    return {
      parametroActualizar: {},
      descripcion: ''
    }
  },
  methods: {
    verDatosModal(parametro) {
      this.parametroActualizar = { ...parametro };
    },
    recargar() {
      $("#modalActualizarTipo").modal("hide");
      this.$router.push({ name: 'Parametros' })
    },
    eliminar() {
      const parametro = this.parametroActualizar
      const id = parametro.id
      const nombreTabla = 'tipo'
      const tabla_tipo = this.tabla
      this.axios.delete(nombreTabla + '/' + tabla_tipo + '/' + id).then(async (respuesta) => {
        if (respuesta.status === 200) {
          this.$emit('refrescar')
        }
      }).catch(error => console.log(error))
    },
    actualizar() {
      const parametro = this.parametroActualizar
      const registroGuardar = {
        id: parametro.id,
        descripcion: parametro.descripcion
      }
      const nombreTabla = 'tipo'
      const tabla_tipo = this.tabla
      this.axios.put(nombreTabla + '/' + tabla_tipo, registroGuardar).then(async (respuesta) => {
        if (respuesta.status === 200) {
          this.$emit('refrescar')
        }
      }).catch(error => console.log(error))
    },
    formatearFecha(fecha) {
      return FechaUtil.formatearFecha(fecha);
    },
  },
};
</script>
<style scoped>
.botones-icon {
  font-size: 25px;
  color: #00B0FF;
  background-color: #fff;
  border: solid #fff;
}
</style>
