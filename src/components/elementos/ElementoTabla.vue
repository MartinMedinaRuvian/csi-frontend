<template>
  <div class="mt-5">
    <div v-if="elementos && elementos.length > 0">
      <table class="table table-responsive-lg">
        <thead class="thead-light">
          <tr>
            <th scope="col">Imagen</th>
            <th scope="col">Dispositivo</th>
            <th scope="col">Código</th>
            <th scope="col">Estado</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="elemento in elementos" :key="elemento.id">
            <td>
              <div class="contenedor-imagen">
                <img id="imagen" :src="rutaImagenVer(elemento.ruta_imagen)" alt="">
              </div>
            </td>
            <td>
              <p>{{ elemento.tipo_dispositivo }}</p>
            </td>
            <td>
              <p>{{ elemento.codigo }}</p>
            </td>
            <td>
              <p>{{ elemento.estado }}</p>
            </td>
            <td>
              <button data-toggle="modal" data-target="#modalelementoEditar" class="btn btn-outline-success"
                @click="verInfo(elemento)">
                <span class="icon-Lupa"></span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    elementos: [],
    es_activo: Boolean,
    info_gabinete: {},
    info_edificio: {},
    info_centro_cableado: {}
  },
  data() {
    return {
      ruta_servidor: this.axios.defaults.baseURL
    }
  },
  methods: {
    verDatosModal(elemento) {
      this.elemento = { ...elemento };
    },
    rutaImagenVer(ruta_imagen) {
      const ruta = ruta_imagen != null && ruta_imagen != undefined ? ruta_imagen : 'archivos/elemento_default.svg'
      return this.ruta_servidor + '/' + ruta
    },
    verInfo(registro) {
      const datosRegistro = {
        id: registro.id,
        info_edificio: this.info_edificio,
        info_centro_cableado: this.info_centro_cableado,
        info_gabinete: this.info_gabinete
      }
      if (this.es_activo) {
        this.$router.push({
          name: "ElementoActivo",
          query: { registro: JSON.stringify(datosRegistro) },
        });
      } else {
        this.$router.push({
          name: "ElementoPasivo",
          query: { registro: JSON.stringify(datosRegistro) },
        });
      }
    }
  },
};
</script>
<style scoped>
.contenedor-imagen img {
  width: 50px !important;
  height: 50px !important;
}

td p {
  font-size: 15px;
  margin: 0;
}
</style>