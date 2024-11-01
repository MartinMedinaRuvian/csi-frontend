<template>
  <div>
    <form @submit.prevent class="formulario-nuevo_tipo">
      <div class="form-group">
        <h6 class="text-center">Guardar {{ titulo }}</h6>
        <input type="text" class="form-control" placeholder="Ingrese descripción" v-model="descripcion">
      </div>

      <div class="row"> 
        <div class="col-md-6">
          <button type="button" class="btn-sm btn-secondary form-control" data-dismiss="modal">
            Cancelar
          </button>
        </div>
        <div class="col-md-6">
          <input type="button" class="btn-sm btn-success form-control" :value="'Guardar ' + titulo" @click="guardar()" />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  props: {
    titulo: '',
    tabla: ''
  },
  data() {
    return {
      descripcion: ''
    }
  },
  methods: {
    guardar() {
      const descripcion = this.descripcion
      const registroGuardar = {
        descripcion
      }
      const nombreTabla = 'tipo'
      const tabla_tipo = this.tabla
      this.axios.post(nombreTabla + '/' + tabla_tipo, registroGuardar).then(async (respuesta) => {
        if (respuesta.status === 200) {
          this.descripcion = ''
          $("#modalNuevoTipoElemento").modal("hide");
          this.$emit('refrescar')
        }
      }).catch(error => console.log(error))
    }
  },
}
</script>
