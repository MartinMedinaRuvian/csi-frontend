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
              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo" class="requerido">Descripción:</label>
                  <input required type="text" placeholder="Ingrese Descripción"
                    v-model="elemento_actualizar.descripcion" class="form-control" />
                </div>
              </div>
              
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
                  <input required type="number" placeholder="Ingrese # de Puertos" v-model="elemento_actualizar.numero_puertos"
                    class="form-control" />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo">Tipo de Conector:</label>
                  <input required type="text" placeholder="Ingrese Tipo Conector" v-model="elemento_actualizar.tipo_conector"
                    class="form-control" />
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
                  <input type="button" class="btn btn-success form-control" value="Guardar"
                    @click="actualizarelemento()" />
                </div>
              </div>
            </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      elemento_actualizar: {},
      tiposreferencias: [],
      tiposmodelos: [],
      tiposmarcas: [],
      urlSinImagenActivo: this.axios.defaults.baseURL + '/archivos/elemento_activo_default.svg',
      urlSinImagenPasivo: this.axios.defaults.baseURL + '/archivos/elemento_pasivo_default.svg',
      tablaTipo: 'tipo_referencia',
      tituloTipo: 'Nueva Referencia',
    }
  },
  mounted() {
    const registroString = this.$route.query.registro;
    const registroObjeto = JSON.parse(registroString);
    this.elemento_actualizar = registroObjeto;
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
    propiedadTieneValor(propiedad) {
      return propiedad !== null && propiedad !== undefined
    },
    verTiposReferencias() {
      this.axios.get("tipo/tipo_referencia")
        .then((respuesta) => {
          this.tiposreferencias = respuesta.data
        })
        .catch(error => console.log(error))
    },
    volver() {
      const id = this.elemento_actualizar.id
      const datosRegistro = {
        id
      }
      location.href = "/elemento-pasivo?registro=" + JSON.stringify(datosRegistro)
    },
    actualizarelemento() {
      const registroGuardar = this.elemento_actualizar
      const registro = {
        id: registroGuardar.id,
        descripcion: registroGuardar.descripcion,
        codigo: registroGuardar.codigo,
        observacion: registroGuardar.observacion,
        codigo_inventario: registroGuardar.codigo_inventario,
        categoria: registroGuardar.categoria,
        numero_puertos: registroGuardar.numero_puertos,
        tipo_conector: registroGuardar.tipo_conector,
        id_gabinete: registroGuardar.id_gabinete,
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
  }
}
</script>