<template>
  <div class="mx-auto d-flex justify-content-center">
    <div class="card">
      <div class="card-header">
        <h5 class="text-center text-success" id="exampleModalLongTitle">
          Actualizar elemento
        </h5>
      </div>
      <div class="card-body">
        <form @submit.prevent>

          <div class="row">
            <div class="col-md-6">

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
                  <label for="codigo" class="requerido">Serial:</label>
                  <input required type="text" placeholder="Ingrese Serial" v-model="elemento_actualizar.serial"
                    class="form-control" />
                </div>
              </div>

              <v-autocomplete label="Referencia" class="requerido" v-model="elemento_actualizar.id_tipo_referencia"
                :items="tiposreferencias" :item-title="titulosAutocompleteTipos" item-value="id"
                :filter="filterAutocompleteTipos"></v-autocomplete>


              <v-autocomplete label="Modelo" class="requerido" v-model="elemento_actualizar.id_tipo_modelo"
                :items="tiposmodelos" :item-title="titulosAutocompleteTipos" item-value="id"
                :filter="filterAutocompleteTipos"></v-autocomplete>


              <v-autocomplete label="Marca" class="requerido" v-model="elemento_actualizar.id_tipo_marca"
                :items="tiposmarcas" :item-title="titulosAutocompleteTipos" item-value="id"
                :filter="filterAutocompleteTipos"></v-autocomplete>


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
                  <input required type="text" placeholder="" v-model="elemento_actualizar.mac" class="form-control" />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo">S.O:</label>
                  <input required type="text" placeholder="" v-model="elemento_actualizar.os" class="form-control" />
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
                  <input required type="text" placeholder="" v-model="elemento_actualizar.ip_v4" class="form-control" />
                </div>
              </div>
              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo">IP V6:</label>
                  <input required type="text" placeholder="" v-model="elemento_actualizar.ip_v6" class="form-control" />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo">Cat. Puertos Default:</label>
                  <input required type="text" placeholder="" v-model="elemento_actualizar.cantidad_puertos_por_defecto"
                    class="form-control" />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo">Puerto Lógico Default:</label>
                  <input required type="text" placeholder="" v-model="elemento_actualizar.puerto_logico_por_defecto"
                    class="form-control" />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo">Puerto Fisico Default:</label>
                  <input required type="text" placeholder="" v-model="elemento_actualizar.puerto_fisico_por_defecto"
                    class="form-control" />
                </div>
              </div>

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
  created() {
    this.verTiposReferencias()
    this.verTiposModelos()
    this.verTiposMarcas()
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
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
    refrescarTipos() {
      const tablaTipo = this.tablaTipo
      switch (tablaTipo) {
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
      this.guardarTipo = false
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
        id
      }
      location.href = "/elemento-activo?registro=" + JSON.stringify(datosRegistro)
    },
    actualizarelemento() {
      const registroGuardar = this.elemento_actualizar
      const registro = {
        id: registroGuardar.id,
        descripcion: registroGuardar.descripcion,
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
        id_gabinete: registroGuardar.id_gabinete,
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
  }
}
</script>